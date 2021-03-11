import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mocktest',
  templateUrl: './mocktest.page.html',
  styleUrls: ['./mocktest.page.scss'],
})
export class MocktestPage implements OnInit {
  segmentModel = "attempted";
  constructor() { }

  ngOnInit() {
  }

}
