import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrListComponent } from './pr-list/pr-list.component';
import { PullRequestCardComponent } from './pull-request-card/pull-request-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card'

@NgModule({
  declarations: [
    AppComponent,
    PrListComponent,
    PullRequestCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Disable with NoopAnimationsModule
    MatCardModule,
    // Add imports for Material components, like MatButtonModule, MatCheckboxModule, etc.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
