import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "../Input";

describe("Input component", () => {
  it("renders with default value", () => {
    render(<Input value="Hello" />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("Hello");
  });

  it("updates value on change", () => {
    const handleChange = jest.fn();
    render(<Input value="" onChange={handleChange} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Test" } });
    expect(handleChange).toHaveBeenCalled();
    expect(input.value).toBe("Test");
  });

  it("applies focus and blur styles", () => {
    render(<Input value="" />);
    const input = screen.getByRole("textbox");

    fireEvent.focus(input);
    expect(input.className).toContain("border-input-border-focus");

    fireEvent.blur(input);
    expect(input.className).not.toContain("border-input-border-focus");
  });

  it("shows error message when error is string", () => {
    render(<Input error="Required" />);
    expect(screen.getByText("Required")).toBeInTheDocument();

    const input = screen.getByRole("textbox");
    expect(input.className).toContain("border-input-error-border");
  });

  it("applies error border when error is boolean", () => {
    render(<Input error={true} />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("border-input-error-border");
  });

  it("disables input when disabled prop is true", () => {
    render(<Input disabled value="Disabled" />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.disabled).toBe(true);
    expect(input.className).toContain("cursor-not-allowed");
  });
});
