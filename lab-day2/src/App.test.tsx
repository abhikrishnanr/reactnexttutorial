import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the hero heading for the lab", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /state & events deep dive/i })
    ).toBeInTheDocument();
  });

  it("lists all the guided sections", () => {
    render(<App />);

    const sections = [
      /how react re-renders/i,
      /usestate counter/i,
      /event handling in typescript/i,
      /form handling & validation/i,
      /useeffect basics/i,
      /lifting state up/i,
      /kerala seat booking/i,
      /quick reference/i,
    ];

    sections.forEach((title) => {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    });
  });
});
