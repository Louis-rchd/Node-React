import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drag-and-drop',
  imports: [CommonModule],
  templateUrl: './drag-and-drop.component.html',
  styleUrl: './drag-and-drop.component.css'
})
export class DragAndDropComponent {
  isDragging = false;
  droppedFiles: File[] = [];

  onDragOver(event: DragEvent) { //Function that changes isDragging boolean if file is over drag and drop zone
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) { //Function that changes isDragging boolean if file is not over drag and drop zone
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) { //Function that adds dropped files to the array containing files
    event.preventDefault();
    this.isDragging = false;

    if (event.dataTransfer?.files) {
      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        this.droppedFiles.push(event.dataTransfer.files[i]);
      }
    }
  }

  onFileSelect(event: Event) { //Function that adds selected files to the array Files
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        this.droppedFiles.push(input.files[i]);
      }
    }
  }
}
