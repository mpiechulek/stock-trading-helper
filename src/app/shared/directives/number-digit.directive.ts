
import { Directive, ElementRef, HostBinding, HostListener, ReflectiveInjector } from '@angular/core';


@Directive({
  selector: '[appNumberDigit]'
})
export class NumberDigitDirective {

  private el: ElementRef;
  private elementEnterValue: string;
  private previousNumber: string = '';
  private numberOfDecimalPontPlaces: number;

  constructor(el: ElementRef) {
    this.el = el;
  }

  // @HostBinding('value') onInitValue: string;   

  @HostListener('keyup', ['$event']) onKeyboardEnter(event) {
    this.verifyInput(event);
  }

  // @HostListener('blur', ['$event']) onBlur() {   
  //   this.el.nativeElement.value = this.previousNumber;  
  // }

  // @HostListener('focus', ['$event']) onFocus() {  
  //   this.el.nativeElement.value = ''; 
  // }

  verifyInput(event) {

    this.elementEnterValue = this.el.nativeElement.value;

    // Back space overwriting previous number
    if (event.keyCode === 8) {
      this.previousNumber = this.elementEnterValue;
      return;
    }

    // If entered string has a dot, and after the dot there are more than 4 characters
    if (this.stringHasEnoughNumbersAfterDecimal(this.elementEnterValue)) {
      this.assignOutputValues(this.previousNumber);
      return;
    }

    // Checking if the input string is a positive float number or has a comma (','), because '.'
    // is taken as a number
    if (
      this.isPositiveFloat(this.elementEnterValue) ||
      this.elementEnterValue.includes(',')
    ) {
      console.log(this.elementEnterValue);
      this.toValidNumber(this.elementEnterValue);
    } else {
      this.el.nativeElement.value = this.previousNumber;
    }
  }

  stringHasEnoughNumbersAfterDecimal(value: string): boolean {
    if (value.includes('.')) {
      // value split by '.' character, second element of the string length is 
      // equal or greater than 4      
      return value.split('.')[1].length > 4;
    }
    return false;
  }

  isPositiveFloat(value: any): boolean {
    return !isNaN(value) && Number(value) >= 0;
  }

  toValidNumber(value: string) {
    let commaToDot: string;
    let oneDotInString: string;
    let number: number;
    let fixedNumber: number
    let fixedToString: string

    if (value.includes('.') || value.includes(',')) {

      commaToDot = this.changeCommaToDots(value);
      oneDotInString = this.onlyOneDotInString(commaToDot);
      // setting the fixedNumber value
      this.setDecimalPoints(oneDotInString);
      number = this.toFloatNumber(oneDotInString);
      fixedNumber = this.fixToDecimalNumbers(number);
      fixedToString = this.numberToString(fixedNumber);

      // If the entered string was '123.' or '123,', the last character was 
      // removed in the process of number fixing, we are adding it back
      if (this.elementEnterValue[this.elementEnterValue.length - 1] === '.') {
        fixedToString = fixedToString + '.';
      }

      if (this.elementEnterValue[this.elementEnterValue.length - 1] === ',') {
        fixedToString = fixedToString + '.';
      }

      this.assignOutputValues(fixedToString);

    } else {
      this.assignOutputValues(value);
    }
  }

  changeCommaToDots(value: string): string {
    if (value.includes(',')) {
      return value.replace(/,/g, '.');
    }
    return value;
  }

  // Leaves only one dot 
  onlyOneDotInString(value: string): string {
    let split: string[];
    let splitShift: string;
    split = value.split('.');
    splitShift = split.shift() + '.' + split.join('');
    return splitShift;
  }

  setDecimalPoints(value: string): void {
    const split: string[] = value.split('.');

    if (split[1] === '') {
      this.numberOfDecimalPontPlaces = 0;
    } else if (split[1].length === 1) {
      this.numberOfDecimalPontPlaces = 1;
    } else if (split[1].length === 2) {
      this.numberOfDecimalPontPlaces = 2;
    } else if (split[1].length === 3) {
      this.numberOfDecimalPontPlaces = 3;
    } else if (split[1].length >= 4) {
      this.numberOfDecimalPontPlaces = 4;
    }
  }

  toFloatNumber(value: string): number {
    return parseFloat(value);
  }

  fixToDecimalNumbers(value: any | number): number {
    return value.toFixed(this.numberOfDecimalPontPlaces);
  }

  numberToString(value: number): string {
    return value.toString();
  }

  assignOutputValues(value: string): void {
    this.el.nativeElement.value = value;
    this.previousNumber = value;
  }
}




