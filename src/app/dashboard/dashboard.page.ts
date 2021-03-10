import { Component, ElementRef, OnInit,ViewChild,AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements AfterViewInit {
  @ViewChild('sliderDiv') sliderDiv:ElementRef;
  @ViewChild('sliderThumb') sliderThumb:ElementRef;
  @ViewChild('slidePrev') slidePrev:ElementRef;
  @ViewChild('slideNext') slideNext:ElementRef;
  
  constructor() { }
  option={
    // slidesPerView: 1.5,
    centeredSlides: true,
    loop: true,
    // spaceBetween: 8,
    autoplay:true
  }
  slideOpt={
    spaceBetween: 8,
    centeredSlides: true,
    loop: true,
   
    autoplay:true
  }
  ngAfterViewInit () {
   this.slider.init(this.sliderDiv.nativeElement,this.sliderThumb.nativeElement,this.slidePrev.nativeElement,this.slideNext.nativeElement);
   // this.sliderThumb.nativeElement
  }
  slider={
    slide:null,
    prevBtn:null,
    nextBtn:null,
    items:[],
    thumb:[],
    active: 0,
    activeSlide(index) {
      this.active = index;
      console.log(this.thumbItems);
      this.items.forEach((item) => item.classList.remove('active'));
      this.items[index].classList.add('active');
      this.thumbItems.forEach((item) => item.classList.remove('active'));
      this.thumbItems[index].classList.add('active');
      this.autoSlide();
    },
    prev() {
      if (this.active > 0) {
        this.activeSlide(this.active - 1);
      } else {
        this.activeSlide(this.items.length - 1);
      }
    },
    next() {
      if (this.active < this.items.length - 1) {
        this.activeSlide(this.active + 1);
      } else {
        this.activeSlide(0);
      }
    },
  
    addNavigation() {
      this.nextBtn.addEventListener('click', this.next);
      this.prevBtn.addEventListener('click', this.prev);
    },
  
    addThumbItems() {
     
      this.items.forEach(() => (this.thumb.innerHTML += `<span></span>`));
      this.thumbItems = Array.from(this.thumb.children);
    },
  
    autoSlide() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(this.next, 5000);
    },
    init(sliderDiv,thumbDiv,prev,next) 
    {
      this.slide=sliderDiv;
      this.items=Array.from(this.slide.children);
      this.thumb=thumbDiv;
      this.thumbItems = Array.from(this.thumb.children);
      this.prevBtn=prev;
      this.nextBtn=next;
      this.next = this.next.bind(this);
      this.prev = this.prev.bind(this);
     // this.items = this.slide.querySelectorAll('.slide-items > *');
      //this.thumb = this.slide.querySelector('.slide-thumb');
      this.addThumbItems();
      this.activeSlide(0);
      this.addNavigation();
    }
  }

}