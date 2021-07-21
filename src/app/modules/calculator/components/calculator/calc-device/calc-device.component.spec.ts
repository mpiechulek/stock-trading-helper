import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CalcDeviceComponent } from './calc-device.component';

describe('CalcDeviceComponent', () => {

    let component: CalcDeviceComponent;
    let fixture: ComponentFixture<CalcDeviceComponent>;

    //==========================================================================

    let displayEquation = '',
        displayResult = '',
        enteredNumber = '',
        previousEnteredNumber = null,
        numberWasEntered = false,
        chosenOperator = undefined,
        result = '',
        onComputeWasUsed = false

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
        //if this is ran an error is thrown     
        // fixture.detectChanges();

        displayEquation = '0';
        displayResult = '0';
        enteredNumber = '0';
        previousEnteredNumber = null;
        numberWasEntered = false;
        chosenOperator = undefined;
        result = '0';
        onComputeWasUsed = false;

    });


    // =============================================================================
    // =================================== Tests ===================================
    // =============================================================================

    it('1. should create the app', () => {

        expect(component).toBeTruthy();

    });

    it('2. should check if the static start variables are matched', () => {

        expect(component.displayEquation).toEqual(displayEquation);
        expect(component.displayResult).toEqual(displayResult);
        expect(component.enteredNumber).toEqual(enteredNumber);
        expect(component.previousEnteredNumber).toEqual(previousEnteredNumber);
        expect(component.numberWasEntered).toEqual(numberWasEntered);
        expect(component.chosenOperator).toEqual(chosenOperator);
        expect(component.result).toEqual(result);
        expect(component.onComputeWasUsed).toEqual(onComputeWasUsed);

    });

    it('3. should remove last character form string', () => {

        expect(component.removeStringsLastCharacter('string')).toBe('strin');

    });

    it('4. should say if the calculation is on the beginning of the operation', () => {

        expect(component.orderOfEquation()).toBeTruthy();

    });

    it('5. should convert a string to a number', () => {

        expect(component.stringToNumber('123')).toEqual(123);

    });

    it('6. should return a string number if an operator is entered ', () => {

        expect(component.chooseOperation('+')).toEqual('0');

    });

    it('7. should remove the zero form the front of the string', () => {

        expect(component.removeFrontZero('0123')).toEqual('123');

    });

    it('8. should return true if entered number is a string including a dot and entered value is a dot', () => {

        component.enteredNumber = '0.123';
        expect(component.checkIfDotInString('.')).toBe(true);

        component.enteredNumber = '123';
        expect(component.checkIfDotInString('.')).toBe(false);

    });

    it('9. should be true if entered string is zero and enteredNumber value starts with zero and entered number length is equal to 1', () => {

        component.enteredNumber = '0';
        expect(component.preventFromMultiZero('0')).toBe(true);

        component.enteredNumber = '1';
        expect(component.preventFromMultiZero('0')).toBe(false);

        component.enteredNumber = '123';
        expect(component.preventFromMultiZero('0')).toBe(false);

        component.enteredNumber = '123';
        expect(component.preventFromMultiZero('1')).toBe(false);

        component.enteredNumber = '0.123';
        expect(component.preventFromMultiZero('0')).toBe(false);

        component.enteredNumber = '';
        expect(component.preventFromMultiZero('0')).toBe(false);

    });

    it('10. should be true if entered string is a number', () => {

        expect(component.isNumber('123')).toBe(true);

        expect(component.isNumber('0.123')).toBe(true);

        expect(component.isNumber('abc')).toBe(false);

    });

    it('11. should be true if entered string is a dot', () => {

        expect(component.isCharacterADot('.')).toBe(true);

        expect(component.isCharacterADot('0.123')).toBe(false);


    });


    it('12. should be true if string length is less than 13', () => {

        expect(component.isStringLengthApproval('123456789')).toBe(true);

        expect(component.isStringLengthApproval('123456789123456789')).toBe(false);

    });

});
