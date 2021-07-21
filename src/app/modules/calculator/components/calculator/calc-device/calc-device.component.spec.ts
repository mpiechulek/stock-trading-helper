import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalcDeviceComponent } from './calc-device.component';

describe('Create calculator device component', () => {

    let component: CalcDeviceComponent;

    let fixture: ComponentFixture<CalcDeviceComponent>;

    //
    beforeEach(async () => {
        await TestBed.configureTestingModule({

            declarations: [CalcDeviceComponent]

        })
            .compileComponents();
    });

    //
    beforeEach(() => {

        fixture = TestBed.createComponent(CalcDeviceComponent);

        component = fixture.componentInstance;

        fixture.detectChanges();

    });

    //
    it('should create', () => {

        expect(component).toBeTruthy();
    
      });

});