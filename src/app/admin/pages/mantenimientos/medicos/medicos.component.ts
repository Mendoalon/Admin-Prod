import { Component, OnInit } from '@angular/core';
import { MedicosService } from '../../../services/medicos.service';
import { Medico } from 'src/app/interfaces/medico.interfaces';
import { ModalImagenService } from 'src/app/admin/services/modal-imagen.service';
import { BusquedasService } from 'src/app/admin/services/busquedas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css'],
})
export class MedicosComponent implements OnInit {
  public medicos: Medico[] = [];
  public cargando: boolean = true;

  constructor(
    private medicosService: MedicosService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos(): void {
    this.cargando = true;
    this.medicosService.cargarMedicos().subscribe((medicos) => {
      this.cargando = false;
      this.medicos = medicos;
    });
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.cargarMedicos();
    }

    this.busquedasService.buscar('medicos', termino).subscribe((resp) => {
      this.medicos = resp;
    });
  }

  abrirModal(medico: Medico): void {
    console.log(medico._id);
    if (medico._id) {
      this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
    }
  }

  borrarMedico(medico: Medico): void {
    Swal.fire({
      title: '¿Borrar médico?',
      text: `Está a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        if (medico._id) {
          this.medicosService.borrarMedico(medico._id)
            .subscribe({
              next: resp => {
                this.cargarMedicos();
                Swal.fire(
                  'Usuario borrado',
                  `${medico.nombre} fue eliminado correctamente`,
                  'success'
                );
              },
              error: error => {
                console.error('Error al borrar el médico', error);
              }
            });
        } else {
          console.error('ID del médico no válido');
        }
      }
    });
  }


}
