import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { Usuario } from 'src/app/interfaces/usuario.intefaces';
import { Medico } from 'src/app/interfaces/medico.interfaces';
import { Hospital } from 'src/app/interfaces/hospital.intefaces';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  public usuarios: Usuario[] =[];
  public medicos: Medico[] =[];
  public hospitales: Hospital[] =[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private busquedasService: BusquedasService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ termino }) => this.busquedaGlobal(termino));

  }

  busquedaGlobal(termino: string): void {

    this.busquedasService.busquedaBlobal(termino)
      .subscribe( (resp: any) =>{
        this.usuarios   = resp.usuarios;
        this.medicos    = resp.medicos;
        this.hospitales = resp.hospitales;
      })
  }

  abrirMedico(medico: Medico): void {
    console.log(medico);

  }

}
