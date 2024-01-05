import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from '../components/board/board.component';
import { ModalService } from './core/service/modal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('test', { static: true }) test: TemplateRef<HTMLElement> | null =
    null;
  title = '4-in-a-row';
  constructor(private modalService: ModalService) {}
  ngOnInit() {
    if (this.test) {
      const modal = this.modalService.openModal(this.test, {
        title: 'test',
        size: 'lg',
        position: 'center',
        showCloseButton: true,
        backdropDismiss: false,
      });
      modal.closeEvent.subscribe({
        next: () => {
          alert('closed')
        },
      });
    }
  }
}
