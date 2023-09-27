import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from 'src/app/admin/services/hospital.service';
import { MedicosService } from 'src/app/admin/services/medicos.service';
import { Hospital } from 'src/app/interfaces/hospital.intefaces';
import { Medico } from 'src/app/interfaces/medico.interfaces';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {
  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public medicoSeleccionado!: Medico;
  public hospitalSeleccionado: Hospital | undefined;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicosService: MedicosService,
    private router: Router,
    private activatedRoute: ActivatedRoute

  ) {

    this.medicoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      hospital: ['', [Validators.required]]
    })
  }


  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe(({ id }) => this.cargarMedico(id) );

    this.cargarHospitales();
    this.cambiosHopitalId();
  }

  cargarMedico(id: string): void {
    if (id === 'nuevo') {
      return;
    }

    this.medicosService.optenerMedicoPorId(id)
      .subscribe({
        next: (medico) => {
          const { nombre, hospital: { _id } } = medico;
          this.medicoSeleccionado = medico;
          this.medicoForm.setValue({ nombre, hospital: _id });
        },
        error: () => {
          this.router.navigateByUrl(`/dashboard/medicos`);
        }
      });
  }


  cambiosHopitalId(): void {
    this.medicoForm.get('hospital')?.valueChanges
      .subscribe(hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId);

      })
  }

  cargarHospitales(): void {
    this.hospitalService.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      }
      )
  }

  guardarMedico(): void {

    const { nombre } = this.medicoForm.value;

    if(this.medicoSeleccionado){
      //Actualizar la medico
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }

      this.medicosService.ActualizarMedico(data)
      .subscribe( resp =>{
        Swal.fire('Actualizado', `${nombre} actualizado correctamente`, 'success');

        console.log(resp);

      })
    }else{
        //Crear la medico
        const { nombre } = this.medicoForm.value;

        this.medicosService.CrearMedico(this.medicoForm.value)
          .subscribe((resp: any) => {
            Swal.fire('Creado', `${nombre} Creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
          });
    }


  }



}
