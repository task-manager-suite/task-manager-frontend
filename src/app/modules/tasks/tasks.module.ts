import { NgModule } from '@angular/core';
import { TasksRoutingModule } from './tasks-routing.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import { EditTaskModalComponent } from './components/edit-task-modal/edit-task-modal.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TaskListComponent,
    EditTaskModalComponent
  ],
  imports: [
    TasksRoutingModule,
    SharedModule
  ]
})
export class TasksModule { }
