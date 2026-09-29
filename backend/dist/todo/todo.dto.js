var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsOptional, IsBoolean, IsIn, IsInt, MaxLength, MinLength } from 'class-validator';
export class CreateTodoDto {
    title;
    priority;
    category;
    dueDate;
}
__decorate([
    IsString(),
    MinLength(1),
    MaxLength(255),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "title", void 0);
__decorate([
    IsOptional(),
    IsIn(['low', 'medium', 'high']),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "priority", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "category", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "dueDate", void 0);
export class UpdateTodoDto {
    title;
    completed;
    priority;
    category;
    dueDate;
}
__decorate([
    IsOptional(),
    IsString(),
    MinLength(1),
    MaxLength(255),
    __metadata("design:type", String)
], UpdateTodoDto.prototype, "title", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateTodoDto.prototype, "completed", void 0);
__decorate([
    IsOptional(),
    IsIn(['low', 'medium', 'high']),
    __metadata("design:type", String)
], UpdateTodoDto.prototype, "priority", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], UpdateTodoDto.prototype, "category", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateTodoDto.prototype, "dueDate", void 0);
export class ReorderTodoDto {
    id;
    position;
}
__decorate([
    IsInt(),
    __metadata("design:type", Number)
], ReorderTodoDto.prototype, "id", void 0);
__decorate([
    IsInt(),
    __metadata("design:type", Number)
], ReorderTodoDto.prototype, "position", void 0);
export class ReorderTodosDto {
    items;
}
//# sourceMappingURL=todo.dto.js.map