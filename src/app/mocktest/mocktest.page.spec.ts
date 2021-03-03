import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MocktestPage } from './mocktest.page';

describe('MocktestPage', () => {
  let component: MocktestPage;
  let fixture: ComponentFixture<MocktestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MocktestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MocktestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
