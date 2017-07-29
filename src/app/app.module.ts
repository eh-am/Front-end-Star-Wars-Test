import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CatalogComponent } from './catalog/catalog.component';

import { MdButtonModule } from '@angular/material';
import { MdListModule } from '@angular/material';
import { MdToolbarModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MdButtonModule,
    MdListModule,
    MdToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
