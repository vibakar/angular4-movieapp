import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class MovieService {

  constructor(private http:Http) { }

  getNowPlayingMovies() {
  	return this.http.get('/v1/movie/nowplaying')
  }

}
