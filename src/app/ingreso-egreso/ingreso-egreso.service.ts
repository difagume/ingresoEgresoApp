import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { SetItemsAction } from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListenerSubscription: Subscription = new Subscription();
  ingresoEgresoItemsSubscription: Subscription = new Subscription();

  constructor(private afDB: AngularFirestore,
    private store: Store<AppState>) { }


  initIngresoEgresoListener() {

    this.ingresoEgresoListenerSubscription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null) // Permite establecer una condición, si se cumple deja pasar, si no se cumple no pasa
      )
      .subscribe(auth => this.ingresoEgresoItems(auth.user.uid));
  }


  private ingresoEgresoItems(uid: string) {
    this.ingresoEgresoItemsSubscription = this.afDB.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(docData => {

          return docData.map(doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data()
            };
          });

        })
      )
      .subscribe((coleccion: any[]) => {
        // console.log(coleccion);
        this.store.dispatch(new SetItemsAction(coleccion));
      });
  }


  cancelarSubscriptions() {
    this.ingresoEgresoListenerSubscription.unsubscribe();
    this.ingresoEgresoItemsSubscription.unsubscribe();
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
