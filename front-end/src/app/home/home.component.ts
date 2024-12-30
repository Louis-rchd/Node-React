import { Component } from '@angular/core';
import { DragAndDropComponent } from '../drag-and-drop/drag-and-drop.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [DragAndDropComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
}

