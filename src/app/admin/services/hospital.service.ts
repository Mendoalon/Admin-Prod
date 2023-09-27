import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Hospital } from 'src/app/interfaces/hospital.intefaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  private readonly base_url = environment.base_url;

  constructor(  private http: HttpClient ) { }


  get token(): string {
    return localStorage.getItem('token') || '';
  }


  get headers(): any {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarHospitales() {

    const url = `${this.base_url}/hospitales`;
    return this.http.get<Hospital[]>(url, this.headers)
    .pipe(
      map( (resp: any) => resp.hospitales )
    );

  }

  CrearHospitales(nombre: string) {

    const url = `${this.base_url}/hospitales`;
    return this.http.post(url,{ nombre }, this.headers);
  }

  ActualizarHospitales(id: string, nombre: string) {
    console.log(id, nombre);


    const url = `${this.base_url}/hospitales/${id}`;
    return this.http.put(url,{ nombre }, this.headers);
  }

  borrarHospitales(id: string) {

    const url = `${this.base_url}/hospitales/${id}`;
    return this.http.delete(url, this.headers);
  }

}
