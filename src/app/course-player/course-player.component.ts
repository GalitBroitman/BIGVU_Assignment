import { CardService } from './../services/card.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { ChapterData, ChapterPosition } from './chapterData.module';

@Component({
  selector: 'app-course-player',
  templateUrl: './course-player.component.html',
  styleUrls: ['./course-player.component.css']
})
export class CoursePlayerComponent implements OnInit {
  courseId!: string;
  cardData!: any;
  chapterData!: any;
  videoUrl!: string;
  dataFromStorage: any = [];


  constructor(private route: ActivatedRoute, private cardService: CardService,
    private sharedService: SharedService ) {
    
      // subscribe to listen chapter clicked event
    this.sharedService.getEventChapter().subscribe((data: any) => {
      this.handleChapterClick(data);
    });
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        // get the course id from url parameters 
        this.courseId = params['id'];
      }
    )
    this.cardService.getCourseByID(this.courseId).subscribe((data) => {
      this.cardData = data;
      // get last chapter data from local storage if exist
      const lastChapter = this.sharedService.geLastChapterFromLocalStorage();
      if(lastChapter.cardId === this.courseId) {
        // get video url to play
        this.videoUrl = lastChapter.chapter.asset?.resource?.stream?.url;
        this.chapterData = lastChapter.chapter;
      }
      else{
        this.videoUrl = this.cardData.chapters[0].asset?.resource?.stream?.url;
        this.chapterData = this.cardData.chapters[0];
        this.sharedService.setLastChapterToLocalStorage({cardId: this.courseId, chapter:this.chapterData});
      }
      
      const video = document.getElementById('card-video') as HTMLVideoElement;
      video.load();
      video.play();
    })

    this.dataFromStorage = this.sharedService.getDataFromLocalStorage();

  }

  handleChapterClick(chapterData: any) {
    this.chapterData = chapterData;
    // get the chpters url to play the video
    this.videoUrl = chapterData?.asset?.resource?.stream?.url;
    const video = document.getElementById('card-video') as HTMLVideoElement;
    video.load();
    this.onPlay();
  }

  onPlay(){
    console.log('Video played');
    // get video element
    const video = document.getElementById('card-video') as HTMLVideoElement;
    const courseElement = this.dataFromStorage.find((element: ChapterData ) => element.cardId === this.courseId);
    if(courseElement) {
      const chapterElement = courseElement.chapters.find((element: ChapterPosition ) => element.chapterId === this.chapterData.id);
      if(chapterElement) {
        // if video ended start from begining
        if(chapterElement.currentVideoPosition === this.chapterData.asset.resource.duration) {
          video.currentTime = 0;
        }
        else{
          video.currentTime = chapterElement.currentVideoPosition;
        }
      }
    }
    else{
      video.currentTime = 0;
    }
    video.play();
  }

  onPause(){
    console.log('Video paused');
    const video = document.getElementById('card-video') as HTMLVideoElement;
    const courseElement = this.dataFromStorage.find((element: ChapterData ) => element.cardId === this.courseId);
    const watched = video.currentTime > 10;
    if(courseElement) {
      const chapterElement = courseElement.chapters.find((element: ChapterPosition ) => element.chapterId === this.chapterData.id);
      if(chapterElement) {
        // save chapters video current position and check if watched
        chapterElement.currentVideoPosition = video.currentTime;  
        chapterElement.watched = watched || chapterElement.watched;
      }
      else{
        if(courseElement.chapters) {
          courseElement.chapters.push(new ChapterPosition(this.chapterData.id ,video.currentTime, watched));
        }
        else {
          courseElement.chapters = [new ChapterPosition(this.chapterData.id ,video.currentTime, watched)];
        }
      }
    }
    else{
      const data = new ChapterPosition(this.chapterData.id ,video.currentTime, watched);
      this.dataFromStorage.push(new ChapterData(this.courseId, [data]) );
    }

    // if chapter finished start new chapter video
    if(video.currentTime === this.chapterData.asset.resource.duration) {
      const currentIndex = this.cardData.chapters.findIndex((element: any)=> element.id === this.chapterData.id);
      const nextIndex = currentIndex + 1;
      if (nextIndex <  this.cardData.chapters.length) {
        this.chapterData = this.cardData.chapters[nextIndex];
        this.sharedService.setLastChapterToLocalStorage({cardId: this.courseId, chapter:this.chapterData});
        this.videoUrl = this.chapterData.asset?.resource?.stream?.url;
        video.load();
        video.play();
      } 
    }

    this.sharedService.setDataToLocalStorage(this.dataFromStorage);
  }

}

