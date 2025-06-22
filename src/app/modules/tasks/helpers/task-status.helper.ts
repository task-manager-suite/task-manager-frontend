import { ThemePalette } from "@angular/material/core";
import { TaskStatus } from "../models/task-status.enum";

const TaskStatusMap = new Map<TaskStatus, string>([
    [TaskStatus.TODO, 'To Do'],
    [TaskStatus.IN_PROGRESS, 'In Progress'],
    [TaskStatus.DONE, 'Done']
]);

export class TaskStatusHelper {

    public static getFriendlyStatus(status: TaskStatus): string {
        return TaskStatusMap.get(status) ?? status;
    }

    public static getStatusColor(status: string): ThemePalette {
      switch (status) {
        case 'TODO': return 'warn';
        case 'IN_PROGRESS': return 'accent';
        case 'DONE': return 'primary';
        default: return undefined;
      }
    }
}