import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as fromFirebase from 'firebase';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore) { }


  /**
   * Método que se encarga de escuchar los cambios del estado del usuario
   */
  initAuthListener() {
    this.afAuth.authState
      .subscribe((fbUser: fromFirebase.User) => {
        console.log(fbUser);
      });
  }



  crearUsuario(nombre: string, email: string, password: string) {
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

          });
      })
      .catch(error => {
        // console.error(error);
        swal('Error en el registro', error.message, 'error');
      });
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(resp => {
        // console.log(usuario);
        this.router.navigate(['/']);
      })
      .catch(error => {
        // console.error(error);
        swal('Error en el login', error.message, 'error');
      });
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
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
