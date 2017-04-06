import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MomentsService {
  constructor (private http: Http) {

  }

  private _saveProfilePhotoApi = 'http://54.148.131.18/moments/api/photo/save';
  private _getPhotoStatusApi = 'http://54.148.131.18/moments/api/photo/get/';
 

 

  savePhoto(data) {
    let body = data;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this._saveProfilePhotoApi, body, <RequestOptionsArgs> {headers: headers})
                    .map((res: Response) => res.json())
                    .catch(this.handleError);

  }


  getPhotoStatus(data){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this._getPhotoStatusApi + '/' + data.photoId, <RequestOptionsArgs> {headers: headers})
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }


  private handleError (error: Response) {
    return Observable.throw(error || "Server Error");
  }

}