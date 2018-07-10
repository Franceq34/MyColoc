import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-task-unrepeatable',
  templateUrl: './task-unrepeatable.component.html',
  styleUrls: ['./task-unrepeatable.component.css']
})
export class TaskUnrepeatableComponent implements OnInit {
  public showText: Boolean;
  public taskForm: FormGroup;
  public tasks: Task[];
   
  constructor(private fb: FormBuilder, private taskService: TaskService) { }

 
  ngOnInit() {
    this.loadTasks();

    this.taskForm = this.fb.group({
       nameTask: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  // Toogle le  de la task et met à jour la bd
  checkTask(index: number):void{
    // Get the task to update
    let updateTask = this.tasks[index];
    
    updateTask.isArchivedTask = !updateTask.isArchivedTask;
    // Set the date 
    updateTask.dateTask = Date.now();
    
    // Save in the bd
    this.taskService.updateTask(updateTask).subscribe( () => {
      // Reload tasks
      this.loadTasks();
    });

   
  }

  // Load or reoload tasks
  public loadTasks() {
    // Get tasks from bd 
    let sub = this.taskService.readAllTask().subscribe( tasks => {
      this.tasks = tasks;
      if(this.tasks.length > 0){
        this.showText = false;
      } else {
        this.showText = true;
      }
    });
  }

  // Create and save the new unchecked tasks
  createTask():void{
    let newTask = new Task(
      null,
      this.taskForm.value.nameTask,
      false,
      -1,
      Date.now()
    );

    this.taskService.addTask(newTask).subscribe( () => {
      this.loadTasks();
    });

    
  }

  deleteTask(id : number):void{
    let sub = this.taskService.deleteTask(id).subscribe( () => {
      this.loadTasks();
    });

    
  }

}