import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { HTTP } from '@ionic-native/http';

import { UserService } from '../../services/user.service';
import { UploadPage } from '../upload/upload';
import { FeedPage } from '../feed/feed';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['../../assets/css/main.css'],
  providers: [ UserService ]
})
export class LoginPage {



	constructor(public navCtrl: NavController, private navParams: NavParams, private fb: Facebook, private toastCtrl: ToastController, private http: HTTP, private _userService: UserService) {

	   

	}

	connectWithFacebook(){
	  	this.fb.login(['public_profile', 'user_friends', 'email'])
		  	.then((res: FacebookLoginResponse) => {


		  	  	if (res.status === 'connected') {


		  	  		this.fb.api('/me?fields=id,name,email,gender,picture',[])
		  				.then((user) => {
		  					let userLoggedIn = user;

		  					if(user != null){

		  						this.fb.api('/me/friends',[])
		  						.then((friendList) => {


                                        let name = user.name.split(" ");
                                        let friendsID = [];

                                        if (friendList.data.length == 0)
                                            friendsID = null;
                                        else {
                                            for (let i = 0; i < friendList.data.length; i++) {
                                                friendsID.push(friendList.data[i].id);
                                            }
                                        }

                                        let data = {
                                            user: {
                                                userIdentifier: user.id,
                                                name: {
                                                    firstName: name[0],
                                                    lastName: name[1]
                                                },
                                                email: user.email,
                                                gender: user.gender,
                                                friendList: friendsID
                                            }
                                        };



														    
											let toast = this.toastCtrl.create({
												message: `Data Sent ${JSON.stringify(data)}`,
												duration: 500,
											});
											toast.present();



                                        this._userService.register(data).subscribe(data => {


                                            if(data.status === 'success'){





											  	let toast = this.toastCtrl.create({
													message: `Logged In : ${JSON.stringify(data)}`,
													duration: 500,
												});
												toast.present();


                                                if(data.profileImageStatus === 'save'){
   

												  	let toast = this.toastCtrl.create({
														message: `profileImageStatus : ${JSON.stringify(data)}`,
														duration: 500,
													});
													toast.present();

													this.navCtrl.push(FeedPage, {
													      user: userLoggedIn
													});

                                                        
                                                }else{

                                                	this.navCtrl.push(UploadPage, {
													      user: userLoggedIn
													});

                                                }               
                                                       
                                            }



									     
									    },
									    error => {
									  
										  	let toast = this.toastCtrl.create({
												message: `Not Able to Log In :( Try Again!`,
												duration: 6000,
											});
											toast.present();
									    });


		  						});

		  					}else{

							  	let toast = this.toastCtrl.create({
									message: `Not Able to Log In :( Try Again!`,
									duration: 6000,
								});
								toast.present();
		  					}

		  			});



		  	  	}
		})
		.catch(e => {
		  	let toast = this.toastCtrl.create({
				message: `Error Facebook Login :( Try Again!`,
				duration: 6000,
			});
			toast.present();
		});

	}

}
