import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";
import { ApiService } from '../api.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild('barChart') barChart;
  bars: any;
  colorArray: any;
  getProfileData: any = {};
  user: any;
  constructor(
    private api: ApiService
  ) { }
  option = {
    slidesPerView: 2.5,
    centeredSlides: true,
    loop: true,
    spaceBetween: 2,
    autoplay: false,
  }
  ionViewDidEnter() {
    this.createBarChart();
  }
  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'horizontalBar',
      data: {
        labels: ['S1', 'S2', 'S3', 'S4', 'S5'],
        datasets: [{
          data: [2.5, 3.8, 5, 6.9, 6.9],
          backgroundColor: 'rgb(38, 194, 129)',
          borderColor: 'rgb(38, 194, 129)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  ngOnInit() {
    var _self = this;
    this.api.userLoginSubject.subscribe(user=>{
      _self.getProfileData = user
    });
    this.getProfile();
  }

  // ==================get profile===========================

  getProfile() {
    var _self = this;
    this.api.get("profile").subscribe(
      result => {
        if (result["status"] == "success") {
          _self.getProfileData = result['data'];
          console.log("m", _self.getProfileData);
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
  //================end=========================

}




