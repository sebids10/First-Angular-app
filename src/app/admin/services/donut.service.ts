import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Donut } from '../models/donut.model';

import { tap, of, map, catchError, throwError, retryWhen, delay, take } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DonutService {
  private donuts: Donut[] = [];

  constructor(private http: HttpClient) {}


  read() {
    if(this.donuts.length)
    {
      return of(this.donuts);
    }
    let headers= new HttpHeaders(
      {
        'Content-Type': 'application/json',

      })
      headers=headers.append('Api-Token','1234abcd');

    const options={
      headers,
    };

    return this.http.get<Donut[]>('http://localhost:3000/donuts', options).pipe(
      tap((donuts) => {
        this.donuts = donuts;
      }),
      retryWhen((errors) => {
        return errors.pipe(delay(5000), take(2));//wait 1 second for delay
      }),
      catchError(this.handleError)
    );
    
    
  }
  readOne(id: string | null) {
    return this.read().pipe(
      map((donuts)=>{
        const donut = donuts.find((donut: Donut) => donut.id == id);
        if (donut) {
          return donut;
        }
        return { name: '', icon: '', price: 0, description: '' };
      })
    )
    
   }


  create(payload: Donut) {
    return this.http.post<Donut>('http://localhost:3000/donuts', payload).pipe(
      tap((donut) => {
        this.donuts = [...this.donuts, donut];
      }),
      catchError(this.handleError)
    );
   
  }
  update(payload: Donut) {
    return this.http
      .put<Donut>(`http://localhost:3000/donuts/${payload.id}`, payload).pipe(
        tap((donut) => {
        this.donuts= this.donuts.map((item: Donut)=>{
          if(item.id==donut.id)
          {
            return donut;
          }
          return item;
        })
      }),
      catchError(this.handleError)
      
      );
   
   
  }
  delete (payload: Donut)
  {
    return this.http
      .delete<Donut>(`http://localhost:3000/donuts/${payload.id}`).pipe(
        tap(()=>{
        this.donuts = this.donuts.filter((donut: Donut) => donut.id !== payload.id);
      }),
      catchError(this.handleError)
      );
    
  }

  private handleError(err: HttpErrorResponse)
   {
     if (err.error instanceof ErrorEvent) {
       //client-side
       console.warn('Client', err.message);
     } else {
       //server side
       console.warn('Server', err.status);
     }
     return throwError(() => new Error(err.message));
   }
}
