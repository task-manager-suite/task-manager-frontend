import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskRequest } from '../../models/task-request.model';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrl: './edit-task-modal.component.scss'
})
export class EditTaskModalComponent implements OnInit {
  taskForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: TaskRequest
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data;
    this.taskForm = this.fb.group({
      title: [this.data?.title || '', [Validators.required, Validators.maxLength(100)]],
      description: [this.data?.description || ''],
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}