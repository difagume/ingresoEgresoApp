import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
      .pipe(
        filter(ingresoEgreso => ingresoEgreso.items.length > 0)
      )
      .subscribe(ingresoEgreso => this.items = ingresoEgreso.items);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  borrarItem(uid: string) {
    console.log(uid);
  }

}
