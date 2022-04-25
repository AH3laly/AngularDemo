import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../mockups/Task';
import { Subscription } from 'rxjs';
import { UiService } from '../../services/ui.service';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  text!: string;
  day!: string;
  reminder: boolean = false;
  showAddTask!: boolean;
  subscription: Subscription;

  @Output() onCreateTask: EventEmitter<Task> = new EventEmitter();
  
  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe((value) => this.showAddTask = value);
  }

  ngOnInit(): void {
  }

  onSubmit(){
    
    // Validate
    if(!this.text){
      alert("Please add a task");
      return;
    }

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }

    this.onCreateTask.emit(newTask);

    // Reset fields
    this.text = '';
    this.day = '';
    this.reminder = false;
  }

}
