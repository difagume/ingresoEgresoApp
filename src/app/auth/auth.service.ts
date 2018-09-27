import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
    private router: Router) { }

  crearUsuario(nombre: string, email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(usuario => {
        console.log(usuario);
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error(error);
        swal('Error en el registro', error.message, 'error');
      });
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(usuario => {
        console.log(usuario);
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error(error);
        swal('Error en el login', error.message, 'error');
      });
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }
}
