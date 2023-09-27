import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  private base_url = environment.base_url;


  transform(img: string, tipo: 'usuarios' | 'medicos' | 'hospitales'): string {

    if (!img) {
      return '../../../assets/images/no-img.jpg';
    } else if (img.includes('https')) {
      return img;
    } else if (img) {
      return '../../../assets/images/no-img.jpg';
    } else {
      return `${this.base_url}/upload/usuarios/no-image`;
    }
  }

}
