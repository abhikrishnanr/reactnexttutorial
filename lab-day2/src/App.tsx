import { ReactNode, useEffect, useMemo, useState } from "react";
import "./App.css";

interface SectionProps {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}

const Section = ({ id, title, description, children }: SectionProps) => (
  <section id={id} className="section-card">
    <header>
      <p className="eyebrow">{id.toUpperCase()}</p>
      <h2>{title}</h2>
      <p className="section-description">{description}</p>
    </header>
    <div className="section-body">{children}</div>
  </section>
);

const MessageSection = () => {
  const [msg, setMsg] = useState<string>("Welcome!");

  return (
    <div className="stack">
      <h3>{msg}</h3>
      <button onClick={() => setMsg("Enjoy your training!")}>Change Message</button>
    </div>
  );
};

const CounterSection = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="stack">
      <p className="count-display">Current Count: {count}</p>
      <div className="button-row">
        <button onClick={() => setCount((c) => c + 1)}>+</button>
        <button onClick={() => setCount((c) => c - 1)}>-</button>
        <button onClick={() => setCount(0)} className="ghost">
          Reset
        </button>
      </div>
    </div>
  );
};

const EventHandlingSection = () => {
  const [text, setText] = useState<string>("");
  const [logs, setLogs] = useState<string[]>([]);

  const appendLog = (message: string) =>
    setLogs((prev) => [message, ...prev].slice(0, 6));

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    appendLog(`Mouse click captured at (${e.clientX}, ${e.clientY})`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    appendLog(`Input changed: "${e.target.value}"`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    appendLog(`Form submitted with payload: "${text}"`);
  };

  return (
    <div className="event-demo">
      <form onSubmit={handleSubmit} className="stack">
        <button type="button" onClick={handleClick}>
          Trigger MouseEvent
        </button>
        <input
          type="text"
          placeholder="Type to trigger ChangeEvent"
          value={text}
          onChange={handleChange}
        />
        <button type="submit">Submit Form</button>
      </form>
      <div className="console">
        <p className="console-title">Console Output</p>
        <ul>
          {logs.map((log, index) => (
            <li key={`${log}-${index}`}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const MovieForm = () => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [movies, setMovies] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title cannot be empty");
      return;
    }

    setMovies((prev) => [...prev, title.trim()]);
    setTitle("");
    setError("");
  };

  return (
    <div className="stack">
      <form onSubmit={handleSubmit} className="stack">
        <label htmlFor="movie-title">Movie title</label>
        <input
          id="movie-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add</button>
        {error && <p className="error">{error}</p>}
        {!error && movies.length > 0 && (
          <p className="success">Great! Movie added successfully.</p>
        )}
      </form>
      <ul className="movie-list">
        {movies.map((movie, index) => (
          <li key={movie + index}>{movie}</li>
        ))}
      </ul>
    </div>
  );
};

const TimerSection = () => {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return <p className="timer">Seconds elapsed: {seconds}</p>;
};

interface SeatProps {
  seatNo: number;
  isSelected: boolean;
  onSelect: (no: number) => void;
}

const SeatButton = ({ seatNo, isSelected, onSelect }: SeatProps) => (
  <button
    className={`seat-button ${isSelected ? "selected" : ""}`}
    onClick={() => onSelect(seatNo)}
  >
    Seat {seatNo}
  </button>
);

const MiniSeatLayout = () => {
  const seats = [1, 2, 3, 4, 5];
  const [selected, setSelected] = useState<number[]>([]);

  const handleSelect = (no: number) => {
    setSelected((prev) =>
      prev.includes(no) ? prev.filter((seat) => seat !== no) : [...prev, no]
    );
  };

  return (
    <div className="stack">
      <div className="mini-seat-row">
        {seats.map((seat) => (
          <SeatButton
            key={seat}
            seatNo={seat}
            isSelected={selected.includes(seat)}
            onSelect={handleSelect}
          />
        ))}
      </div>
      <p>Selected Seats: {selected.length ? selected.join(", ") : "None"}</p>
    </div>
  );
};

const SeatBookingApp = () => {
  const rows = 5;
  const cols = 10;
  const totalSeats = rows * cols;
  const pricePerSeat = 150;
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSeat = (seatNo: number) => {
    setSelected((prev) =>
      prev.includes(seatNo)
        ? prev.filter((seat) => seat !== seatNo)
        : [...prev, seatNo]
    );
  };

  const totalPrice = useMemo(() => selected.length * pricePerSeat, [selected]);

  return (
    <div className="stack">
      <div className="seat-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: totalSeats }, (_, i) => i + 1).map((seatNo) => (
          <button
            key={seatNo}
            className={`seat ${selected.includes(seatNo) ? "booked" : ""}`}
            onClick={() => toggleSeat(seatNo)}
          >
            {seatNo}
          </button>
        ))}
      </div>
      <div className="stack summary">
        <p>Seats Selected: {selected.length ? selected.join(", ") : "None"}</p>
        <p>Total Price: ₹{totalPrice}</p>
        <div className="button-row">
          <button onClick={() => setSelected([])} className="ghost">
            Reset
          </button>
          <button
            onClick={() =>
              window.alert(`Booked ${selected.length} seats for ₹${totalPrice}`)
            }
            disabled={!selected.length}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

const QuickReference = () => (
  <div className="reference">
    <div>
      <h3>Common Event Types</h3>
      <ul>
        <li>React.MouseEvent&lt;HTMLButtonElement&gt;</li>
        <li>React.ChangeEvent&lt;HTMLInputElement&gt;</li>
        <li>React.KeyboardEvent&lt;HTMLInputElement&gt;</li>
        <li>React.FormEvent&lt;HTMLFormElement&gt;</li>
      </ul>
    </div>
    <div>
      <h3>Hook Recap</h3>
      <ul>
        <li>useState – Manage component data</li>
        <li>useEffect – Handle side effects</li>
        <li>Props – Pass data to children</li>
        <li>State Lifting – Update parent from child</li>
      </ul>
    </div>
  </div>
);

function App() {
  return (
    <div className="App">
      <header className="hero">
        <p className="eyebrow">Day 2 — React + TypeScript Lab</p>
        <h1>State &amp; Events Deep Dive</h1>
        <p>
          Explore how React re-renders, handles events, manages form state, and powers a
          seat booking simulator inspired by Kerala Theatres.
        </p>
      </header>
      <main>
        <Section
          id="section-1"
          title="How React Re-renders"
          description="State changes trigger virtual DOM comparisons. Update the message to see a re-render in action."
        >
          <MessageSection />
        </Section>

        <Section
          id="section-2"
          title="useState Counter"
          description="Use the count buttons to increment, decrement, or reset the local state."
        >
          <CounterSection />
        </Section>

        <Section
          id="section-3"
          title="Event Handling in TypeScript"
          description="Each UI interaction is strongly typed. Trigger mouse, change, and form events to populate the console."
        >
          <EventHandlingSection />
        </Section>

        <Section
          id="section-4"
          title="Form Handling &amp; Validation"
          description="Controlled inputs keep React in sync with user data. Submit titles and enforce validation rules."
        >
          <MovieForm />
        </Section>

        <Section
          id="section-5"
          title="useEffect Basics"
          description="Side effects like timers rely on useEffect cleanup. Watch the seconds tick in real time."
        >
          <TimerSection />
        </Section>

        <Section
          id="section-6"
          title="Lifting State Up"
          description="Children notify parents about seat selections via callback props."
        >
          <MiniSeatLayout />
        </Section>

        <Section
          id="section-7"
          title="Mini Project: Kerala Seat Booking"
          description="Combine events, state, props, and memoized totals for an interactive seat booking simulator."
        >
          <SeatBookingApp />
        </Section>

        <Section
          id="section-8"
          title="Quick Reference"
          description="Keep this cheat-sheet handy for the most common event types and hooks."
        >
          <QuickReference />
        </Section>
      </main>
    </div>
  );
}

export default App;
