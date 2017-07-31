import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk';

import { AppComponent } from './app.component';
import { CatalogComponent } from './catalog/catalog.component';

import { ApiService } from './api/api.service';

import {
  MdButtonModule, 
  MdListModule,
  MdToolbarModule,
  MdInputModule,
  MdDialogModule,
  MdProgressSpinnerModule,
  MdTableModule,
  MdSortModule
} from '@angular/material';
import { PersonInfoComponent } from './person-info/person-info.component';
import { PersonInfoDialogComponent } from './person-info-dialog/person-info-dialog.component';
import { PersonLabelPipe } from './person-label.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    PersonInfoComponent,
    PersonInfoDialogComponent,
    PersonLabelPipe
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    HttpModule,
    NgxPaginationModule,
    MdButtonModule,
    MdListModule,
    MdInputModule,
    MdToolbarModule,
    MdDialogModule,
    MdProgressSpinnerModule,
    MdTableModule,
    FormsModule,
    CdkTableModule,
    MdSortModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent],
  entryComponents: [PersonInfoDialogComponent]
})
export class AppModule { }
