import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  constructor (private http: Http) {

  }

  private _registerApi = 'http://54.148.131.18/moments/api/user/register';
 

 

  register(user) {
    let body = user;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this._registerApi, body, <RequestOptionsArgs> {headers: headers})
                    .map((res: Response) => res.json())
                    .catch(this.handleError);

  }


  private handleError (error: Response) {
    return Observable.throw(error || "Server Error");
  }

}