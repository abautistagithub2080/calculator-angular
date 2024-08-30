import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { Calculator } from '../Models/Calculator';
import { ResponseAPI } from '../Models/ResponseAPI';

@Injectable({
  providedIn: 'root'
})
export class CalcsService {

  private http = inject(HttpClient);
  private apiUrl:string = appsettings.apiUrl + "Calc";
  private apiUrls:string = appsettings.apiUrl + "CalcOther";
  constructor() { }

  generateOperations(objetoX:Calculator){
    return this.http.post<ResponseAPI>(this.apiUrl,objetoX);
  }

  factorial(objeto:Calculator){
    return this.http.patch<ResponseAPI>(this.apiUrls,objeto);
  }

}
