import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { Task } from '../models/task.model';
import { TaskStatus } from '../models/task-status.enum';
import { environment } from '../../../../environments/environment';

describe('TaskService', () => {
    let service: TaskService;
    let httpMock: HttpTestingController;

    const dummyTask: Task = {
        id: 1,
        title: 'Test Task',
        description: 'Description',
        status: TaskStatus.TODO,
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TaskService]
        });

        service = TestBed.inject(TaskService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch all tasks', () => {
        const dummyTasks: Task[] = [dummyTask];
        const response = {
            items: dummyTasks,
            count: dummyTasks.length
        };
        const pageIndex = 1;
        const pageSize = 10;

        service.getAll(pageIndex, pageSize).subscribe(tasks => {
            expect(response.count).toBe(1);
            expect(tasks).toEqual(response);
        });

        const req = httpMock.expectOne((request) =>
            request.url === `${environment.apiUrl}/tasks` &&
            request.params.get('page') === '1' &&
            request.params.get('offset') === '10'
        );

        expect(req.request.method).toBe('GET');
        req.flush(response);
    });

    it('should create a task', () => {
        service.create(dummyTask).subscribe(task => {
            expect(task).toEqual(dummyTask);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/tasks`);
        expect(req.request.method).toBe('POST');
        req.flush(dummyTask);
    });

    it('should update a task', () => {
        const updatedTask = { ...dummyTask, title: 'Updated Title' };

        service.update(updatedTask.id!, updatedTask).subscribe(task => {
            expect(task).toEqual(updatedTask);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/tasks/${updatedTask.id}`);
        expect(req.request.method).toBe('PUT');
        req.flush(updatedTask);
    });

    it('should delete a task', () => {
        const taskId = 1;

        service.delete(taskId).subscribe(result => {
            expect(result).toBeNull();
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/tasks/${taskId}`);
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
    });
});
