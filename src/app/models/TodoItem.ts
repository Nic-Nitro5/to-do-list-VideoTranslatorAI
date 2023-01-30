export interface Todo {
    id?: string;
    title: string;
    content: string;
    completed: boolean;
    createdBy: string;
    createdAt?: string;
}