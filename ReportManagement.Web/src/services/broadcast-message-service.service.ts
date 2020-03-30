import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BroadcastMessageServiceService {

  constructor(
    private http: HttpClient
  ) { }

  getRecentBroadcastMessage(){
    return this.http
    .get<any>(environment.apiUrl + `broadcast/GetRecentMessages`)
    .pipe(
      map(res => {
        return res;
      })
    );
  }
}
