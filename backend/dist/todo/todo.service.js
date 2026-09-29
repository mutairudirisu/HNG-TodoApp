var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity.js';
let TodoService = class TodoService {
    todoRepository;
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    async findAll() {
        return this.todoRepository.find({
            order: { position: 'ASC', createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const todo = await this.todoRepository.findOne({ where: { id } });
        if (!todo) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }
        return todo;
    }
    async create(createTodoDto) {
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
    async update(id, updateTodoDto) {
        const todo = await this.findOne(id);
        Object.assign(todo, updateTodoDto);
        return this.todoRepository.save(todo);
    }
    async remove(id) {
        const todo = await this.findOne(id);
        await this.todoRepository.remove(todo);
    }
    async reorder(items) {
        await this.todoRepository.manager.transaction(async (manager) => {
            for (const item of items) {
                await manager.update(Todo, item.id, { position: item.position });
            }
        });
        return this.findAll();
    }
    async getCategories() {
        const result = await this.todoRepository
            .createQueryBuilder('todo')
            .select('DISTINCT todo.category', 'category')
            .where('todo.category IS NOT NULL')
            .andWhere("todo.category != ''")
            .getRawMany();
        return result.map((r) => r.category);
    }
};
TodoService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Todo)),
    __metadata("design:paramtypes", [Repository])
], TodoService);
export { TodoService };
//# sourceMappingURL=todo.service.js.map