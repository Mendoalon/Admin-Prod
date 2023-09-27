import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario.intefaces';
import { Hospital } from 'src/app/interfaces/hospital.intefaces';
import { Medico } from 'src/app/interfaces/medico.interfaces';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {
  private readonly base_url = environment.base_url;

  constructor(private http: HttpClient) { }

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

  private transformarUsuarios(resultados: any[]): Usuario[] {

    return resultados.map(
      (user: any) => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
    );

  }

  private transformarHospitales(resultados: any[]): Hospital[] {
    return resultados
  }

  private transformarMedicos(resultados: any[]): Medico[] {
    return resultados
  }

  buscar(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    termino: string
  ): Observable<any> {
    const url = `${this.base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers).pipe(
      map((resp: any) => {
        switch (tipo) {
          case 'usuarios':
            return this.transformarUsuarios(resp.resultados);
            break;

          case 'hospitales':
            return this.transformarHospitales(resp.resultados);
            break;

          case 'medicos':
            return this.transformarMedicos(resp.resultados);
            break;

          default:
            return [];
        }
      })
    );
  }


}
