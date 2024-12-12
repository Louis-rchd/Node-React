import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title :string = 'tp3';

  constructor() {
    console.log('AppComponent.constructor()')
  }

  ngOnInit(): void {
    console.log('AppComponent.ngOnInit()')
  }
}
