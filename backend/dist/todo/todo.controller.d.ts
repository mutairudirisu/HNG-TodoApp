import { TodoService } from './todo.service.js';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto.js';
import { Todo } from './todo.entity.js';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    findAll(): Promise<Todo[]>;
    getCategories(): Promise<string[]>;
    findOne(id: number): Promise<Todo>;
    create(createTodoDto: CreateTodoDto): Promise<Todo>;
    reorder(body: {
        items: {
            id: number;
            position: number;
        }[];
    }): Promise<Todo[]>;
    update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo>;
    remove(id: number): Promise<void>;
}
