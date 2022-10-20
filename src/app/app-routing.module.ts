import { SearchResultsComponent } from './search-results/search-results.component';
import { JokeComponent } from './jokes/joke/joke.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './jokes/categories/categories.component';
import { StarwarsComponent } from './starwars/starwars/starwars.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'joke', component: JokeComponent },
  { path: 'starwars', component: StarwarsComponent },
  { path: 'search-results', component: SearchResultsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
