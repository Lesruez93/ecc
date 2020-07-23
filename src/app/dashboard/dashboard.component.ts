import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {GsService} from '../gs.service';
import swal from 'sweetalert2';
import {NotificationService} from '../notification.service';
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const doc = new jsPDF()
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
    field: any;
    fields: any;
    private type: any;
    private techname: any;
    private reports: any;
    private dateRange: any;
    now: any = moment().format('YYYY-MM-DD');
    report: boolean;
    data: boolean;

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

        if (this.date && this.deviceserial && this.devicetype &&
            this.objectname && this.ICCID && this.servicenumber && this.make && this.model
            && this.customername && this.technicianname && this.confirmedby

        ){
            let data =
                {

                    date: moment(this.date).format('YYYY-MM-DD'),
                    timestamp:moment(this.date).valueOf(),

                    uid:this.afs.auth.currentUser.uid,
                    id:Date.now(),
                    deviceserial: this.deviceserial.toString(),
                    devicetype: this.devicetype,
                    objectname: this.objectname,
                    make: this.make,
                    ICCID: this.ICCID.toString(),
                    servicenumber: this.servicenumber,
                    customername: this.customername.toString(),
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
                $('#exampleModal').modal('hide')

            })

        }
        else {
            this.n.showNotification('Fill all fields','top','center','danger','Failed')
        }
        }



    edit(task: any) {
        this.taskk = task

    }

    navTocards(data) {
        this.gs.setParams(data)
        this.router.navigateByUrl(`lists/${data.docid}`,data.docid)

    }

    saveRepair() {


        if (this.date && this.deviceserial && this.devicetype &&
            this.objectname && this.ICCID && this.servicenumber && this.make && this.model
            && this.customername && this.technicianname && this.confirmedby

        ){
            let data =
                {

                    date: moment(this.date).format('YYYY-MM-DD'),
                    timestamp:moment(this.date).valueOf(),
                    uid:this.afs.auth.currentUser.uid,
                    id:Date.now(),
                    deviceserial: this.deviceserial.toString(),
                    devicetype: this.devicetype,
                    objectname: this.objectname,
                    make: this.make,
                    ICCID: this.ICCID.toString(),
                    servicenumber: this.servicenumber.toString(),
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
                this.objectname = ''
                this.technicianname = ''
                $('#repairModal').modal('hide')

            })

        }
        else {
            this.n.showNotification('Fill all fields','top','center','danger','Failed')

        }
        }

    saveRemove() {

            if (this.date && this.deviceserial && this.devicetype &&
                this.objectname && this.ICCID && this.servicenumber
            && this.customername && this.technicianname && this.confirmedby

            ) {
                let data =
                    {
                        date: moment(this.date).format('YYYY-MM-DD'),
                        timestamp:moment(this.date).valueOf(),

                        uid:this.afs.auth.currentUser.uid,
                        id:Date.now(),
                        deviceserial: this.deviceserial.toString(),
                        devicetype: this.devicetype,
                        objectname: this.objectname,
                        ICCID: this.ICCID.toString(),
                        servicenumber: this.servicenumber.toString(),
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
                    $('#removeModal').modal('hide')

                })

            }else {
                this.n.showNotification('Fill all fields','top','center','danger','Failed')

            }

    }

    assg(t: any) {
        this.id = t.docid
    }

    generate() {

        var someDate = new Date();
        var numberOfDaysToAdd = 7;
        var nex7 = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);



let date =  moment(Date.now()).format('YYYY-MM-DD')
        let fDate = moment(date).valueOf()
        if (this.dateRange== 'weekly'){
            console.log(fDate)
            console.log(nex7)
            this.af.collection('menu').doc(this.type)
                .collection('records',ref => ref
                    .where('timestamp','>=',fDate).where(
                        'timestamp','<=',nex7
                    ))
                .valueChanges({idField:'docid'}).subscribe(res=>{
                this.reports = res
                if (this.reports.length > 0){
                    this.data = true
                    this.report = false
                }
                else {
                    this.n.showNotification('No Data for the Specified Filters','top','center','warning','No Data')

                }

                })

        }
        else if (this.dateRange == 'mo'){
        }
    else {
            this.af.collection('menu').doc(this.type)
            .collection('records',ref => ref
            .where('date','==',this.dateRange))
            .valueChanges({idField:'docid'}).subscribe(res=>{
            this.reports = res
                if (this.reports.length > 0){
                    this.data = true
                    this.report = false
                }
                else {
                    this.n.showNotification('No Data for the Specified Filters','top','center','warning','No Data')

                }
            }
)
        }
//
//             this.af.collection('menu').doc(this.type)
//             .collection('records',ref => ref.where("technicianname",'==',this.techname)
//             .where('date','==',this.dateRange))
//             .valueChanges({idField:'docid'}).subscribe(res=>{
//             this.reports = res
//             this.data = true
//         }
// )

    }

    downloadPdf():void {
        doc.autoTable({html: '#dt'})


        doc.save('report.pdf')
        this.data = false
    }
}
