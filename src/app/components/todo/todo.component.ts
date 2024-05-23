import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/task';

import { MatButtonModule } from '@angular/material/button';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { flush } from '@angular/core/testing';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatInputModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule, MatButtonModule, CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit {
  todoform!: FormGroup;
  tasks: Task[] = [];
  inprogress: Task[] = [];
  done: Task[] = [];
  isEditEnabled: boolean = false;
  updatedIndex!: any;

  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.todoform = this.fb.group({
      item: ["", Validators.required]
    })
  }



  addTask() {
    this.tasks.push({
      Title: this.todoform.value.item, completed: false
    });
    this.todoform.reset()
  }
  upDateTask() {
    this.tasks[this.updatedIndex].Title = this.todoform.value.item;
    this.tasks[this.updatedIndex].completed = false;
    this.updatedIndex = undefined;
    this.isEditEnabled = false;
    this.todoform.reset()
  }
  deleteTask(id: number) {
    this.tasks.splice(id, 1);
  }
  deleteInprogressTask(id: number) {
    this.inprogress.splice(id, 1)
  }
  deleteDoneTask(id: number) {
    this.done.splice(id, 1)
  }
  editTask(task: Task, Taskid: number) {
    this.todoform.controls['item'].setValue(task.Title);
    this.updatedIndex = Taskid;
    this.isEditEnabled = true;
  }
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
