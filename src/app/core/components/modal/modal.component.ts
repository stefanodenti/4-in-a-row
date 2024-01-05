import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ModalContainerDirective } from './modal-container.directive';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'eurekax-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
})
export class ModalComponent {
  faTimes = faTimes;

  @Input() title?: string;
  @Input() position: 'center' | 'top' | 'bottom' = 'center';
  @Input() showCloseButton: boolean = true;
  @Input() showConfirmActions: boolean = false;
  @Input() confirmText: string = 'Confirm';
  @Input() cancelText: string = 'Cancel';
  @Input() backdropDismiss: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'lg';
  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild(ModalContainerDirective, { static: true })
  modalDirective!: ModalContainerDirective;

  constructor(private elementRef: ElementRef) {}

  close(backdrop?: boolean) {
    if (!backdrop || (backdrop && this.backdropDismiss)) {
      this.elementRef.nativeElement.remove();
      this.closeEvent.emit(false);
    }
  }

  confirm() {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit(true);
  }
}
