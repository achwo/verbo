import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VerbListComponent } from './verb-list/verb-list.component';
import { TypeListComponent } from './type-list/type-list.component';

@NgModule({
  declarations: [
    AppComponent,
    VerbListComponent,
    TypeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
