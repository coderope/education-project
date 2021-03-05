import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild('barChart') barChart;
  bars: any;
  colorArray: any;
  constructor() { }
  option={
    slidesPerView: 2.5,
    centeredSlides: true,
    loop: true,
    spaceBetween: 2,
    autoplay:false,
  }
ionViewDidEnter() {
    this.createBarChart();
  }
  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'horizontalBar',
      // line: 'horizontalLine',
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
  }
   
  }
    
  


