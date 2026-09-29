import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller.js';
import { TodoService } from './todo.service.js';
import { Todo } from './todo.entity.js';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  const mockTodo: Todo = {
    id: 1,
    title: 'Test Todo',
    completed: false,
    priority: 'high',
    category: 'Work',
    dueDate: '2026-10-01',
    position: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockTodoService = {
    findAll: vi.fn().mockResolvedValue([mockTodo]),
    getCategories: vi.fn().mockResolvedValue(['Work', 'Personal']),
    findOne: vi.fn().mockResolvedValue(mockTodo),
    create: vi.fn().mockResolvedValue(mockTodo),
    reorder: vi.fn().mockResolvedValue([mockTodo]),
    update: vi.fn().mockResolvedValue({ ...mockTodo, completed: true }),
    remove: vi.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: mockTodoService,
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/todos (findAll)', () => {
    it('should return an array of todos', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockTodo]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /api/todos/categories (getCategories)', () => {
    it('should return a list of unique categories', async () => {
      const result = await controller.getCategories();
      expect(result).toEqual(['Work', 'Personal']);
      expect(service.getCategories).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /api/todos/:id (findOne)', () => {
    it('should return a single todo by id', async () => {
      const result = await controller.findOne(1);
      expect(result).toEqual(mockTodo);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('POST /api/todos (create)', () => {
    it('should create and return a new todo', async () => {
      const createDto = {
        title: 'New Todo',
        priority: 'medium' as const,
        category: 'Personal',
      };
      const result = await controller.create(createDto);
      expect(result).toEqual(mockTodo);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('PUT /api/todos/reorder (reorder)', () => {
    it('should reorder todos and return updated list', async () => {
      const reorderDto = {
        items: [{ id: 1, position: 2 }],
      };
      const result = await controller.reorder(reorderDto);
      expect(result).toEqual([mockTodo]);
      expect(service.reorder).toHaveBeenCalledWith(reorderDto.items);
    });
  });

  describe('PUT /api/todos/:id (update)', () => {
    it('should update and return the modified todo', async () => {
      const updateDto = { completed: true };
      const result = await controller.update(1, updateDto);
      expect(result.completed).toBe(true);
      expect(service.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('DELETE /api/todos/:id (remove)', () => {
    it('should remove a todo and return void', async () => {
      await controller.remove(1);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
