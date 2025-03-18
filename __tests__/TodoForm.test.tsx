import { render, screen, fireEvent } from "@testing-library/react";
import TodoForm from "../src/components/todoForm";
import { describe, it, expect, vi } from "vitest";

describe("TodoForm", () => {
	it("soumet les données correctement", () => {
		const onAddTodo = vi.fn();
		render(<TodoForm onAddTodo={onAddTodo} />);

		const titleInput = screen.getByPlaceholderText("Titre");
		const descInput = screen.getByPlaceholderText("Description");
		const dateInput = screen.getByLabelText("Date");
		const submitButton = screen.getByText("Ajouter");

		fireEvent.change(titleInput, { target: { value: "Nouvelle tâche" } });
		fireEvent.change(descInput, { target: { value: "Description de test" } });
		fireEvent.change(dateInput, { target: { value: "2024-03-10" } });

		fireEvent.click(submitButton);

		expect(onAddTodo).toHaveBeenCalledWith(
			"Nouvelle tâche",
			"Description de test",
			new Date("2024-03-10"),
		);
	});

	it("ne soumet pas si le titre est vide", () => {
		const onAddTodo = vi.fn();
		render(<TodoForm onAddTodo={onAddTodo} />);

		fireEvent.click(screen.getByText("Ajouter"));

		expect(onAddTodo).not.toHaveBeenCalled();
	});
});
