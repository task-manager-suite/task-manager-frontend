import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';
import { ThemePalette } from '@angular/material/core';
import { TaskStatusHelper } from '../../helpers/task-status.helper';
import { TaskStatus } from '../../models/task-status.enum';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['title', 'description', 'status', 'actions'];
  dataSource = new MatTableDataSource<Task>();

  pageEvent: PageEvent | undefined;
  pageSize: number = 10;
  currentPage: number = 1;
  totalSize: number = 0;

  statusOptions = Object.values(TaskStatus);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  loadTasks(event?:PageEvent) {
    if(event) {
      this.currentPage = (event?.pageIndex ?? 0) + 1;
      this.pageSize = event?.pageSize ?? 10;
    }
    this.taskService.getAll(this.currentPage, this.pageSize).subscribe({
      next: (pagedResponse) => {
        this.dataSource.data = pagedResponse.items;
        this.totalSize = pagedResponse.count;
        this.dataSource.sort = this.sort;
      },
      error: (err) => this.snackBar.open('Failed to load tasks', 'Close', { duration: 3000 }),
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(EditTaskModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.create(result).subscribe({
          next: () => {
            this.snackBar.open('Task created', 'Close', { duration: 2000 });
            this.loadTasks();
          },
          error: () => this.snackBar.open('Create failed', 'Close', { duration: 3000 }),
        });
      }
    });
  }

  openEditDialog(task: Task) {
    const dialogRef = this.dialog.open(EditTaskModalComponent, {
      data: { title: task.title, description: task.description },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.update(task.id, result).subscribe({
          next: () => {
            this.snackBar.open('Task updated', 'Close', { duration: 2000 });
            this.loadTasks();
          },
          error: () => this.snackBar.open('Update failed', 'Close', { duration: 3000 }),
        });
      }
    });
  }

  deleteTask(id: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Task deleted', 'Close', { duration: 2000 });
          this.loadTasks();
        },
        error: () => this.snackBar.open('Delete failed', 'Close', { duration: 3000 }),
      });
    }
  }


  getStatusColor(status: string): ThemePalette {
    return TaskStatusHelper.getStatusColor(status);
  }

  getFriendlyStatus(status: TaskStatus): string {
    return TaskStatusHelper.getFriendlyStatus(status);
  }

  updateTaskStatus(event: Event, task: Task, newStatus: TaskStatus): void {
    event.stopPropagation();

    if (task.status === newStatus) return;

    this.taskService.updateStatus(task.id, newStatus).subscribe({
      next: () => {
        this.snackBar.open('Status updated', 'Close', { duration: 2000 });
        this.loadTasks();
      },
      error: () => this.snackBar.open('Failed to update status', 'Close', { duration: 3000 }),
    });
  }
}