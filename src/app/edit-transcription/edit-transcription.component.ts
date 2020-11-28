import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-edit-transcription',
  templateUrl: './edit-transcription.component.html',
  styleUrls: ['./edit-transcription.component.scss']
})
export class EditTranscriptionComponent implements OnChanges {
  @Input()
  textToEdit!: string;
  showSummary = false;
  showLoadingSpinner = false;

  constructor() { }

  ngOnChanges(): void {
    if (this.textToEdit) {
    }
  }

  getSummary(): void {
    // TODO:
    // get summary from cognitive api service
    this.showLoadingSpinner = true;

    setTimeout(() => {
      this.showLoadingSpinner = false;
      this.showSummary = true;
    }, 3000);
  }
}
