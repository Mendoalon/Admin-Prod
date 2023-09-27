import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from 'src/app/interfaces/hospital.intefaces';
import Swal from 'sweetalert2';
import { ModalImagenService } from 'src/app/admin/services/modal-imagen.service';
import { BusquedasService } from 'src/app/admin/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {
  public hospitales: Hospital[] =[] ;
  public cargando: boolean =true ;


  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
    ){}

  ngOnInit(): void {
    this.cargarHospitales();
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.cargarHospitales();

    }

    this.busquedasService.buscar('hospitales', termino)
      .subscribe(resp => {
        this.hospitales = resp
      }

      );

  }


  cargarHospitales(): void {
    this.cargando = true ;
    this.hospitalService.cargarHospitales()
    .subscribe( hospitales =>{
      this.cargando  = false ;
      this.hospitales = hospitales ;
    });
  }

  actualizarHospital(hospital: any) {

    if (hospital._id && hospital.nombre) {
      this.hospitalService.ActualizarHospitales(hospital._id, hospital.nombre)
        .subscribe({
          next: resp => {
            Swal.fire('Actualizado', hospital.nombre, 'success');
          },
          error: error => {
            console.error('Error al actualizar el hospital', error);
          }
        });
    } else {
      console.error('ID o nombre del hospital no válido');
    }
  }

  eliminarHospital(hospital: any) {

    if (hospital._id && hospital.nombre) {
      this.hospitalService.borrarHospitales(hospital._id)
        .subscribe({
          next: resp => {
            this.cargarHospitales();
            Swal.fire('Borrado', hospital.nombre, 'success');
          },
          error: error => {
            console.error('Error al borrar el hospital', error);
          }
        });
    } else {
      console.error('ID o nombre del hospital no válido');
    }
  }

  async abrirSweetAlert() {
    const result = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    });

    console.log(result.isConfirmed);


    if (result.isConfirmed) {
      const { value } = result;
      if (value && value.trim().length > 0) {
        this.hospitalService.CrearHospitales(value)
          .subscribe({
            next: resp => {
              console.log(resp);

              this.cargarHospitales();
            },
            error: error => {
              console.error('Error al crear el hospital', error);
            }
          });
      }
    }
  }

  abrirModal(hospital: Hospital){
    if (hospital._id) {
      this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
    }

  }




}
