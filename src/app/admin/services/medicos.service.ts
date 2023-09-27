import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Medico } from 'src/app/interfaces/medico.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

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

  cargarMedicos() {

    const url = `${this.base_url}/medicos`;
    return this.http.get<Medico[]>(url, this.headers)
    .pipe(
      map( (resp: any) => resp.medicos )
    );

  }

  CrearMedico(medico: {nombre: string, hospital: string}) {

    const url = `${this.base_url}/medicos`;
    return this.http.post(url, medico , this.headers);
  }

  ActualizarMedico(medico: Medico) {

    const url = `${this.base_url}/medicos/${medico._id}`;
    return this.http.put(url, medico , this.headers);
  }

  borrarMedico(_id: string) {

    const url = `${this.base_url}/medicos/${_id}`;
    return this.http.delete(url, this.headers);
  }

  optenerMedicoPorId(_id: string) {
    const url = `${this.base_url}/medicos/${_id}`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp:any) => resp.medico)
      );
  }





}
