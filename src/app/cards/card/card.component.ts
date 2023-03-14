
import { CardService } from '../../services/card.service';
import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input()
  card!: any;

  chapterCounter: number = 0;
  cardColor!: string;

  

  constructor( private cardService: CardService, ) {
  }

  ngOnInit() {
     this.cardService.getCourseByID(this.card.id).subscribe((data: any)=> {
        this.chapterCounter = data.chapters.length;
     })
     this.cardColor = this.generateRandomColor();
  }

  handleCardClick(){
    // route to course player page
    return '/player/'+this.card.id;  
  }

  generateRandomColor(){
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
  }

}


