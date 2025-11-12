import { render, screen, fireEvent } from "@testing-library/react";
import TaskInput from "./TaskInput";

describe("TaskInput component", () => {
  test("renders input and button", () => {
    render(<TaskInput addTask={() => {}} />);
    expect(screen.getByPlaceholderText(/add a new task/i)).toBeInTheDocument();
    expect(screen.getByText(/add/i)).toBeInTheDocument();
  });

  test("calls addTask with sanitized input", () => {
    const mockAddTask = jest.fn();
    render(<TaskInput addTask={mockAddTask} />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    const button = screen.getByText(/add/i);

    fireEvent.change(input, { target: { value: "<b>Test</b>" } });
    fireEvent.click(button);

    expect(mockAddTask).toHaveBeenCalledWith("Test");
  });

  test("does not call addTask for empty input", () => {
    const mockAddTask = jest.fn();
    render(<TaskInput addTask={mockAddTask} />);

    const button = screen.getByText(/add/i);
    fireEvent.click(button);

    expect(mockAddTask).not.toHaveBeenCalled();
  });
});
