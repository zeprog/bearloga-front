import { render, screen } from "@testing-library/react";
import { Title } from "../Title";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

describe("Title component", () => {
  it("renders with default props (h2, md)", () => {
    render(<Title>Default Title</Title>);
    const heading = screen.getByRole("heading", { name: /Default Title/i });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H2");
    expect(heading).toHaveClass("text-xl font-semibold");
    expect(heading).toHaveAttribute("aria-level", "2");
  });

  it("renders correct heading level for h1–h6", () => {
    (["h1","h2","h3","h4","h5","h6"] as const).forEach(tag => {
      render(<Title as={tag}>Heading {tag}</Title>);
      const heading = screen.getByRole("heading", { name: `Heading ${tag}` });
      expect(heading.tagName.toLowerCase()).toBe(tag);
      expect(heading).toHaveAttribute("aria-level", tag.replace("h",""));
    });
  });

  it("applies size classes correctly", () => {
    render(<Title size="sm">Small Title</Title>);
    const heading = screen.getByRole("heading", { name: /Small Title/i });
    expect(heading).toHaveClass("text-lg font-medium");

    render(<Title size="xl">Extra Large Title</Title>);
    const headingXL = screen.getByRole("heading", { name: /Extra Large Title/i });
    expect(headingXL).toHaveClass("text-3xl font-bold tracking-tight");
  });

  it("supports aria-label for screen readers", () => {
    render(<Title aria-label="Alternative Label">Visible Text</Title>);
    const heading = screen.getByRole("heading", { name: /Alternative Label/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveAttribute("aria-label", "Alternative Label");
  });

  it("renders children correctly", () => {
    render(<Title>My Title</Title>);
    const heading = screen.getByRole("heading", { name: /My Title/i });
    expect(heading).toHaveTextContent("My Title");
  });

  it("should be accessible (axe)", async () => {
    const { container } = render(<Title as="h1" size="xl">Accessible Title</Title>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
