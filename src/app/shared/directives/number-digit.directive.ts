import {
    Directive,
    ElementRef,
    HostListener
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
    selector: '[appNumberDigit]'
})

export class NumberDigitDirective {

    private el: ElementRef;
    private elementEnterValue: string;
    private previousNumber: string = '';
    private numberOfDecimalPointPlaces: number;
    private isBlur: boolean = false;

    private keyStroke = new Subject();
    private subscription: Subscription;

    // ===========================================================================

    constructor(el: ElementRef) {

        this.el = el;

    }

    // ===========================================================================

    @HostListener('keyup', ['$event']) onKeyboardEnter(event) {

        event.preventDefault();
        event.stopPropagation();
        this.keyStroke.next(event);
    }

    @HostListener('blur', ['$event']) onBlur(event) {

        this.isBlur = true;

        this.verifyInput(event);

    }

    @HostListener('focus', ['$event']) onFocus() {

        this.isBlur = false;

    }

    ngOnInit(): void {

        this.subscription = this.keyStroke
            .pipe(debounceTime(200))
            .subscribe(event => this.verifyInput(event));
    }

    // =========================================================================

    /**
     * 
     * @param event 
     * @returns 
     */
    verifyInput(event): any {

        this.elementEnterValue = this.el.nativeElement.value;

        // If pressed key is backspace
        if (event.keyCode === 8) {

            return this.previousNumber = this.elementEnterValue;

        }

        // Allowing only key numbers events and '.', ','
        if (!(event.keyCode >= 48 && event.keyCode <= 57) &&
            !(event.keyCode >= 96 && event.keyCode <= 105) &&
            (event.keyCode !== 110) &&
            (event.keyCode !== 188) &&
            (event.keyCode !== 190)
        ) {

            return this.el.nativeElement.value = this.previousNumber;

        }

        // Entered value type must by a string
        if (typeof this.elementEnterValue != "string") return;

        // If entered string has a dot, and after the dot there are more than 4 characters
        if (this.stringHasEnoughNumbersAfterDecimal(this.elementEnterValue)) {
            console.log('444');
            return this.assignOutputValues(this.previousNumber);

        }
     
        // Checking if the input string is a positive float number or has a comma (','), because '.'
        // is taken as a number
        if ((this.isPositiveFloat(this.elementEnterValue) || this.elementEnterValue.includes(','))) {
            console.log('666');
            this.toValidNumber(this.elementEnterValue);

        } else {
            console.log('777???');
            this.el.nativeElement.value = this.previousNumber;

        }

    }
    /**
     * 
     * @param value 
     * @returns 
     */
    stringHasEnoughNumbersAfterDecimal(value: string): boolean {

        if (value.includes('.')) {

            // value split by '.' character, second element of the string length is 
            // less or equal ton 4              

            return value.split('.')[1].length > 4;

        }

        return false;

    }

    /**
     * 
     * @param value 
     */
    assignOutputValues(value: string): void {

        //here we assign the output value
        this.el.nativeElement.value = value;
        this.previousNumber = value;

    }

    /**
     * 
     * @param value 
     * @returns 
     */
    isPositiveFloat(value: any): boolean {

        return !isNaN(value) && Number(value) > 0;

    }

    /**
     * 
     * @param value 
     */
    toValidNumber(value: string) {
        let commaToDot: string;
        let oneDotInString: string;
        let number: number;
        let fixedNumber: number
        let fixedToString: string

        if (value.includes('.') || value.includes(',')) {
          
            // replaces all dots to commas
            commaToDot = this.changeCommaToDots(value);

            // one dot only stays 
            oneDotInString = this.onlyOneDotInString(commaToDot);
        

            // setting the fixedNumber value
            this.setDecimalPoints(oneDotInString);

            number = this.toFloatNumber(oneDotInString);

            console.log(number);

            fixedNumber = this.fixToDecimalNumbers(number);

            console.log(fixedNumber);

            // Resetting the decimal places container    
            fixedToString = this.numberToString(fixedNumber);

            console.log(fixedToString);

            // If the entered string was '123.' or '123,', the last character was 
            // removed in the process of number fixing, we are adding it back
            if (this.elementEnterValue[this.elementEnterValue.length - 1] === '.' && !this.isBlur) {

                fixedToString = fixedToString + '.';

            }

            if (this.elementEnterValue[this.elementEnterValue.length - 1] === ',' && !this.isBlur) {

                fixedToString = fixedToString + '.';

            }

            this.assignOutputValues(fixedToString);

        } else {

            this.assignOutputValues(value);

        }
    }

    /**
     * 
     * @param value 
     * @returns 
     */
    changeCommaToDots(value: string): string {

        // Replaces all dots to commas
        if (value.includes(',')) {

            return value.replace(/,/g, '.');

        }

        return value;

    }

    // Leaves only one dot 
    /**
     * 
     * @param value 
     * @returns 
     */
    onlyOneDotInString(value: string): string {

        let split: string[];
        let splitShift: string;

        split = value.split('.');

        splitShift = split.shift() + '.' + split.join('');

        return splitShift;

    }

    /**
     * 
     * @param value 
     * @returns 
     */
    setDecimalPoints(value: string): void {

        const split: string[] = value.split('.');

        if (this.isBlur) {

            this.numberOfDecimalPointPlaces = 4;

            return;

        }

        if (split[1] === '') {

            this.numberOfDecimalPointPlaces = 0;

        } else if (split[1].length === 1) {

            this.numberOfDecimalPointPlaces = 1;

        } else if (split[1].length === 2) {

            this.numberOfDecimalPointPlaces = 2;

        } else if (split[1].length === 3) {

            this.numberOfDecimalPointPlaces = 3;

        } else if (split[1].length >= 4) {

            this.numberOfDecimalPointPlaces = 4;

        }
    }

    /**
     * 
     * @param value 
     * @returns 
     */
    toFloatNumber(value: string): number {

        return parseFloat(value);

    }

    /**
     * 
     * @param value 
     * @returns 
     */
    fixToDecimalNumbers(value: any | number): number {

        return value.toFixed(this.numberOfDecimalPointPlaces);

    }

    /**
     * 
     * @param value 
     * @returns 
     */
    numberToString(value: number): string {

        return value.toString();

    }

}




