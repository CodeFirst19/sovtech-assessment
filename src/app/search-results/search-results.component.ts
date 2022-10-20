import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JokeSearchResult } from '../Models/joke-search-results.model';
import { Joke } from '../Models/joke.model';
import { Person } from '../Models/person.model';
import { MyserviceService } from '../services/myservice.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  searchValue: string;

  jokes: Joke[];
  private jokeSearchResultSubscription: Subscription;

  people: Person[];
  private peopleSubscription: Subscription;

  showLoader: boolean;
  private showLoaderSubscription: Subscription;

  constructor(private service: MyserviceService, private router: ActivatedRoute) { }

  ngOnInit(): void {

    this.showLoader = true;

    this.router.queryParamMap.subscribe((param) => this.searchValue = param['params']['query']);

    this.service.searchJokes(this.searchValue);
    this.service.searchStarWarPeople(this.searchValue);

    this.jokeSearchResultSubscription = this.service.getJokeSearchResultsListener()
    .subscribe((jokes: JokeSearchResult) => this.jokes = jokes.result)

    this.peopleSubscription = this.service.getPeopleListener()
    .subscribe((people: Person[]) => this.people = people);

    this.showLoaderSubscription = this.service
      .getLoaderListener()
      .subscribe((showLoader) => this.showLoader = showLoader);
  }

  ngOnDestroy(): void {
    this.showLoaderSubscription.unsubscribe();
    this.jokeSearchResultSubscription.unsubscribe();
    this.peopleSubscription.unsubscribe();
  }

}
