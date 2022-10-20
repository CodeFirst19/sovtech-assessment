import { Joke } from './../Models/joke.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Person } from '../Models/person.model';
import { JokeSearchResult } from '../Models/joke-search-results.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  // Listeners
  private categoriesListener = new Subject<string[]>();
  private jokeListener = new Subject<Joke>();
  private jokeSearchResultListener = new Subject<JokeSearchResult>();
  private peopleListener = new Subject<Person[]>();
  private loaderListener = new Subject<boolean>();

  // API base URL
  private BASE_URL = 'https://localhost:44351';


  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Gets all joke categories
   */
  getCategories() {
    this.http.get<string[]>(`${this.BASE_URL}/chuck/jokes/categories`)
    .subscribe((res) => {
      this.loaderListener.next(false);
      this.categoriesListener.next([...res]);
    }, (err) => {
      this.loaderListener.next(false);
      /**
       * Show dialog for erros
       * Library name: SweetAlert2
       */
      Swal.fire(
        'An error occured!',
        err.error.message,
        'error'
      );
    });
  }

  /**
   * Gets jokes that matches the given joke category
   * @param category
   */
  getRandomJoke(category: string) {
    this.http.get<Joke>(`${this.BASE_URL}/chuck/jokes/random?category=${category}`)
    .subscribe((res) => {
      this.loaderListener.next(false);
      this.jokeListener.next(res);
    }, (err) => {
      this.loaderListener.next(false);
      Swal.fire(
        'An error occured!',
        err.error.message,
        'error'
      );
    });
  }

  /**
   *
   * @param query Searches for joke that matches the given search value
   */
  searchJokes(query: string) {
    this.http.get<JokeSearchResult>(`${this.BASE_URL}/chuck/jokes/search?query=${query}`)
    .subscribe((res) => {
      this.loaderListener.next(false);
      this.jokeSearchResultListener.next(res)
    }, (err) => {
      this.loaderListener.next(false);
      Swal.fire(
        'An error occured!',
        err.error.message,
        'error'
      );
    });
  }

  /**
   * Gets all the star wars people
   */
  getStarWarPeople() {
    this.http.get<Person[]>(`${this.BASE_URL}/swapi/people`)
    .subscribe((res) => {
      this.loaderListener.next(false);
      this.peopleListener.next([...res])
    }, (err) => {
      this.loaderListener.next(false);
      Swal.fire(
        'An error occured!',
        err.error.message,
        'error'
      );
    });
  }

  /**
   * Searches for people/person that matches the given search value
   * @param query
   */
  searchStarWarPeople(query: string) {
    this.http.get<Person[]>(`${this.BASE_URL}/swapi/people/search?query=${query}`)
    .subscribe((res) => {
      this.loaderListener.next(false);
      this.peopleListener.next([...res]);
    }, (err) => {
      this.loaderListener.next(false);
      Swal.fire(
        'An error occured!',
        err.error.message,
        'error'
      );
    });
  }

  // Make listeners available to components.
  getCategoriesListener() {
    return this.categoriesListener.asObservable();
  }

  getJokeListener() {
    return this.jokeListener.asObservable();
  }

  getJokeSearchResultsListener() {
    return this.jokeSearchResultListener.asObservable();
  }

  getPeopleListener() {
    return this.peopleListener.asObservable();
  }

  getLoaderListener() {
    return this.loaderListener.asObservable();
  }

  /**
   * Redirects to a different route
   * @param uri
   */
  redirectTo(uri: string, searchValue: string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri], { queryParams: { query: searchValue } })
    );
 }

}
