import { Usuario } from "src/app/interfaces/usuario.intefaces";

export interface CargarUsuario {
  ok:       boolean;
  total: number,
  usuarios: Usuario[]
}


