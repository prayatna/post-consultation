import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SpeechToTextComponent } from './speech-to-text/speech-to-text.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EditTranscriptionComponent } from './edit-transcription/edit-transcription.component';



@NgModule({
  declarations: [	
    AppComponent,
    SpeechToTextComponent,
      EditTranscriptionComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
