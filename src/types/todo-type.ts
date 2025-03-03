export type todoType = {
	id: number;
	title: string;
	text: string | null;
	done: boolean;
	createdAt: string;
	updatedAt: string;
	dueDate: string | null;
};

export type NewTodo = {
	title: string;
	text: string | null;
	dueDate: string | null;
};
