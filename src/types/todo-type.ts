export type todoType = {
	id: number;
	title: string;
	text: string | null;
	done: boolean;
	createdAt: string | Date;
	updatedAt: string | Date;
	dueDate: string | Date | null;
};

export type NewTodo = {
	title: string;
	text: string | null;
	dueDate: string | null;
};
