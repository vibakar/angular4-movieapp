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

 getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
  
 deleteCookie(cname) {
    document.cookie = cname + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
 }

 isLoggedIn(){
   let usid = this.getCookie("U_SESSION_ID");
   if(usid){
     return true;
   } else {
     return false;
   }
 }
}
