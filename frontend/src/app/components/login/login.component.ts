import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(private auth: AngularFireAuth) {
    //kiểm tra đăng nhập trước đó
  // this.auth.user.subscribe((tk)=>{
  //   if(tk != null){
  //     //đăng nhập thành công
  //   }
  // })

  }

  ngOnInit() {}
  isGuest() {
    return true;
  }
  //đăng nhập
  userInfo : any;
  async LoginGG(){
  const provider = new auth.GoogleAuthProvider();
    const credential = await this.auth.auth.signInWithPopup(provider);
    //lấy thông tin người dùng
    this.userInfo = this.auth.auth.currentUser;
  
    console.log('login thành công');
  }

}
