import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from './ingreso-egreso.model';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private afDB: AngularFirestore,
    private store: Store<AppState>) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {

    let uidUsuario: string;

    this.store.select('auth')
      .subscribe(auth => {
        uidUsuario = auth.user.uid;
      });

    return this.afDB.doc(`${uidUsuario}/ingresos-egresos`)
      .collection('items').add({ ...ingresoEgreso });
  }

}
