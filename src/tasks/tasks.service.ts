import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from 'src/tasks/dto/create-task-dto';
import { TaskModel, TaskStatus } from 'src/tasks/task.model';
import { v4 as generateRandomId } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: TaskModel[] = [];

  getAllTasks(): TaskModel[] {
    return this.tasks;
  }

  getTaskById(id: string): TaskModel {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): TaskModel {
    const task: TaskModel = {
      id: generateRandomId(),
      status: TaskStatus.OPEN,
      ...createTaskDto,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): TaskModel {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
