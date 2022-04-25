import { Component, OnInit } from '@angular/core';
import { Task } from '../../mockups/Task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks)=>{
      this.tasks = tasks;
    });
  }

  createTask(task: Task){
    this.taskService.createTask(task).subscribe((task)=>(
      this.tasks.push(task)
    ));
  }

  deleteTask(task: Task){
    this.taskService.deleteTask(task).subscribe(()=>(
      // Filter the Tasks to to remove the Deleted Item
      this.tasks = this.tasks.filter((t) => t.id !== task.id)
    ));
  }

  toggleReminder(task: Task){
    task.reminder = !task.reminder;
    this.taskService.toggleReminder(task).subscribe(()=>(
      alert("Reminder Toggled")
    ));
  }

}
