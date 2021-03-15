import { Component, OnInit,ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { IonInfiniteScroll } from '@ionic/angular';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {
  allCourseList:any = [];
  offset:number =0;
  limit:number =2;
  feed:any ;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(
    private api: ApiService

  ) { }

  ngOnInit() {
    this.getAllCourse();
  }

  getAllCourse() {
    var _self = this;
    let postData= {};
    this.api.post("courseslist", postData).subscribe(
      result => {
        if (result["status"] == "success") {
          // _self.allCourseList = result['data']['courses'];
          _self.allCourseList = [..._self.allCourseList, ...result["data"]['courses']];
          _self.limit = result["data"]["totalresults"];
          console.log( 'm', _self.allCourseList);
          console.log(_self.limit);
         
        _self.api.successToast(result["message"]);
        } else if (result["status"] == "error") {
          _self.api.successToast(result["message"]);
        }
      },
      err => {
        _self.api.successToast(err['message']);
      }
    );
  }

  loadMore(event){
    console.log(event)
    if(this.limit>this.allCourseList.length){
      this.offset=this.offset+1;
      console.log(this.limit>this.allCourseList.length);
      console.log(this.offset);
      this.getAllCourse();
      event.target.complete();
      //console.log(this.feed.length);
    }else{
      event.target.disabled = true;
    }
}
}
