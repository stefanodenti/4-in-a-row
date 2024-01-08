import { Component, Input } from '@angular/core';
import { PlayerScore } from '../../models/four-in-a-row.model';

@Component({
  selector: 'app-four-in-a-row-score',
  standalone: true,
  imports: [],
  templateUrl: './four-in-a-row-score.component.html',
  styleUrl: './four-in-a-row-score.component.scss'
})
export class FourInARowScoreComponent {
  @Input({required: true}) playerScore: PlayerScore[] = [];
}
