import {NgModule}             from "@angular/core";
import {CommonModule}         from "@angular/common";
import {TicksViewerComponent} from "./ticks-viewer.component";

@NgModule({
    declarations: [ TicksViewerComponent ],
    exports     : [ TicksViewerComponent ],
    imports     : [ CommonModule ]    
})
export class TicksViewerModule { }