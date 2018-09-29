import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ChartsModule } from 'ng2-charts';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appReducers } from './app.reducer';
import { AuthModule } from './auth/auth.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';
import { EstadisticaComponent } from './ingreso-egreso/estadistica/estadistica.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { OrdenarIngresoEgresoPipe } from './ingreso-egreso/ordenar-ingreso-egreso.pipe';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        IngresoEgresoComponent,
        EstadisticaComponent,
        DetalleComponent,
        OrdenarIngresoEgresoPipe
    ],
    imports: [
        BrowserModule,
        AuthModule,
        SharedModule,
        AppRoutingModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
        ChartsModule,
        StoreModule.forRoot(appReducers),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
