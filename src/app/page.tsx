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
				setTodos(formatTodos(data));
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
		const toastId = toast.loading("Ajout de la tâche en cours...");
		try {
			await addTodo(title, text, dueDate);
			const updatedTodos = await getTodos();
			setTodos(formatTodos(updatedTodos));
			toast.success("Tâche ajoutée avec succès", { id: toastId });
		} catch (error) {
			console.error("Erreur lors de l'ajout de la tâche:", error);
			toast.error("Erreur lors de l'ajout de la tâche", { id: toastId });
		}
	};

	const handleDeleteTodo = async (id: number) => {
		const toastId = toast.loading("Suppression en cours...");
		try {
			await deleteTodo(id);
			setTodos(todos.filter((todo) => todo.id !== id));
			toast.success("Tâche supprimée avec succès", { id: toastId });
		} catch (error) {
			console.error("Erreur lors de la suppression:", error);
			toast.error("Erreur lors de la suppression", { id: toastId });
		}
	};

	const handleEditTodo = async (id: number, newText: string) => {
		const toastId = toast.loading("Modification en cours...");
		try {
			await editTodo(id, newText);
			setTodos(
				todos.map((todo) =>
					todo.id === id ? { ...todo, text: newText } : todo,
				),
			);
			toast.success("Tâche modifiée avec succès", { id: toastId });
		} catch (error) {
			console.error("Erreur lors de la modification:", error);
			toast.error("Erreur lors de la modification", { id: toastId });
		}
	};

	const handleToggleTodo = async (id: number) => {
		try {
			await toggleTodo(id);
			setTodos(
				todos.map((todo) => {
					if (todo.id === id) {
						const updatedTodo = { ...todo, done: !todo.done };
						toast.success(
							updatedTodo.done ? "Tâche terminée ✅" : "Tâche à faire",
						);
						return updatedTodo;
					}
					return todo;
				}),
			);
		} catch (error) {
			console.error("Erreur lors du changement de statut:", error);
			toast.error("Erreur lors du changement de statut");
		}
	};

	const filteredTodos = todos.filter(
		(todo) =>
			todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			todo.text?.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<section className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
			<Toaster
				position="top-right"
				toastOptions={{
					duration: 3000,
					style: {
						background: "#363636",
						color: "#fff",
					},
					success: {
						duration: 3000,
						iconTheme: {
							primary: "#4ade80",
							secondary: "#fff",
						},
					},
					error: {
						duration: 4000,
						iconTheme: {
							primary: "#ef4444",
							secondary: "#fff",
						},
					},
				}}
			/>
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
					<section className="flex justify-center items-center py-8">
						<section className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500">
							{" "}
						</section>
					</section>
				) : (
					<TodoList
						todos={filteredTodos}
						onDelete={handleDeleteTodo}
						onEdit={handleEditTodo}
						onToggle={handleToggleTodo}
					/>
				)}
			</section>
		</section>
	);
};

export default Page;
