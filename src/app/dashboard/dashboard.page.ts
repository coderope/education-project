import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor() { }
  option={
    // slidesPerView: 1.5,
    centeredSlides: true,
    loop: true,
    spaceBetween: 8,
    autoplay:true,
  }
  slideOpt={
   
    centeredSlides: true,
    loop: true,
   
    autoplay:true,
  }
  ngOnInit() {
  }

}