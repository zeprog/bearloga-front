import { render, screen } from "@testing-library/react";
import { Text } from "../Text";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

describe("Text component", () => {
  it("renders default main text correctly", () => {
    render(<Text>Main text</Text>);
    const textEl = screen.getByText("Main text");
    expect(textEl).toBeInTheDocument();
    expect(textEl).toHaveClass("text-base font-normal");
  });

  it("renders main-bold variant correctly", () => {
    render(<Text variant="main-bold">Bold text</Text>);
    const textEl = screen.getByText("Bold text");
    expect(textEl).toBeInTheDocument();
    expect(textEl).toHaveClass("text-base font-semibold");
  });

  it("renders small variant correctly", () => {
    render(<Text variant="small">Small text</Text>);
    const textEl = screen.getByText("Small text");
    expect(textEl).toBeInTheDocument();
    expect(textEl).toHaveClass("text-sm font-normal");
  });

  it("renders caption variant correctly", () => {
    render(<Text variant="caption">Caption text</Text>);
    const textEl = screen.getByText("Caption text");
    expect(textEl).toBeInTheDocument();
    expect(textEl).toHaveClass("text-xs font-normal");
  });

  it("applies custom className", () => {
    render(<Text className="text-red-500">Custom class</Text>);
    const textEl = screen.getByText("Custom class");
    expect(textEl).toHaveClass("text-red-500");
  });

  it("renders children correctly", () => {
    render(<Text>Some content</Text>);
    const textEl = screen.getByText("Some content");
    expect(textEl).toBeInTheDocument();
  });

  it("supports aria-label", () => {
    render(<Text aria-label="Accessible text">Visible text</Text>);
    const textEl = screen.getByLabelText("Accessible text");
    expect(textEl).toBeInTheDocument();
    expect(textEl).toHaveTextContent("Visible text");
  });

  it("should be accessible (axe) without aria-label", async () => {
    const { container } = render(<Text>Main accessible text</Text>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should be accessible (axe) with aria-label", async () => {
    const { container } = render(
      <Text aria-label="Accessible label">Text content</Text>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
