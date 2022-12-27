import { fileManagerReducer } from './reducers/file-manager.reducer';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FileManagerModule } from './file-manager/file-manager.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatCardModule } from '@angular/material/card';
import { FileService } from './services/file.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FileManagerModule, FlexLayoutModule, MatCardModule, StoreModule.forRoot({reducer : fileManagerReducer}), !environment.production ? StoreDevtoolsModule.instrument() : []],
  providers: [FileService],
  bootstrap: [AppComponent]
})
export class AppModule {}
