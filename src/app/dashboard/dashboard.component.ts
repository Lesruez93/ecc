import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {GsService} from '../gs.service';
import swal from 'sweetalert2';
import {NotificationService} from '../notification.service';

declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    // google maps zoom level
    polygon: any;




    private logged: boolean;
    private cdata: any;
    private users: any;


    private tasks: any;
    private taskk: any;
    menus: any;
    deviceserial: any;
    devicetype: any;
    objectname: any;
    make: any;
    ICCID: any;
    servicenumber: any = +263;
    customername: any;
    date: any;
    technicianname: any;
    confirmedby: any;
    model: any;
    private id: any;
    private Adminusers: any;
    private role: any;

    constructor(
        private  af:AngularFirestore,
        private afs:AngularFireAuth,
        private router:Router,
        private gs:GsService,
        private n:NotificationService,
    )
    {




        this.afs.authState.subscribe(res => {
            this.af.collection('menu',ref => ref.orderBy('id','asc'))
                .valueChanges({idField:'docid'}).subscribe(res=>{
                this.menus = res
            })

            if (res && res.uid) {
                this.logged = true
                this.af.collection('users').doc(res.uid).valueChanges().subscribe((res:any)=>{
                    this.role = res.role
                })            }
            else {
                this.logged = false

                this.nav();

            }

        });

        af.collection('users',ref => ref.where('role','==',"Admin")).valueChanges({idField:"docid"})
            .subscribe((res=>{
                this.Adminusers = res
            }))

        af.collection('users',ref => ref.where('role','==',"Technician")).valueChanges({idField:"docid"})
            .subscribe((res=>{
                this.users = res
            }))

    }


    nav(){
        //this.afs.auth.signOut();

        this.router.navigate(['/login'])

    }

    navHome(){

        this.afs.authState.subscribe(res => {


            if (res && res.uid) {
                this.logged = true
                this.router.navigate(['/'])

            }
            else {
                this.logged = false

                alert('Please Login');
                this.nav();

            }

        })}





    ngOnInit(): void {

        $(document).ready(() => {

            console.log("wowsccdsccc")
        });

        //$('.dropdown-toggle').dropdown()

    }




    alert(edit: string) {
        alert(edit)
    }



        delete(id) {
            swal({
                title: 'Are you sure?',
                text: 'You will not be able to undo this operation',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No',
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false
            }).then((result) => {
                if (result.value) {
                    this.af.collection('tasks').doc(id.docid).delete()
                    swal({
                        title: 'Deleted!',
                        text: 'Your imaginary file has been deleted.',
                        type: 'success',
                        confirmButtonClass: 'btn btn-success',
                        buttonsStyling: false
                    }).catch(swal.noop)
                } else {
                    swal({
                        title: 'Cancelled',
                        text: 'Cancelled',
                        type: 'error',
                        confirmButtonClass: 'btn btn-info',
                        buttonsStyling: false
                    }).catch(swal.noop)
                }
            })

        }


    save() {
        let data =
            {

                date: moment(this.date).format('YYYY-MM-DD'),
                uid:this.afs.auth.currentUser.uid,
                id:Date.now(),
                deviceserial: this.deviceserial,
                devicetype: this.devicetype,
                objectname: this.objectname,
                make: this.make,
                ICCID: this.ICCID,
                servicenumber: this.servicenumber,
                customername: this.customername,
                technicianname: this.technicianname,
                confirmedby: this.confirmedby,
                model: this.model,
            }
        this.af.collection('menu').doc(this.id).collection('records').add(data).then(res=>{
            this.n.showNotification('Saved','top','center','success','Done')
            this.devicetype = ''
            this.deviceserial = ''
            this.date = ''
            this.ICCID = ''

            this.model = ''
            this.confirmedby = ''
            this.customername = ''
            this.servicenumber = ''
        })
    }



    edit(task: any) {
        this.taskk = task

    }

    navTocards(data) {
        this.gs.setParams(data)
        this.router.navigateByUrl(`lists/${data.docid}`,data.docid)

    }

    saveRepair() {
        let data =
            {

                date: moment().format('YYYY-MM-DD'),
                uid:this.afs.auth.currentUser.uid,
                id:Date.now(),
                deviceserial: this.deviceserial,
                devicetype: this.devicetype,
                objectname: this.objectname,
                make: this.make,
                ICCID: this.ICCID,
                servicenumber: this.servicenumber,
                customername: this.customername,
                technicianname: this.technicianname,
                confirmedby: this.confirmedby,
                model: this.model,
            }
            console.log(data)
        this.af.collection('menu').doc(this.id).collection('records').add(data).then(res=>{
            this.n.showNotification('Saved','top','center','success','Done')
            this.devicetype = ''
            this.deviceserial = ''
            this.date = ''
            this.ICCID = ''

            this.model = ''
            this.confirmedby = ''
            this.customername = ''
            this.servicenumber = ''
            this.objectname = ''
            this.technicianname = ''
        })
    }

    saveRemove() {
        let data =
            {
                date: moment().format('YYYY-MM-DD'),
                uid:this.afs.auth.currentUser.uid,
                id:Date.now(),
                deviceserial: this.deviceserial,
                devicetype: this.devicetype,
                objectname: this.objectname,
                ICCID: this.ICCID,
                servicenumber: this.servicenumber,
                customername: this.customername,
                technicianname: this.technicianname,
                confirmedby: this.confirmedby,

            }
        this.af.collection('menu').doc(this.id).collection('records').add(data).then(res=>{
            this.n.showNotification('Saved','top','center','success','Done')
            this.devicetype = ''
            this.deviceserial = ''
            this.date = ''
            this.ICCID = ''
            this.confirmedby = ''
            this.customername = ''
            this.servicenumber = ''
            this.objectname = ''
            this.technicianname = ''
        })
    }

    assg(t: any) {
        this.id = t.docid
    }
}
