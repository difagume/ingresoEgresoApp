import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {

  forma: FormGroup;
  tipo = 'ingreso';

  constructor(private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {

    this.forma = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl('0', Validators.min(0))
    });

  }

  crearIngresoEgreso() {
    const ingresoEgreso = new IngresoEgreso({ ...this.forma.value, tipo: this.tipo });
    console.log(ingresoEgreso);

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then(() => {

        swal(ingresoEgreso.tipo.charAt(0).toUpperCase() + ingresoEgreso.tipo.slice(1) + ' creado', ingresoEgreso.descripcion, 'success');

        this.forma.reset({ monto: 0 });

      })
      .catch(err => swal('Error', ingresoEgreso.tipo.charAt(0).toUpperCase() + ingresoEgreso.tipo.slice(1) + ' no creado', 'error'));
  }

}
