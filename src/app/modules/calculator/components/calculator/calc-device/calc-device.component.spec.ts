import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CalcDeviceComponent } from './calc-device.component';

describe('CalcDeviceComponent', () => {
    
    let component: CalcDeviceComponent;
    let fixture: ComponentFixture<CalcDeviceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [CalcDeviceComponent]

        })
            .compileComponents();
    });

    beforeEach(() => {

        fixture = TestBed.createComponent(CalcDeviceComponent);
        component = fixture.componentInstance;

    });

    it('should create the app', () => {

        expect(component).toBeTruthy();

    });

});




/**
 * checking if declared variables are right
 */
// describe('CalculatorDeviceComponent', () => {

//     let component: CalcDeviceComponent;

//     let displayEquation = '',
//         displayResult = '',
//         enteredNumber = '',
//         previousEnteredNumber = null,
//         numberWasEntered = false,
//         chosenOperator = undefined,
//         result = '',
//         onComputeWasUsed = false

//     beforeEach(() => {

//         TestBed.configureTestingModule({});

//         component = TestBed.inject(CalcDeviceComponent);

//     });

//     beforeEach(() => {

//         displayEquation = '0';
//         displayResult = '0';
//         enteredNumber = '0';
//         previousEnteredNumber = null;
//         numberWasEntered = false;
//         chosenOperator = undefined;
//         result = '0';
//         onComputeWasUsed = false;

//     });

//     afterEach(() => {

//         displayEquation = '0';
//         displayResult = '0';
//         enteredNumber = '0';
//         previousEnteredNumber = null;
//         numberWasEntered = false;
//         chosenOperator = undefined;
//         result = '0';
//         onComputeWasUsed = false;
//     });


//     it('checks if displayEquation is "0"', () => {

//         expect(component.displayEquation).toBe('0');

//     });


// })
