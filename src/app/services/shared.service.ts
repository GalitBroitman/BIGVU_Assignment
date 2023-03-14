import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private chapterClickedSubject = new Subject<any>();

  chaptersData = [];

  constructor() { }

  emitEventChapter(data: any) {
    this.chapterClickedSubject.next(data);
  }

  getEventChapter() {
    return this.chapterClickedSubject.asObservable();
  }

  setDataToLocalStorage(data: any) {
    localStorage.setItem('chaptersData', JSON.stringify(data));
  }

  getDataFromLocalStorage() {
    const data = localStorage.getItem('chaptersData');
    if (data !== null && data !== ''){
      return JSON.parse(data);
    }
    return [];
  }

  setLastChapterToLocalStorage(data: any) {
    localStorage.setItem('LastChapter', JSON.stringify(data));
  }

  geLastChapterFromLocalStorage() {
    const data = localStorage.getItem('LastChapter');
    if (data !== null && data !== ''){
      return JSON.parse(data);
    }
    return null;
  }
}
