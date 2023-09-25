import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario.intefaces';

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

  private transformarUusarios(resultados: any): Usuario[] {

    return resultados.map(
      (user: any) => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
    );

  }

  buscar(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    termino: string
  ) {

    const url = `${this.base_url}/todo/coleccion/${tipo}/${termino}`

    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {

          switch (tipo) {
            case 'usuarios':
              return this.transformarUusarios(resp.resultados);
              break;

            default:
              return [];
          }

        })
      )
  }

}
