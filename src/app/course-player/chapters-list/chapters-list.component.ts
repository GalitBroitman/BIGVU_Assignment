import { SharedService } from './../../services/shared.service';
import { Component, Input, OnInit } from '@angular/core';
import { ChapterData, ChapterPosition } from '../chapterData.module';

@Component({
  selector: 'app-chapters-list',
  templateUrl: './chapters-list.component.html',
  styleUrls: ['./chapters-list.component.css']
})
export class ChaptersListComponent implements OnInit {
  @Input()
  card!: any;

  @Input()
  courseId!: any;

  @Input()
  selectedItem!: number;

  constructor(private sharedService: SharedService) {

  }
  
  ngOnInit(): void {

  }


  convertTime(time: number) {
    //get the number of full minutes
    const minutes = Math.floor(time / 60);

    // get the remainder of the seconds
    const seconds = time % 60;

    function padTo2Digits(num: number) {
      return num.toString().padStart(2, '0').substring(0,2);
    }

    //format as MM:SS
    const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
    return result;
  }

  chapterClicked(chapter: any, index: number) {
    // emit click on chapter to play chapter's video
    this.sharedService.emitEventChapter(chapter);
    // change the selected item
    this.selectedItem = chapter.id ;
    // change the last chapter played
    this.sharedService.setLastChapterToLocalStorage({cardId: this.courseId, chapter:chapter});
  }

  isChapterWatched(chapterId: string) {
    // find course elemen in local storage
    const courseElement = this.sharedService.getDataFromLocalStorage()?.find((element: ChapterData ) => 
    element.cardId === this.courseId);
    if(courseElement) {
      const chapterElement = courseElement.chapters.find((element: ChapterPosition ) => element.chapterId === chapterId);
      if(chapterElement) {
        // check if chapter is watched
        return chapterElement.watched;
      }
    }
    return false;
  }

  countFinished(){
    let counter = 0;
    const courseElement = this.sharedService.getDataFromLocalStorage()?.find((element: ChapterData ) => 
    element.cardId === this.courseId);
    if(courseElement) {
      // count how many chapters were watched
      counter = courseElement.chapters.filter((element: ChapterPosition ) => element.watched).length;
    }
    return counter;
  }
}
