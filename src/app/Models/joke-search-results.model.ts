import { Joke } from './joke.model';
export interface JokeSearchResult {
  total: number;
  result: Joke[];
}
