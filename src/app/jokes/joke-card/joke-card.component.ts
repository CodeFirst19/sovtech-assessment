import { Component, Input, OnInit } from '@angular/core';
import { Joke } from 'src/app/Models/joke.model';

@Component({
  selector: 'app-joke-card',
  templateUrl: './joke-card.component.html',
  styleUrls: ['./joke-card.component.css']
})
export class JokeCardComponent implements OnInit {

  @Input() joke: Joke;
  @Input() cardClasses: string;
  cardImageUrl = 'https://easydrawingguides.com/wp-content/uploads/2021/12/Laughing-Emoji-with-Hands-step-by-step-drawing-tutorial-step-04.png'

  constructor() { }

  ngOnInit(): void {
  }

}
