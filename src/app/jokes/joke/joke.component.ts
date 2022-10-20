import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Joke } from 'src/app/Models/joke.model';
import { MyserviceService } from 'src/app/services/myservice.service';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css']
})
export class JokeComponent implements OnInit {

  joke: Joke;
  private jokeSubscription: Subscription;

  showLoader = false;
  private showLoaderSubscription: Subscription;

  category: string;

  constructor(private service: MyserviceService, private router: ActivatedRoute) { }

  ngOnInit(): void {

    this.showLoader = true;

    this.router.queryParamMap.subscribe((param) => this.category = param['params']['category']);

    if (this.category) {
      this.service.getRandomJoke(this.category);
      this.jokeSubscription = this.service.getJokeListener()
      .subscribe((joke: Joke) => this.joke = joke);
    }

    this.showLoaderSubscription = this.service
      .getLoaderListener()
      .subscribe((showLoader) => this.showLoader = showLoader);
  }

  ngOnDestroy(): void {
    this.showLoaderSubscription.unsubscribe();
    this.jokeSubscription.unsubscribe();
  }

}
