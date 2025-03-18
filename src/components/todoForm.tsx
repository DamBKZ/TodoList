"use client";

import { useState } from "react";

const TodoForm = ({
	onAddTodo,
}: {
	onAddTodo: (title: string, text: string | null, dueDate: Date) => void;
}) => {
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const [dueDate, setDueDate] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!title.trim()) return;

		const parsedDueDate = dueDate ? new Date(dueDate) : new Date();

		onAddTodo(title, text || null, parsedDueDate);

		setTitle("");
		setText("");
		setDueDate("");
	};

	return (
		<form onSubmit={handleSubmit} className="mb-4 space-y-2">
			<input
				type="text"
				placeholder="Titre"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
				className="p-2 border rounded-md w-full"
			/>
			<input
				type="text"
				placeholder="Description"
				value={text}
				onChange={(e) => setText(e.target.value)}
				className="p-2 border rounded-md w-full"
			/>
			<label htmlFor="dueDate">Date</label>
			<input
				id="dueDate"
				type="date"
				value={dueDate}
				onChange={(e) => setDueDate(e.target.value)}
				className="p-2 border rounded-md w-full"
			/>
			<button
				type="submit"
				className="p-2 bg-blue-500 text-white rounded-md w-full"
			>
				Ajouter
			</button>
		</form>
	);
};

export default TodoForm;
