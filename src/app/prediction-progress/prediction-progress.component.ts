import { Component, Input } from '@angular/core';

@Component({
  selector: 'prediction-progress',
  styleUrls: [ './prediction-progress.component.scss' ],
  templateUrl: './prediction-progress.component.html'
})
export class PredictionProgressComponent {
  private _matches: number = 0;
  private _predictions: number = 0;

  @Input()
  set matches(num: number) {
    if(!isNaN(num) && num >= 0) {
      this._matches = num;
    }
  }

  get matches(): number {
    return this._matches;
  }

  @Input()
  set predictions(num: number) {
    if(!isNaN(num) && num >= 0) {
      this._predictions = num;
    }
  }

  get predictions(): number {
    return this._predictions;
  }

  get percentComplete(): number {
    if(this.matches < 1) {
      return 100;
    }

    return Math.round((this.predictions * 100) / this.matches);
  }

}
