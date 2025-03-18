import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TodoItem from "../src/components/todoItem";
import { describe, it, expect, vi } from "vitest";

const mockTodo = {
	id: 1,
	title: "Tâche test",
	text: "Détail de la tâche",
	done: false,
	createdAt: new Date(),
	updatedAt: new Date(),
	dueDate: new Date("2024-03-10"),
};

describe("TodoItem", () => {
	it("appelle `onEdit` avec le nouveau texte après édition", async () => {
		const onEdit = vi.fn();
		const mockPrompt = vi
			.spyOn(window, "prompt")
			.mockReturnValue("Nouveau texte");

		render(
			<TodoItem
				todo={mockTodo}
				onDelete={() => {}}
				onEdit={onEdit}
				onToggle={() => {}}
			/>,
		);

		fireEvent.click(screen.getByText("✏️"));

		mockPrompt.mockRestore();
	});
});
