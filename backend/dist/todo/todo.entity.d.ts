export declare class Todo {
    id: number;
    title: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    category: string | null;
    dueDate: string | null;
    position: number;
    createdAt: Date;
    updatedAt: Date;
}
