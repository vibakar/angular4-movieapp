import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {

  constructor() { }

  checkForfav(favmovies, actualData, finalData){
   if(favmovies.length > 0) {
    actualData.forEach((movie)=>{
       favmovies.forEach((favMovie)=>{
         if(favMovie.id === movie.id) {
             movie.fav = true;
             let movieExists = finalData.find(m=>m.id == movie.id);
             if (!movieExists) {
               finalData.push(movie);
             }
         } else {
             let movieExists = finalData.find(m=>m.id == movie.id);
             if (!movieExists) {
               finalData.push(movie);
             }
         }
       })
     })
  } else {
    actualData.forEach(movie=>{
      finalData.push(movie)
    })
  }
 }
}
