import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  constructor(public plt: Platform){
    if (this.plt.isPortrait()) {
      this.portrait = true;
    }
  }

  title = 'VirtualKeyboard';
  portrait = false;
  key='';
  input = '';
  focus = false;
  shift = false; //indicated wheather shift was pressed
  
  //vars for pressed button css design
  shiftPressed = false;
  tabPressed = false;
  backspacePressed = false;
  enterPressed = false;
  capsLockPressed = false;

  firstRow = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='];
  secondRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'];
  thirdRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"];
  fourthRow = ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'];


  ngOnInit(){
    window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
      const portrait = e.matches;
  
      if (portrait) { 
        this.portrait = true;
      } else {
          this.portrait = false;
      }
  });


    addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        if(this.focus){
          this.backspacePressed = true;
        (async () => { 
          await delay(80);
          this.backspacePressed = false
            })();
        }
      }

      if (event.getModifierState('CapsLock')) {
        this.capsLockPressed = true;
      } 
      else {
        this.capsLockPressed = false;
      }
      this.onCapsLock();
    });

  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    this.key = event.key;

    if(this.key == 'Enter'){
      this.onEnter();
    }
    (async () => { 
      await delay(80);
      this.key = '';
  })();
  }

  onFocus(){
    this.focus = true;
  }

  onBlur(){
    this.focus = false;
  }


  onShift(){
    this.shift = !this.shift;
    this.shiftPressed = true;
      this.firstRow = (this.shift ? ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'] : 
                                    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=']);
      this.secondRow = (this.shift ? ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', '|'] :
                                     ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\']);
      this.thirdRow = (this.shift ? ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '"'] :
                                    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"])
      this.fourthRow = (this.shift ? ['z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?'] :
                                     ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']);
      (async () => { 
      await delay(80);
      this.shiftPressed = false
        })();
  }


  onTab(){
    this.tabPressed = true;
    this.input = addSpaces(this.input, 4);
    (async () => { 
      await delay(80);
      this.tabPressed = false
      })();
  }


  onEnter(){
    this.enterPressed = true;
    (async () => { 
      await delay(80);
      this.enterPressed = false
      })();
  }


  onCapsLock(){
    if(this.capsLockPressed){
      this.secondRow = this.secondRow.map(element => { return element.toUpperCase(); });
      this.thirdRow = this.thirdRow.map(element => { return element.toUpperCase(); });
      this.fourthRow = this.fourthRow.map(element => { return element.toUpperCase(); });
    }
    if(!this.capsLockPressed){
      this.secondRow = this.secondRow.map(element => { return element.toLowerCase(); });
      this.thirdRow = this.thirdRow.map(element => { return element.toLowerCase(); });
      this.fourthRow = this.fourthRow.map(element => { return element.toLowerCase(); });
    }
  }
 

// function for handling virtual keyboard clicks
  onKeyboardClick(buttonValue: string){
    if(buttonValue == 'delete'){
      this.input = this.input.slice(0, -1);
    }
    else if(buttonValue == 'space'){
      this.input = addSpaces(this.input, 1);
    }
    else if(buttonValue == 'tab'){
      this.onTab();
    }
    else if(buttonValue == 'enter'){
      this.input += '\n';
      this.onEnter();
    }
    else if(buttonValue == 'shift'){
      this.onShift();
    }
    else if (buttonValue == 'capsLock'){
      this.capsLockPressed = !this.capsLockPressed;
      this.onCapsLock();
    }
    else{
        this.input += buttonValue;
    }
  }
}


function addSpaces(str: string, numSpaces: number){
  var a = str.split("");
  for(let i=0 ; i<numSpaces ; i++){
    a.push(" ");
  }
  a.unshift(" ");
  return a.join("");
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}