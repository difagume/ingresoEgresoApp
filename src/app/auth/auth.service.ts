import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromFirebase from 'firebase';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { SetUserAction, ClearUserAction } from './auth.actions';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription();

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>) { }


  /**
   * Método que se encarga de escuchar los cambios del estado del usuario
   */
  initAuthListener() {
    this.afAuth.authState
      .subscribe((fbUser: fromFirebase.User) => {

        if (fbUser) {

          this.userSubscription = this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges()
            .subscribe((usuarioObj: any) => {

              const newUser = new User(usuarioObj);
              // sconsole.log(newUser);
              this.store.dispatch(new SetUserAction(newUser));

            });
        } else {

          this.userSubscription.unsubscribe();
        }
      });
  }


  crearUsuario(nombre: string, email: string, password: string) {

    this.store.dispatch(new ActivarLoadingAction());

    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(resp => {

        // Para agregar la colección a la DB
        const user: User = {
          nombre: nombre,
          email: resp.user.email,
          uid: resp.user.uid
        };

        this.afDB.doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {

            // redirecciono al dashboard
            this.router.navigate(['/']);

            this.store.dispatch(new DesactivarLoadingAction());
          });
      })
      .catch(error => {
        this.store.dispatch(new DesactivarLoadingAction());
        swal('Error en el registro', error.message, 'error');
      });
  }

  login(email: string, password: string) {

    this.store.dispatch(new ActivarLoadingAction());

    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(resp => {
        this.router.navigate(['/']);

        this.store.dispatch(new DesactivarLoadingAction());
      })
      .catch(error => {
        this.store.dispatch(new DesactivarLoadingAction());
        swal('Error en el login', error.message, 'error');
      });
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
    this.store.dispatch(new ClearUserAction());
  }

  isAuth() {
    return this.afAuth.authState
      .pipe(
        map(fbUser => {
          if (fbUser == null) {
            this.router.navigate(['/login']);
          }
          return fbUser != null;
        })
      );
  }
}
