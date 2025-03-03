"use client";

import type { todoType } from "../types/todo-type";

const TodoItem = ({
	todo,
	onDelete,
	onEdit,
	onToggle,
}: {
	todo: todoType;
	onDelete: (id: number) => void;
	onEdit: (id: number, newText: string) => void;
	onToggle: (id: number) => void;
}) => {
	return (
		<section
			className={`flex items-center justify-between p-4 border-b rounded-lg ${todo.done ? "bg-green-50" : "bg-white"}`}
		>
			<section className="flex items-center space-x-2">
				<input
					type="checkbox"
					checked={todo.done}
					onChange={() => onToggle(todo.id)}
					className="h-5 w-5"
				/>
				<span
					className={`flex-1 ${todo.done ? "line-through text-gray-500" : ""}`}
				>
					{todo.title}
				</span>
			</section>

			<section className="flex flex-col space-y-2 mt-2">
				{todo.text && <p className="text-sm text-gray-700">{todo.text}</p>}
				<p className="text-xs text-gray-500">
					Créée le: {new Date(todo.createdAt).toLocaleDateString()}
				</p>
				{todo.dueDate && (
					<p className="text-xs text-blue-500">
						À faire avant: {new Date(todo.dueDate).toLocaleDateString()}
					</p>
				)}
			</section>

			<section className="flex space-x-2">
				<button
					type="button"
					onClick={() => {
						const newText = prompt(
							"Modifier la tâche :",
							todo.text ?? "",
						)?.trim();
						if (newText !== "" && newText !== undefined) {
							onEdit(todo.id, newText);
						}
					}}
					className="text-blue-500 hover:text-blue-700"
				>
					✏️
				</button>

				<button
					type="button"
					onClick={() => onDelete(todo.id)}
					className="text-red-500 hover:text-red-700"
				>
					🗑️
				</button>
			</section>
		</section>
	);
};

export default TodoItem;
