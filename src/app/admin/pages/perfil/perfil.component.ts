import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { AuthAdminService } from '../../services/auth-admin.service';
import { Usuario } from 'src/app/interfaces/usuario.intefaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public perfilFrom!: FormGroup;
  public usuario!: Usuario;
  public imagenSubir!: File;
  public imgTemp: any;

  constructor(
    private fb: FormBuilder,
    private authAdminService: AuthAdminService,
    private authService: AuthService,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = this.authService.usuario;
  }

  ngOnInit(): void {
    this.perfilFrom = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });

  }

  cambiarImagen(file: File): void | null {
    this.imagenSubir = file;

    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  subirImagen() {
    if (this.usuario && this.usuario.uid) {
      this.fileUploadService
        .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
        .then(img => {
          this.usuario.img = img
          Swal.fire('Exito!', 'Imagen guardada', 'success');
        })
        .catch(err => {
          Swal.fire('Error', 'No se pudo subir la imagen', 'error');
        });
    }

  }

  actualizarPerfil() {
    this.authAdminService.actualizarPerfil(this.perfilFrom.value)
      .subscribe(() => {
        const { nombre, email } = this.perfilFrom.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire('Exito!', 'Se actualizaron los datos', 'success');

      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

}
