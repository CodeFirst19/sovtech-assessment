import { MyserviceService } from './../../services/myservice.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: string[];
  private categoriesSubscription: Subscription;

  showLoader: boolean;
  private showLoaderSubscription: Subscription;

  constructor(private service: MyserviceService, private router: Router) { }

  ngOnInit(): void {

    this.showLoader = true;

    this.service.getCategories();
    this.categoriesSubscription = this.service.getCategoriesListener()
    .subscribe((categories: string[]) => this.categories = categories);

    this.showLoaderSubscription = this.service
      .getLoaderListener()
      .subscribe((showLoader) => this.showLoader = showLoader);
  }

  onFetchJoke(category: string) {
    this.router.navigate(['/joke'], { queryParams: { category: category } })
  }

  ngOnDestroy(): void {
    this.showLoaderSubscription.unsubscribe();
    this.categoriesSubscription.unsubscribe();
  }

}
