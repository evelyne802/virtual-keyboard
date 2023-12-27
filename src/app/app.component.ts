import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'VirtualKeyboard';
  
  firstRow = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='];
  firstRowClasses = [''];

  secondRow = [];
  secondRowClasses = [];

  thirdRow = [];
  thirdRowClasses = [];

  fourthRow = [];
  fourthRowClasses = [];

  fifthRow = [];
  fifthRowClasses = [];

  ngOnInit(){
    
  }
}
