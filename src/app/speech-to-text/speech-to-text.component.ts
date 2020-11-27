import { Component, OnInit } from '@angular/core';
import { AudioConfig, CancellationReason, ResultReason, SpeechConfig, SpeechRecognizer } from 'microsoft-cognitiveservices-speech-sdk';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.scss']
})

export class SpeechToTextComponent implements OnInit {
  recognizer: SpeechRecognizer;
  recognizing = false;
  lastRecognized = '';
  liveDictationString = '';
  finalDictatedString = '';

  constructor() {
    const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
    const speechConfig = SpeechConfig.fromSubscription(environment.SUBSCRIPTION_KEY, environment.REGION);
    speechConfig.speechRecognitionLanguage = 'en-US';
    speechConfig.enableDictation();

    this.recognizer = new SpeechRecognizer(speechConfig, audioConfig);

    this.recognizer.recognizing = (s, e) => {
      console.log(`RECOGNIZING: Text=${e.result.text}`);
      this.liveDictationString = this.lastRecognized + e.result.text;
    };

    this.recognizer.recognized = (s, e) => {
      if (e.result.reason == ResultReason.RecognizedSpeech) {
        console.log(`RECOGNIZED: Text=${e.result.text}`);
        this.lastRecognized += e.result.text + '\r\n';
        this.liveDictationString = this.lastRecognized;
      }
      else if (e.result.reason == ResultReason.NoMatch) {
        console.log('NOMATCH: Speech could not be recognized.');
      }
    };

    this.recognizer.canceled = (s, e) => {
      console.log(`CANCELED: Reason=${e.reason}`);

      if (e.reason == CancellationReason.Error) {
        console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
        console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
        console.log('CANCELED: Did you update the subscription info?');
      }

      this.recognizer.stopContinuousRecognitionAsync();
    };

    this.recognizer.sessionStopped = (s, e) => {
      console.log('\n    Session stopped event.');
      this.recognizer.stopContinuousRecognitionAsync();
    };
  }

  ngOnInit(): void { }
  startRecording(): void {
    if (this.recognizing) {
      this.stopRecording();
    }
    else {
      this.recognizing = true;
      console.log('record');
      this.recognizer.startContinuousRecognitionAsync();
    }
  }

  stopRecording(): void {
    console.log('recording stopped');

    this.recognizer.stopContinuousRecognitionAsync();
    this.recognizing = false;
    this.finalDictatedString = this.lastRecognized;
  }
}

