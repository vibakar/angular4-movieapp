import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxCarouselModule } from 'ngx-carousel';
import { HttpModule } from '@angular/http';
import 'hammerjs';

import { CoreModule } from './core/core.module';
import { MovieModule } from './movie/movie.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { MovieDisplayComponent } from './movie/movie-display/movie-display.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieDisplayComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    NgxCarouselModule,
    SharedModule,
    HttpModule,
    RouterModule.forRoot([{
      path: '',
      component: MovieDisplayComponent
    }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
