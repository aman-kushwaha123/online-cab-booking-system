import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { RegisterComponent } from './Components/register/register.component';
import { GetrideComponent } from './Components/Ride/getride/getride.component';
import { ChooserideComponent } from './Components/Ride/chooseride/chooseride.component';
import { LoginComponent } from './Components/login/login.component';
import { authguard } from './Components/core/auth-guard';

import { Component } from '@angular/core';
import { DriverNotificationComponent } from './Components/driver-notification/driver-notification.component';
import { DriverregisterComponent } from './Components/Driver/driverregister/driverregister.component';
import { DriverloginComponent } from './Components/Driver/driverlogin/driverlogin.component';
import { loginguard } from './Components/core/login-guard';
import { FirstPageComponent } from './Components/first-page/first-page.component';
import { AdminDashboardComponent } from './Components/admin/admin-dashboard/admin-dashboard.component';
import { DriverComponent } from './Components/admin/manage/driver/driver.component';
import { PendingdriverComponent } from './Components/admin/manage/pendingdriver/pendingdriver.component';
import { AllbookingsComponent } from './Components/admin/manage/allbookings/allbookings.component';
import { AllusersComponent } from './Components/admin/manage/allusers/allusers.component';
import { adminguard } from './Components/core/admin-guard';
import { BookinghistoryComponent } from './Components/bookinghistory/bookinghistory.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { DriverProfileComponent } from './Components/driver-profile/driver-profile.component';
import { driverauthtgaurd } from './Components/core/driver-auth-gaurd';
import { AvialableDriversComponent } from './Components/admin/manage/avialable-drivers/avialable-drivers.component';

export const routes: Routes = [
  {
      path:"",
      component:FirstPageComponent,
      
      
  },
  {
    path:"home",
    component:HomeComponent,
    canActivate:[authguard]

  },
  {
    path:"register",
    component:RegisterComponent,
    canActivate:[loginguard]


  },
  {
    path:'getride',
    component:GetrideComponent,
    canActivate:[authguard,driverauthtgaurd],
  },
  {
    path:'bookings',
    component:BookinghistoryComponent,
    canActivate:[authguard,driverauthtgaurd]
  },
  {
    path:'profile',
    component:ProfileComponent,
    canActivate:[authguard]
  },
  {
    path:'driver/profile',
    component:DriverProfileComponent,
    canActivate:[authguard]
  },
  {
    path:'login',
    component:LoginComponent,
    canActivate:[loginguard]

  },
  {
    path:'driver/notification',
    component:DriverNotificationComponent,
    canActivate:[authguard,driverauthtgaurd]

  },
   {
     path:"driver/register",
     component:DriverregisterComponent,
     canActivate:[loginguard]


  },
  {
    path:"driver/login",
    component:DriverloginComponent,
    canActivate:[loginguard]

  },
  {
    path:"admin/dashboard",
    component:AdminDashboardComponent,
    canActivate:[adminguard]

  },
  {
    path:"admin/drivers",
    component:DriverComponent,
    canActivate:[authguard,adminguard]
  },
  {
    path:"admin/drivers/manage/pendings",
    component:PendingdriverComponent,
    canActivate:[authguard,adminguard]
  },
  {
    path:"admin/allbookings",
    component:AllbookingsComponent,
    canActivate:[authguard,adminguard]
  },
  {
    path:"admin/allusers",
    component:AllusersComponent,
    canActivate:[authguard,adminguard]
  },
  {
     path:"admin/available/drivers",
    component:AvialableDriversComponent,
    canActivate:[authguard,adminguard]
  }
  
];
