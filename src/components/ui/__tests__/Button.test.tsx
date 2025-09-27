import { render, screen, fireEvent } from "@testing-library/react"
import { Button } from "../Button"

describe("Button component", () => {
  it("renders children correctly", () => {
    render(<Button variant="primary">Click me</Button>)
    expect(screen.getByText("Click me")).toBeInTheDocument()
  })

  it("applies the correct variant classes", () => {
    render(<Button variant="secondary">Secondary</Button>)
    const btn = screen.getByText("Secondary")
    expect(btn).toHaveClass("bg-secondary-button-bg")
    expect(btn).toHaveClass("text-main-green-color")
  })

  it("handles disabled state", () => {
    render(<Button variant="primary" disabled>Disabled</Button>)
    const btn = screen.getByText("Disabled") as HTMLButtonElement
    expect(btn).toBeDisabled()
    expect(btn).toHaveClass("disabled:bg-primary-button-disabled-bg")
  })

  it("fires onClick handler when clicked", () => {
    const handleClick = jest.fn()
    render(<Button variant="ghost" onClick={handleClick}>Click</Button>)
    const btn = screen.getByText("Click")
    fireEvent.click(btn)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})