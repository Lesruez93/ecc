import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
    title: any;
    private cards: any;
  private docid: any;
  private editkey: any;
  private data: string;
  date: any;
  private role: any;
  picker: any;
  fields: any = [
    "deviceserial",
  "devicetype",
  "objectname",
  "make",
  "ICCID",
  "servicenumber",
  "customername",
  "technicianname",
  "model"
  ];
  private field: any = 'deviceserial';
  private value: any;

  constructor(
              private db:AngularFirestore,
             // private g:GsService,
              private route: ActivatedRoute,
              private cdr:ChangeDetectorRef,
              public afAuth:AngularFireAuth) {
   this.loadData()
  }

    ngOnInit(): void {

    this.afAuth.authState.subscribe(res=>{
      this.db.collection('users').doc(res.uid).valueChanges().subscribe((res:any)=>{
        this.role = res.role
      })
    })

    }

    save() {
        this.db.collection('tasks').doc(this.route.snapshot.paramMap.get('id'))
            .collection('cards').add({title:this.title}).then(()=>{
              this.title = ''
        })
    }

    delete(data: any,id) {
    this.assg(id)

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
          this.db.collection('tasks').doc(this.route.snapshot.paramMap.get('id'))
              .collection('cards').doc(this.docid).set({list:{[data.key]: firebase.firestore.FieldValue.delete()}}, {merge: true})
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
    edit(data: any,id) {
      console.log(data)
      this.assg(id)
      this.editkey = data.key

      this.title = data.value.title
    }



    update(title: any,id) {
    //this.assg(id)

      this.db.collection('tasks').doc(this.route.snapshot.paramMap.get('id'))
          .collection('cards').doc(this.docid).set({list:{[this.editkey]:{title:this.title}}}, {merge: true}).then(re=>{

            this.title = ''
            this.cdr.detectChanges()
      })
    }

    progress(title: any,id) {
      this.assg(id)

      this.db.collection('tasks').doc(this.route.snapshot.paramMap.get('id'))
          .collection('cards').doc(this.docid).set({list:{[title.key]:{status:"working"}}}, {merge: true})
    }

    notdone(title: any,id) {
      this.assg(id)

      this.db.collection('tasks').doc(this.route.snapshot.paramMap.get('id'))
          .collection('cards').doc(this.docid).set({list:{[title.key]:{status:"notdone"}}}, {merge: true})
    }

    due(t: any,id) {
      this.assg(id)
      this.editkey = t.key
    }

    saveCard() {
      console.log(this.docid)
        this.db.collection('tasks').doc(this.route.snapshot.paramMap.get('id'))
            .collection('cards').doc(this.docid).set({list:{[this.title]:{title:this.title,duedate:this.date}}}, {merge: true})
            .then(()=>{
              this.title = ''
              this.date = ''
            })
      }

    assg(c: any) {
        this.docid = c.docid
    }

  saveDate(title: any,id) {
   // this.assg(id)

    this.db.collection('tasks').doc(this.route.snapshot.paramMap.get('id'))
        .collection('cards').doc(this.docid).set({list:{[this.editkey]:{duedate:this.date}}}, {merge: true}).then(()=>{
          this.date = ''
    })
  }

  deleteLixst(docid: any) {
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
        this.db.collection('menu').doc(this.route.snapshot.paramMap.get('id'))
            .collection('records').doc(docid).delete()
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

  showEdit(record: any) {
    
  }

  onDelete(id: any) {
    
  }

  filter() {
 let date = moment(this.date).format('YYYY-MM-DD')
  this.db.collection('menu').doc(this.route.snapshot.paramMap.get('id'))
.collection('records',ref => ref.where('date','==',date)).valueChanges({idField:'docid'}).subscribe(res=>{
  this.cards = res
})
  }

  filterr() {
    this.db.collection('menu').doc(this.route.snapshot.paramMap.get('id'))
        .collection('records',ref => ref.where(this.field,'==',this.value)).valueChanges({idField:'docid'}).subscribe(res=>{
      this.cards = res
    })
  }

  refresh() {
    this.loadData()
  }

  private loadData() {
    this.db.collection('menu').doc(this.route.snapshot.paramMap.get('id'))
        .collection('records').valueChanges({idField:'docid'}).subscribe(res=>{
      this.cards = res
    })
  }


}
