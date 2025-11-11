import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet, NavigationEnd } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './Components/home/home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { filter } from 'rxjs';
import { AuthService } from './services/auth.service';
import { DriverService } from './services/driver.service';
import { LoadingService } from './services/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, FooterComponent
    // TODO: `HttpClientModule` should not be imported into a component directly.
    // Please refactor the code to add `provideHttpClient()` call to the provider list in the
    // application bootstrap logic and remove the `HttpClientModule` import from this component.
    , MatSidenavModule
    , MatToolbarModule, MatIconModule, MatButtonModule
    , MatListModule, RouterLink,MatProgressSpinnerModule,NgIf,AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  router = inject(Router)
  route = inject(ActivatedRoute);
  admin: any
  authService = inject(AuthService);
  toastrService = inject(ToastrService)
  cdr=inject(ChangeDetectorRef)
  driverService = inject(DriverService)
  loadingService=inject(LoadingService)
  loading$ = this.loadingService.loading$
  // Subscribe and trigger manual change detection on value changes
 


  constructor() {

  }

  ngOnInit() {
    
  }


  

  



}


