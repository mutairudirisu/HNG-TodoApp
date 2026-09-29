import { Repository } from 'typeorm';
import { Todo } from './todo.entity.js';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto.js';
export declare class TodoService {
    private readonly todoRepository;
    constructor(todoRepository: Repository<Todo>);
    findAll(): Promise<Todo[]>;
    findOne(id: number): Promise<Todo>;
    create(createTodoDto: CreateTodoDto): Promise<Todo>;
    update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo>;
    remove(id: number): Promise<void>;
    reorder(items: {
        id: number;
        position: number;
    }[]): Promise<Todo[]>;
    getCategories(): Promise<string[]>;
}
