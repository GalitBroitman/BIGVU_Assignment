import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  username = 'bigvu';
  password = 'interview';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(this.username+':'+this.password)
    })
  };

  constructor(private http: HttpClient) { }

  getCourseList() {
    const apiUrl = "https://interviews.bigvu.tv/course/list";
    return this.http.get(apiUrl, this.httpOptions);
  }

  getCourseByID(id: string) {
    const apiUrl = "https://interviews.bigvu.tv/course/" + id;
    return this.http.get(apiUrl,  this.httpOptions);
  }

}
