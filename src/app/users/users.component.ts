
import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {NotificationService} from '../notification.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {SwalService} from '../swal.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {GsService} from '../gs.service'
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private uid: string;
  private users: any;
  role: any;
  userrole: string;



  constructor(private afs:AngularFirestore,
              private toast:NotificationService,
              private spinner:NgxSpinnerService,
              private router:Router,
              private s:SwalService,
              private gs:GsService,
              private storage:AngularFireStorage,
              private afAuth:AngularFireAuth)
  {
    afs.collection('users').valueChanges({idField:"docid"})
        .subscribe((res=>{
          this.users = res
        }))
    afAuth.authState.subscribe((res=>{
      if (res&&res.uid){
        this.uid = res.uid
        this.afs.collection('users').doc(res.uid).valueChanges().subscribe((res:any)=>{
          this.userrole = res.role
        })
      }
    }))


  }
  ngOnInit() {
  }

  goto(data) {
    this.gs.setParams(data)
    this.router.navigateByUrl('userprofile')
  }

  update(product: any,role) {
    console.log(role)
    this.afs.collection('users').doc(product.docid).update({role:role})
  }
}
