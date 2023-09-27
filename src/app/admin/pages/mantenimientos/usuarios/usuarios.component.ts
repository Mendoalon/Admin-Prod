import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { AuthAdminService } from 'src/app/admin/services/auth-admin.service';
import { BusquedasService } from 'src/app/admin/services/busquedas.service';
import { ModalImagenService } from 'src/app/admin/services/modal-imagen.service';
import { Usuario } from 'src/app/interfaces/usuario.intefaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public tatalUusuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public imgSubs!: Subscription;


  constructor(
    private authAdminService: AuthAdminService,
    private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService,
  ) { }


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }



  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(1000)
      )
      .subscribe( img => {
        this.cargarUsuarios()
      })
  }

  cargarUsuarios() {
    this.cargando = true;
    this.authAdminService.cargarUusarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.tatalUusuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      })
  }

  cambiarPagina(valor: number): void {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.tatalUusuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.usuarios = this.usuariosTemp;
      return;
    }

    this.busquedasService.buscar('usuarios', termino)
      .subscribe( (resp: Usuario[] ) => {
        this.usuarios = resp;
      });
  }

  eliminarUsuario(usuario: Usuario) {


    if (usuario.uid === this.authAdminService.uid) {
      Swal.fire('Error', 'No puede eliminarse asi mismo', 'error');
      return;
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar'
    }).then((result) => {

      if (result.isConfirmed) {

        this.authAdminService.eliminarUsuario(usuario)
          .subscribe(resp => {

            this.cargarUsuarios();
            Swal.fire(
              'Usuario borrado',
              `${usuario.nombre} fue eliminado correctamente`,
              'success'
            )

          });
      }
    })

  }


  cambiarRole(usuario: Usuario){
    this.authAdminService.guardarUsuario(usuario)
      .subscribe( resp =>{
        console.log(resp);

      });

  }

  abrirModal(usuario: Usuario){
    if (usuario.uid) {
      this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
    }

  }

}
