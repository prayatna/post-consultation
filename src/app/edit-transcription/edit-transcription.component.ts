import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-transcription',
  templateUrl: './edit-transcription.component.html',
  styleUrls: ['./edit-transcription.component.scss']
})
export class EditTranscriptionComponent implements OnInit {
  @Input()
  textToEdit!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
