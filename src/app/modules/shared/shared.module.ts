import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSortModule,
    MatDialogModule,
    MatTooltipModule,
    MatMenuModule,
    MatChipsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSortModule,
    MatDialogModule,
    MatTooltipModule,
    MatMenuModule,
    MatChipsModule,
    MatPaginatorModule
  ]
})
export class SharedModule { }
