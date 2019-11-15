# Angular Ticks Viewer

Angular ticks viewer component can help to see how many ticks has per second.

![Angular ticks viewer](https://github.com/eyalvardi/angular-ticks-viewer/blob/master/src/assets/atv.JPG)

[Live demo](http://ng-course.org/ng-course/demos/performance-optimization/#/counter)

## Install
ng add ticks-viewer

## Usage

1. import the TicksViewerModule from 'ticks-viewer'
2. Use the `<ticks-viewer>`  component.

```javascript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TicksViewerModule} from "ticks-viewer";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,       
        TicksViewerModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

@Component({
  selector: 'app-root',
  template:`
  <div>
      <ticks-viewer></ticks-viewer>
     ...
  </div>  
`})
export class AppComponent{}
