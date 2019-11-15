import {Component, ElementRef, NgZone, ChangeDetectorRef, ViewChild, Renderer2, OnDestroy, OnInit, DoCheck} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {bufferTime, tap} from 'rxjs/operators';

@Component({
    selector: 'ticks-viewer',
    styles: [`
        .box{
            width : 10px;
            height: 12px;
            border: 1px solid black;
            margin-right: 3px;
        }
        :host{
            display: block;
            position: absolute;
            top: 8px;
            right: 8px;
            line-height:0px;
        }
        .notDisplay{
            border: 1px solid black;
        }
        .title{
            font-family: arial;
            font-size: 12px;
        }
    `],
    template: `
   <div style=" margin: auto;">
        <button #box class="box"></button>
        <span class="title">Ticks: {{value}} / s</span>
   </div>
`})
export class TicksViewerComponent implements OnDestroy , DoCheck {

  value = 0;
    sub: Subscription;
    ticks$ = new Subject<number>();

    @ViewChild( 'box' , { read: ElementRef , static : true } )
    boxElemRef: ElementRef<HTMLButtonElement>;

    constructor(
        protected render: Renderer2,
        protected zone: NgZone,
        protected cd: ChangeDetectorRef
    ) {
        zone.runOutsideAngular(() => {
          this.sub = this.ticks$.pipe(
              tap( t => this.updateBackgroundColor()),
              bufferTime(1000),
              tap( (val: number[]) => {
                this.value = val.length;
                this.cd.detectChanges();
              })
            ).subscribe();
        });
    }

    // tick
    ngDoCheck() {
        this.ticks$.next(1);
    }

    updateBackgroundColor() {
        this.render.setStyle(
            this.boxElemRef.nativeElement,
            'background-color',
            'red'
        );

        this.clearBackgroundColor();
    }
    clearBackgroundColor() {
        this.zone.runOutsideAngular(() => {
            setTimeout(() => {
                this.render.setStyle(
                    this.boxElemRef.nativeElement,
                    'background-color',
                    'white'
                );
            }, 75 );
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
