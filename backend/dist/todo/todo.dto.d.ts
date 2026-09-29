export declare class CreateTodoDto {
    title: string;
    priority?: 'low' | 'medium' | 'high';
    category?: string;
    dueDate?: string;
}
export declare class UpdateTodoDto {
    title?: string;
    completed?: boolean;
    priority?: 'low' | 'medium' | 'high';
    category?: string;
    dueDate?: string;
}
export declare class ReorderTodoDto {
    id: number;
    position: number;
}
export declare class ReorderTodosDto {
    items: ReorderTodoDto[];
}
