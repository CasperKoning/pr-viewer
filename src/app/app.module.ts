import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrListComponent } from './pr-list/pr-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card'
import { MatListModule } from '@angular/material/list'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    PrListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Disable with NoopAnimationsModule
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    // Add imports for Material components, like MatButtonModule, MatCheckboxModule, etc.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
