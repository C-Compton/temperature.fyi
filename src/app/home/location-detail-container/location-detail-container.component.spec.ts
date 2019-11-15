import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDetailContainerComponent } from './location-detail-container.component';

describe('LocationDetailContainerComponent', () => {
  let component: LocationDetailContainerComponent;
  let fixture: ComponentFixture<LocationDetailContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationDetailContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
