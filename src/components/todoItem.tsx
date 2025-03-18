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
				<p className="text-xs text-gray-500">
					Créée le :{" "}
					{new Date(todo.createdAt).toLocaleDateString("fr-FR", {
						day: "numeric",
						month: "long",
						year: "numeric",
					})}
				</p>
				<p className="text-xs text-blue-500">
					À faire avant :{" "}
					{new Date(todo.dueDate).toLocaleDateString("fr-FR", {
						day: "numeric",
						month: "long",
						year: "numeric",
					})}
				</p>
			</section>
			<button type="button" onClick={() => onEdit(todo.id, todo.title)}>
				✏️
			</button>
			<button type="button" onClick={() => onDelete(todo.id)}>
				🗑️
			</button>
		</section>
	);
};

export default TodoItem;
