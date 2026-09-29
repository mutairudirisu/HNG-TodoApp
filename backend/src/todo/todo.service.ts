import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity.js';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto.js';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find({
      order: { position: 'ASC', createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    // Get the highest position and add 1
    const maxPositionResult = await this.todoRepository
      .createQueryBuilder('todo')
      .select('MAX(todo.position)', 'maxPosition')
      .getRawOne();

    const position = (maxPositionResult?.maxPosition ?? -1) + 1;

    const todo = this.todoRepository.create({
      ...createTodoDto,
      position,
    });

    return this.todoRepository.save(todo);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findOne(id);
    Object.assign(todo, updateTodoDto);
    return this.todoRepository.save(todo);
  }

  async remove(id: number): Promise<void> {
    const todo = await this.findOne(id);
    await this.todoRepository.remove(todo);
  }

  async reorder(items: { id: number; position: number }[]): Promise<Todo[]> {
    // Update all positions in a transaction
    await this.todoRepository.manager.transaction(async (manager) => {
      for (const item of items) {
        await manager.update(Todo, item.id, { position: item.position });
      }
    });

    return this.findAll();
  }

  async getCategories(): Promise<string[]> {
    const result = await this.todoRepository
      .createQueryBuilder('todo')
      .select('DISTINCT todo.category', 'category')
      .where('todo.category IS NOT NULL')
      .andWhere("todo.category != ''")
      .getRawMany();

    return result.map((r) => r.category);
  }
}
