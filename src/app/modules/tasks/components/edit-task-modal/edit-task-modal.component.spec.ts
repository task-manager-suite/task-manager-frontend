import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditTaskModalComponent } from './edit-task-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../../shared/shared.module';

describe('EditTaskModalComponent', () => {
    let component: EditTaskModalComponent;
    let fixture: ComponentFixture<EditTaskModalComponent>;

    const mockDialogRef = {
        close: jasmine.createSpy('close')
    };

    const taskData = {
        title: 'Test Task',
        description: 'Test Description'
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EditTaskModalComponent],
            imports: [
                ReactiveFormsModule,
                BrowserAnimationsModule,
                SharedModule
            ],
            providers: [
                { provide: MatDialogRef, useValue: mockDialogRef },
                { provide: MAT_DIALOG_DATA, useValue: taskData }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditTaskModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        (mockDialogRef.close as jasmine.Spy).calls.reset();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize form in edit mode with provided data', () => {
        expect(component.isEditMode).toBeTrue();
        expect(component.taskForm.value.title).toBe('Test Task');
        expect(component.taskForm.value.description).toBe('Test Description');
    });

    it('should close dialog with form data on submit when valid', () => {
        component.taskForm.setValue({
            title: 'Updated Task',
            description: 'Updated Description'
        });

        component.onSubmit();

        expect(mockDialogRef.close).toHaveBeenCalledWith({
            title: 'Updated Task',
            description: 'Updated Description'
        });
    });

    it('should not close dialog if form is invalid', () => {
        component.taskForm.controls['title'].setValue(''); // make invalid
        component.onSubmit();
        expect(mockDialogRef.close).not.toHaveBeenCalled();
    });

    it('should close dialog on cancel', () => {
        component.onCancel();
        expect(mockDialogRef.close).toHaveBeenCalled();
    });
});
