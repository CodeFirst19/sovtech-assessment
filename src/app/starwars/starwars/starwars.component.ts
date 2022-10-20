import { Person } from './../../Models/person.model';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MyserviceService } from 'src/app/services/myservice.service';

@Component({
  selector: 'app-starwars',
  templateUrl: './starwars.component.html',
  styleUrls: ['./starwars.component.css']
})
export class StarwarsComponent implements OnInit {

  people: Person[];
  private peopleSubscription: Subscription;

  showLoader: boolean;
  private showLoaderSubscription: Subscription;

  constructor(private service: MyserviceService) { }

  ngOnInit(): void {

    this.showLoader = true;

    this.service.getStarWarPeople();
    this.peopleSubscription = this.service.getPeopleListener()
    .subscribe((people: Person[]) => this.people = people);

    this.showLoaderSubscription = this.service
      .getLoaderListener()
      .subscribe((showLoader) => this.showLoader = showLoader);
  }

  ngOnDestroy(): void {
    this.showLoaderSubscription.unsubscribe();
    this.peopleSubscription.unsubscribe();
  }

}
