import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MyserviceService } from '../services/myservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Initial navbar menu item bootstrap classes
  chuckRouteClassNames = 'nav-link';
  swRouteClassNames = 'nav-link';

  constructor(private service: MyserviceService, private router: Router) { }

  ngOnInit(): void {}

  /**
   * Navigates to a component that shows the search
   * results that matches the provided search value
   * @param form
   * @returns
   */
  onSearch(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const searchValue = form.value.searchField;
    this.service.redirectTo('/search-results', searchValue);
  }
  /**
   * Set navbar menu item to active wheb it is clicked/selected
   * @param navItem
   */
  setNavMenuItemActive(navItem: string) {
    switch (navItem) {
      case 'chuckRoute':
        this.chuckRouteClassNames = 'nav-link active';
        this.swRouteClassNames = 'nav-link';
        break;
      case 'swRoute':
        this.swRouteClassNames = 'nav-link active';
        this.chuckRouteClassNames = 'nav-link';
        break;
    }
  }

}
