import {Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import {ModalContainerDirective} from "./modal-container.directive";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'eurekax-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ModalComponent {
  @Input() title?: string;
  @Input() position: 'center' | 'top' | 'bottom' = 'center';
  @Input() showCloseButton: boolean = true;
  @Input() backdropDismiss: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'lg';
  @Output() closeEvent: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild(ModalContainerDirective, {static: true}) modalDirective!: ModalContainerDirective;

  constructor(private elementRef: ElementRef) {
  }


  close(backdrop?: boolean) {
    if(!backdrop || (backdrop && this.backdropDismiss)) {
      this.elementRef.nativeElement.remove();
      this.closeEvent.emit()
    }
  }

}
