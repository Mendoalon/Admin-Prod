import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerFrom = this.fb.group({
    nombre: ['hyh', [Validators.required, Validators.minLength(3)]],
    email: ['hyh@hotmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required ]],
    password2: ['123456', [Validators.required]],
    terminos: [true, [Validators.requiredTrue]],
  },{
    validators: this.passwordIguales('password', 'password2')
  });

  constructor(
    private fb: FormBuilder,
    private authService :AuthService,
    private router: Router
    ) { }


  crearUsuario(): void {
    this.formSubmitted = true;

    if (this.registerFrom.invalid) {
      return;
    }

    this.authService.crearUsuario(this.registerFrom.value).subscribe( resp =>{
      this.router.navigateByUrl('/dashboard')

    }, (err) =>{
      swal.fire('Error', err.error.msg, 'error');
    });
  }

  campoValido(campo: string): boolean {

    if (this.registerFrom.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }

  }

  aceptaTerminos(): boolean {
    return !this.registerFrom.get('terminos')?.value && this.formSubmitted;
  }

  contrasenasNoValidas(): boolean {
    const pass1 = this.registerFrom.get('password')?.value;
    const pass2 = this.registerFrom.get('password2')?.value;

    if ( (pass1 !== pass2) && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }

  passwordIguales(pass1: string, pass2: string){

    return ( formGroup: FormGroup ) =>{

        const pass1Control = formGroup.get(pass1);
        const pass2Control = formGroup.get(pass2);

        if(pass1Control?.value === pass2Control?.value ){
          pass2Control?.setErrors(null);
        }else{
          pass2Control?.setErrors({noEsIgual: true});
        }

    }
  }

}
