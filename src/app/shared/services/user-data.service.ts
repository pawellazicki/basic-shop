import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { User } from '../model/user.model'
import { Observable } from 'rxjs'

@Injectable()
export class UserDataService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
  }
}
