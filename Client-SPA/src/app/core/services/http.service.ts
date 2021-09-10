import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, repeat, retry } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}

  GET_DATA<T>(apiURL: string): Observable<T> {
    return this.http.get<T>(`${apiURL}`)
    // .pipe(pluck("response_payload"));
  }

  POST_DATA<T>(apiURL: string, postObject?: any): Observable<T> {
    return this.http
      .post<T>(apiURL, postObject)
      // .pipe(pluck("response_payload"));
  }

  POST_DATA_WITHOUT_PAYLOAD<T>(
    apiURL: string,
    postObject?: any
  ): Observable<T> {
    return this.http.post<T>(apiURL, postObject);
  }

  POST_DATA_API_RES<T>(apiURL: string, postObject: any): Observable<T> {
    return this.http.post<T>(apiURL, postObject).pipe(pluck("Result"));
  }

  PUT_DATA<T>(apiURL: string, postObject: any): Observable<T> {
    return this.http.put<T>(apiURL, postObject);
  }

  PUT_FILE_DATA<T>(apiURL: string, postObject: any): Observable<T> {
    return this.http.put<T>(apiURL, postObject);
  }

  

  GET_DATA_WITH_BODY<T>(apiURL: string): Observable<T> {
    return this.http.get<T>(`${apiURL}`, {}).pipe(pluck("response_payload"));
  }

  DELETE_DATA(apiURL: string) {
    var header: any = new HttpHeaders({ "Content-Type": "text/plain" });
    return this.http.delete(apiURL, { headers: header, responseType: "text" });
  }

  GET_STREAM(apiURL: string) {
    const headers = new HttpHeaders();
    return this.http.post(`${apiURL}`, {}, { headers, responseType: "blob" });
  }

  GET_STREAM_API(apiURL: string) {
    const headers = new HttpHeaders();
    return this.http.get(`${apiURL}`, { headers, responseType: "blob" });
  }

  GET_DATA_PARAMS<T>(apiURL: string, params: HttpParams): Observable<T> {
    return this.http.get<T>(`${apiURL}`, { params }); // .pipe(pluck('Result'));
  }

  GET_DATA_WITH_PARAMETERS<T>(
    apiURL: string,
    parameterName: string,
    parameter: any,
    returnType: T
  ): Observable<T> {
    return this.http
      .get<T>(`${apiURL}?${parameterName}=${parameter}`)
      .pipe(pluck("Result"));
  }
}
