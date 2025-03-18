export type todoType = {
	id: number;
	title: string;
	text: string | null;
	done: boolean;
	createdAt: Date;
	updatedAt: Date;
	dueDate: Date;
};

export type NewTodo = {
	title: string;
	text: string | null;
	dueDate: Date;
};
