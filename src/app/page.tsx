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
import { toast, Toaster } from "react-hot-toast";

const Page = () => {
	const [todos, setTodos] = useState<todoType[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchTodos = async () => {
			try {
				setIsLoading(true);
				const data = await getTodos();
				setTodos(data);
				toast.success("Tâches chargées avec succès");
			} catch (error) {
				console.error("Erreur lors du chargement des tâches:", error);
				toast.error("Erreur lors du chargement des tâches");
			} finally {
				setIsLoading(false);
			}
		};
		fetchTodos();
	}, []);

	const handleAddTodo = async (
		title: string,
		text: string | null,
		dueDate: Date,
	) => {
		const toastId = toast.loading("Ajout de la tâche en cours...");
		try {
			await addTodo(title, text, dueDate);
			const updatedTodos = await getTodos();
			setTodos(updatedTodos);
			toast.success("Tâche ajoutée avec succès", { id: toastId });
		} catch (error) {
			console.error("Erreur lors de l'ajout de la tâche:", error);
			toast.error("Erreur lors de l'ajout de la tâche", { id: toastId });
		}
	};

	return (
		<section className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
			<Toaster position="top-right" />
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
				{isLoading ? (
					<p>Chargement...</p>
				) : (
					<TodoList
						todos={todos}
						onDelete={deleteTodo}
						onEdit={editTodo}
						onToggle={toggleTodo}
					/>
				)}
			</section>
		</section>
	);
};

export default Page;
