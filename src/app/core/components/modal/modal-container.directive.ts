import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[eurekaxModalContainer]'
})
export class ModalContainerDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
