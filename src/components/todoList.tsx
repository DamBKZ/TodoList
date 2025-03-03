"use client";

import type { todoType } from "../types/todo-type";
import TodoItem from "./todoItem";

const TodoList = ({
	todos,
	onDelete,
	onEdit,
	onToggle,
}: {
	todos: todoType[];
	onDelete: (id: number) => void;
	onEdit: (id: number, newText: string) => void;
	onToggle: (id: number) => void;
}) => {
	return (
		<section className="space-y-4">
			{todos.length > 0 ? (
				todos.map((todo) => (
					<TodoItem
						key={todo.id}
						todo={todo}
						onDelete={onDelete}
						onEdit={onEdit}
						onToggle={onToggle}
					/>
				))
			) : (
				<p>Aucune tâche trouvée.</p>
			)}
		</section>
	);
};

export default TodoList;
