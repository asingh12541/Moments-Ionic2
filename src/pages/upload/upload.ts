import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { MomentsService } from '../../services/moments.service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';

import { FeedPage } from '../feed/feed';

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
  providers: [ MomentsService ]
})
export class UploadPage {

	loggedInUser: any;

	constructor(public navCtrl: NavController, private navParams: NavParams, private toastCtrl: ToastController, private _momentsService: MomentsService, private camera: Camera) {
   		this.loggedInUser = navParams.get('user');			   

	}


	options: CameraOptions = {
		quality: 90,
		destinationType: this.camera.DestinationType.DATA_URL,
		sourceType: this.camera.PictureSourceType.CAMERA,
		allowEdit: false,
		encodingType: this.camera.EncodingType.JPEG,
		mediaType: this.camera.MediaType.PICTURE,
		targetWidth: 1024,
		targetHeight: 1024,
		saveToPhotoAlbum: false,
		correctOrientation: true
	}


	getProfilePhoto(){

		this.camera.getPicture(this.options).then((imageData) => {
			
            var data = {
                userIdentifier: this.loggedInUser.id,
                photoData: imageData,
                photoType: 'profile' // gallery or profile
            };

										    
		
            this._momentsService.savePhoto(data).subscribe(data => {
						  
            	if(data)
            		this.getPhotoStatus(data);
									     
			},
			error => {
									  
				let toast = this.toastCtrl.create({
					message: `Not Able to Upload Profile Pic :( Try Again!`,
					duration: 6000,
				});
				toast.present();
			});



		}, (err) => {
		 
		});
	}


   	authenticatedObs: Observable < boolean > ;
    userServiceSub: Subscription;
    authSub: Subscription;




	getPhotoStatus(data){

	 let source = Observable.interval(10000)
            .map(() => {
                this.userServiceSub =  this._momentsService.getPhotoStatus(data).subscribe(data => {
                     
                        if(data.photoStatus == 'processed'){ 
                                              

                        	this.unsubscribeNow();

							this.navCtrl.push(FeedPage, {
								user: this.loggedInUser
							});
                        }else{
												  
							let toast = this.toastCtrl.create({
								message: `Please upload you profile pic again :(`,
								duration: 6000,
							});
							toast.present();
							this.unsubscribeNow();

                        }

                    },
                    error => {
                     								  
						let toast = this.toastCtrl.create({
							message: `Please upload you profile pic again :(`,
							duration: 6000,
						});
						toast.present();
                    });
            });

        if (this.authSub) this.authSub.unsubscribe();
        this.authSub = source.subscribe();
	}




    unsubscribeNow() {
        if (this.userServiceSub) this.userServiceSub.unsubscribe();
        if (this.authSub) this.authSub.unsubscribe();
    }




}