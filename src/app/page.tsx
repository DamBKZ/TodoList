"use client";

import { useState, useEffect } from "react";
import {
	getTodos,
	deleteTodo,
	editTodo,
	toggleTodo,
	addTodo,
} from "../actions/todo-actions";
import TodoForm from "../components/todoForm";
import TodoList from "../components/todoList";
import type { todoType } from "../types/todo-type";

const Page = () => {
	const [todos, setTodos] = useState<todoType[]>([]);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const fetchTodos = async () => {
			const data = await getTodos();
			setTodos(formatTodos(data));
		};
		fetchTodos();
	}, []);

	const formatTodos = (data: todoType[]): todoType[] => {
		return data.map((todo) => ({
			...todo,
			createdAt: new Date(todo.createdAt).toISOString(),
			updatedAt: new Date(todo.updatedAt).toISOString(),
			dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString() : null,
		}));
	};

	const handleAddTodo = async (
		title: string,
		text: string | null,
		dueDate: string | null,
	) => {
		await addTodo(title, text, dueDate);
		const updatedTodos = await getTodos(); // Rafraîchit la liste des tâches
		setTodos(formatTodos(updatedTodos));
	};

	const handleDeleteTodo = async (id: number) => {
		await deleteTodo(id);
		setTodos(todos.filter((todo) => todo.id !== id)); // Mise à jour immédiate de la liste
	};

	const handleEditTodo = async (id: number, newText: string) => {
		await editTodo(id, newText);
		setTodos(
			todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)),
		);
	};

	const handleToggleTodo = async (id: number) => {
		await toggleTodo(id);
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, done: !todo.done } : todo,
			),
		);
	};

	const filteredTodos = todos.filter(
		(todo) =>
			todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			todo.text?.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<section className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
			<section className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full">
				<h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
					📝 Todo List
				</h1>

				<input
					type="text"
					placeholder="Rechercher une tâche..."
					className="p-2 border border-gray-300 rounded-md w-full mb-4"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>

				<TodoForm onAddTodo={handleAddTodo} />

				<TodoList
					todos={filteredTodos}
					onDelete={handleDeleteTodo}
					onEdit={handleEditTodo}
					onToggle={handleToggleTodo}
				/>
			</section>
		</section>
	);
};

export default Page;
