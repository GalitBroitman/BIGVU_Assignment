import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';
import { CardService } from '../services/card.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements  OnInit {

cardList: any = [];

constructor(private cardService: CardService) {

}

ngOnInit(): void {
  this.cardList = this.cardService.getCourseList().subscribe(
    (data: any) => { // json data
       this.cardList = data.result;
    },
    (error: any) => {
        console.log('Error: ', error);
    });;
}



}
