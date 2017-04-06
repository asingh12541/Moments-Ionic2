import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ToastController, ModalController } from 'ionic-angular';

import { PermissionsPage } from '../permissions/permissions';
import { ItemDetailsPage } from '../item-details/item-details';

import { PhotoLibrary, LibraryItem } from '@ionic-native/photo-library';

import { MomentsService } from '../../services/moments.service';


const THUMBNAIL_WIDTH = 512;
const THUMBNAIL_HEIGHT = 384;

@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [MomentsService]
})
export class FeedPage {

  thumbnailWidth = THUMBNAIL_WIDTH + 'px';
  thumbnailHeight = THUMBNAIL_HEIGHT + 'px';

  library: LibraryItem[];
  loggedInUser: any;

  constructor(public navCtrl: NavController,
    private photoLibrary: PhotoLibrary, private platform: Platform, private navParams: NavParams, private cd: ChangeDetectorRef, private toastCtrl: ToastController, private modalCtrl: ModalController, private _momentsService: MomentsService) {

    this.fetchPhotos();
    this.loggedInUser = navParams.get('user');    
  }

  fetchPhotos() {

    this.platform.ready().then(() => {

      this.library = [];

      this.photoLibrary.getLibrary().subscribe({
        next: library => {
        

 /*         for(let libraryItem in library){

            let toast = this.toastCtrl.create({
                message: `libraryItem recieved ${JSON.stringify(libraryItem)}`,
                duration: 2000,
              });
              toast.present();  

            
           
          }
*/
          this.getPhoto(library[1]);
        },
        error: (err: string) => {
          if (err.startsWith('Permission')) {

            let permissionsModal = this.modalCtrl.create(PermissionsPage);
            permissionsModal.onDidDismiss(() => {
              // retry
              this.fetchPhotos();
            });
            permissionsModal.present();

          } else { // Real error
            let toast = this.toastCtrl.create({
              message: `getLibrary error: ${err}`,
              duration: 6000,
            });
            toast.present();
          }
        },
        complete: () => {
          // Library completely loaded
        }
      });

    });

  }

  itemTapped(event, libraryItem) {
    this.navCtrl.push(ItemDetailsPage, {
      libraryItem: libraryItem
    });
  }

  trackById(index: number, libraryItem: LibraryItem): string { return libraryItem.id; }


  getPhoto(libraryItem){

     let toast = this.toastCtrl.create({
              message: `${JSON.stringify(libraryItem)}`,
              duration: 10000,
            });
            toast.present();

    this.photoLibrary.getPhoto(libraryItem).then(imageData =>{
       
                            
            let toast = this.toastCtrl.create({
              message: `${JSON.stringify(imageData)}`,
              duration: 20000,
            });
            toast.present();

            this.uploadPhoto(imageData);
      },
      error => {
                      
        let toast = this.toastCtrl.create({
          message: `Not Able to get Pic : Try Again!`,
          duration: 6000,
        });
        toast.present();
      });

  }


  uploadPhoto(imageData){



    var data = {
      userIdentifier: this.loggedInUser.id,
      photoData: imageData,
      photoType: 'gallery' // gallery or profile
    };


let toast = this.toastCtrl.create({
          message: `Upload Phot Called ${JSON.stringify(imageData.substring(0,40))}`,
          duration: 20000,
        });
        toast.present();
                        
    
    this._momentsService.savePhoto(data).subscribe(data => {
            if(data){
              let toast = this.toastCtrl.create({
                message: `Image uploaded successfully`,
                duration: 6000,
              });
              toast.present();   
            }


    },
    error => {
                    
      let toast = this.toastCtrl.create({
        message: `Not Able to Upload Pic: ${JSON.stringify(error)}`,
        duration: 10000,
      });
      toast.present();
    });

  }

}
