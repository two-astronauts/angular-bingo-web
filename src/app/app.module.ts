import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Routing
import { AppRoutingModule } from './app-routing.module';

// Library
import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiNotificationsModule, TUI_SANITIZER, TuiModeModule, TuiThemeNightModule, TuiSvgModule, TuiScrollbarModule } from "@taiga-ui/core";
import { TuiInputModule, TuiIslandModule } from "@taiga-ui/kit";

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TuiRootModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    TuiDialogModule,
    TuiNotificationsModule,
    TuiIslandModule,
    TuiThemeNightModule,
    TuiModeModule,
    TuiInputModule,
    TuiSvgModule,
    TuiScrollbarModule
  ],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
  bootstrap: [AppComponent]
})
export class AppModule { }
