import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FourInARowSettings } from '../../models/four-in-a-row.model';
import { FormsModule } from '@angular/forms';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-four-in-a-row-settings',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './four-in-a-row-settings.component.html',
  styleUrl: './four-in-a-row-settings.component.scss',
})
export class FourInARowSettingsComponent {
  faCheck = faCheck;
  @Output() changeSettings: EventEmitter<FourInARowSettings> =
    new EventEmitter<FourInARowSettings>();
  settings: FourInARowSettings = {
    rows: 6,
    columns: 7,
    winCondition: 4,
  };

  save() {
    this.changeSettings.emit(this.settings);
  }
}
