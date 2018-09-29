import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AppState } from './ingreso-egreso.reducer';
import { IngresoEgresoService } from './ingreso-egreso.service';


@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  forma: FormGroup;
  tipo = 'ingreso';
  cargando: boolean;
  loadingSubscription: Subscription = new Subscription();

  constructor(private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>) { }

  ngOnInit() {

    this.loadingSubscription = this.store.select('ui')
      .subscribe(ui => this.cargando = ui.isLoading);

    this.forma = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl('0', Validators.min(0))
    });

  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  crearIngresoEgreso() {
    this.store.dispatch(new ActivarLoadingAction());

    const ingresoEgreso = new IngresoEgreso({ ...this.forma.value, tipo: this.tipo });

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then(() => {

        this.store.dispatch(new DesactivarLoadingAction());

        swal(ingresoEgreso.tipo.charAt(0).toUpperCase() + ingresoEgreso.tipo.slice(1) + ' creado', ingresoEgreso.descripcion, 'success');

        this.forma.reset({ monto: 0 });

      })
      .catch(err => {
        this.store.dispatch(new DesactivarLoadingAction());
        swal('Error', ingresoEgreso.tipo.charAt(0).toUpperCase() + ingresoEgreso.tipo.slice(1) + ' no creado', 'error');
      });
  }

}
