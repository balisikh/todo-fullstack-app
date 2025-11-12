import { render, screen, fireEvent } from "@testing-library/react";
import TaskList from "./TaskList";

const tasks = [
  { id: 1, text: "Task 1", completed: false },
  { id: 2, text: "Task 2", completed: true },
];

test("renders tasks correctly", () => {
  render(<TaskList tasks={tasks} toggleTask={() => {}} deleteTask={() => {}} />);
  expect(screen.getByText("Task 1")).toBeInTheDocument();
  expect(screen.getByText("Task 2")).toBeInTheDocument();
});

test("shows message when no tasks", () => {
  render(<TaskList tasks={[]} toggleTask={() => {}} deleteTask={() => {}} />);
  expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
});
