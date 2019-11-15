import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ticks-viewer></ticks-viewer>
    <div style="text-align:center" class="content">
      <h1>
        Welcome to {{title}}!
      </h1>
      <button (click)="title = title + '!'">click = tick</button>
      <button (click)="toggle()">50ms ticks</button>
      <div>
        {{value}}
      </div>
    </div>
    
  `,
  styles: []
})
export class AppComponent {
  title   = 'angular-ticks-viewer';
  isStart = false;
  id      = null ;
  value   = 0;

  start(){
    this.isStart = true;
    this.id = setInterval( ()=>{
      this.value++;
    } , 50);
  }
  stop(){
    this.isStart = false;
    clearInterval(this.id);
  }

  toggle(){
    if(this.isStart) {
      this.stop();
    } else {
      this.start();
    }
  }
}
