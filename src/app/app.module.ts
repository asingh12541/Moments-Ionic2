import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { UploadPage } from '../pages/upload/upload';
import { FeedPage } from '../pages/feed/feed';


import { PermissionsPage } from '../pages/permissions/permissions';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CDVPhotoLibraryPipe } from './cdvphotolibrary.pipe.ts';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { Facebook } from '@ionic-native/facebook';
import { HTTP } from '@ionic-native/http';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    UploadPage,
    FeedPage,
    PermissionsPage,
    ItemDetailsPage,
    CDVPhotoLibraryPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    UploadPage,
    FeedPage,
    PermissionsPage,
    ItemDetailsPage,
  ],
  providers: [
    PhotoLibrary,
    Facebook,
    HTTP,
    Camera,
    StatusBar, SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
