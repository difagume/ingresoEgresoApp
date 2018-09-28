import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from './ingreso-egreso.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private afDB: AngularFirestore,
    private store: Store<AppState>) { }


  initIngresoEgresoListener() {

    this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null) // Permite establecer una condición, si se cumple deja pasar, si no se cumple no pasa
      )
      .subscribe(auth => this.ingresoEgresoItems(auth.user.uid));
  }


  private ingresoEgresoItems(uid: string) {
    this.afDB.collection(`${uid}/ingresos-egresos/items`)
      .valueChanges()
      .subscribe(items => {
        console.log(items);
      });
  }


  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {

    let uidUsuario: string;
    this.store.select('auth')
      .subscribe(auth => uidUsuario = auth.user.uid)
      .unsubscribe();

    return this.afDB.doc(`${uidUsuario}/ingresos-egresos`)
      .collection('items').add({ ...ingresoEgreso });
  }

}
