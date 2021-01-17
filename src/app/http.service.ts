import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/bets7747a43.json'

  constructor(private $http: HttpClient) { }

  getData() {
    return this.$http.get<User[]>('https://s3-ap-southeast-1.amazonaws.com/he-public-data/bets7747a43.json')
    // .pipe(
    //   map(res => {
    //     res.
    //   })
    // )
  }
}
