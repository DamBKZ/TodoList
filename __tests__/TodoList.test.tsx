import { render, screen } from "@testing-library/react";
import TodoList from "../src/components/todoList";
import { describe, it, expect, vi } from "vitest";

const mockTodos = [
	{
		id: 1,
		title: "Tâche 1",
		text: "Description 1",
		done: false,
		createdAt: new Date(),
		updatedAt: new Date(),
		dueDate: new Date("2024-03-10"),
	},
	{
		id: 2,
		title: "Tâche 2",
		text: "Description 2",
		done: true,
		createdAt: new Date(),
		updatedAt: new Date(),
		dueDate: new Date("2024-03-10"),
	},
];

describe("TodoList", () => {
	it("affiche les tâches si la liste n'est pas vide", () => {
		render(
			<TodoList
				todos={mockTodos}
				onDelete={vi.fn()}
				onEdit={vi.fn()}
				onToggle={vi.fn()}
			/>,
		);

		expect(screen.getByText("Tâche 1")).toBeInTheDocument();
		expect(screen.getByText("Tâche 2")).toBeInTheDocument();
	});

	it("affiche un message si la liste est vide", () => {
		render(
			<TodoList
				todos={[]}
				onDelete={vi.fn()}
				onEdit={vi.fn()}
				onToggle={vi.fn()}
			/>,
		);

		expect(screen.getByText("Aucune tâche trouvée.")).toBeInTheDocument();
	});
});
