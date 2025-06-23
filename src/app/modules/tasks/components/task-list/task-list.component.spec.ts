import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { Task } from '../../models/task.model';
import { TaskStatus } from '../../models/task-status.enum';
import { of, throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskService } from '../../services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskServiceMock: any;
  let snackBarMock: any;
  let dialogMock: any;

  const mockTasks: Task[] = [
    { id: 1, title: 'Test Task 1', description: 'Description 1', status: TaskStatus.TODO },
    { id: 2, title: 'Test Task 2', description: 'Description 2', status: TaskStatus.IN_PROGRESS }
  ];

  beforeEach(async () => {
    taskServiceMock = {
      getAll: jasmine.createSpy('getAll').and.returnValue(of(mockTasks)),
      create: jasmine.createSpy('create').and.returnValue(of({})),
      update: jasmine.createSpy('update').and.returnValue(of({})),
      delete: jasmine.createSpy('delete').and.returnValue(of({})),
      updateStatus: jasmine.createSpy('updateStatus').and.returnValue(of({}))
    };

    snackBarMock = {
      open: jasmine.createSpy('open')
    };

    dialogMock = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of({ title: 'New Task', description: 'New Desc' })
      })
    };

    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [BrowserAnimationsModule, SharedModule],
      providers: [
        { provide: TaskService, useValue: taskServiceMock },
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: MatDialog, useValue: dialogMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', () => {
    expect(taskServiceMock.getAll).toHaveBeenCalled();
    expect(component.dataSource.data.length).toBe(2);
  });

  it('should open add dialog and create task', fakeAsync(() => {
    component.openAddDialog();
    tick();
    expect(dialogMock.open).toHaveBeenCalled();
    expect(taskServiceMock.create).toHaveBeenCalled();
    expect(snackBarMock.open).toHaveBeenCalledWith('Task created', 'Close', { duration: 2000 });
  }));

  it('should open edit dialog and update task', fakeAsync(() => {
    const task = mockTasks[0];
    component.openEditDialog(task);
    tick();
    expect(dialogMock.open).toHaveBeenCalled();
    expect(taskServiceMock.update).toHaveBeenCalledWith(task.id, {
      title: 'New Task',
      description: 'New Desc'
    });
    expect(snackBarMock.open).toHaveBeenCalledWith('Task updated', 'Close', { duration: 2000 });
  }));

  it('should delete task after confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.deleteTask(1);
    expect(taskServiceMock.delete).toHaveBeenCalledWith(1);
    expect(snackBarMock.open).toHaveBeenCalledWith('Task deleted', 'Close', { duration: 2000 });
  });

  it('should update status if different', () => {
    const task: Task = { id: 1, title: 'Task', description: '', status: TaskStatus.TODO };
    component.updateTaskStatus(new Event('click'), task, TaskStatus.IN_PROGRESS);
    expect(taskServiceMock.updateStatus).toHaveBeenCalledWith(task.id, TaskStatus.IN_PROGRESS);
    expect(snackBarMock.open).toHaveBeenCalledWith('Status updated', 'Close', { duration: 2000 });
  });

  it('should not update status if same', () => {
    const task: Task = { id: 1, title: 'Task', description: '', status: TaskStatus.TODO };
    component.updateTaskStatus(new Event('click'), task, TaskStatus.TODO);
    expect(taskServiceMock.updateStatus).not.toHaveBeenCalled();
  });

  it('should handle error when loading tasks', () => {
    taskServiceMock.getAll.and.returnValue(throwError(() => new Error('fail')));
    component.loadTasks();
    expect(snackBarMock.open).toHaveBeenCalledWith('Failed to load tasks', 'Close', { duration: 3000 });
  });
});