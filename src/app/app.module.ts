import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { CoreModule } from './core/core.module';
import { MovieModule } from './movie/movie.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { MovieDisplayComponent } from './movie/movie-display/movie-display.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    HttpModule,
    MovieModule,
    RouterModule.forRoot([{
      path: '',
      component: MovieDisplayComponent
    },{
      path: '**',
      redirectTo: '/',
      pathMatch: 'full'
    }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
