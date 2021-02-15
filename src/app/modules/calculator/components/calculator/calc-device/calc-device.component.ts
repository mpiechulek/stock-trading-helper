import { Component, OnInit } from '@angular/core';
import { CalculatorPresenter } from './calculator.presenter';

@Component({
  selector: 'app-calc-device',
  templateUrl: './calc-device.component.html'
})
export class CalcDeviceComponent implements OnInit {

  // Displays the string of current equation exp. 2 + 2
  displayEquation: string = '0';
  // Displays the entered number and the current equation result
  displayResult: string = '0';
  // Is holding the entered number
  enteredNumber: string = '0';
  // Is holding the previous entered number
  previousEnteredNumber: string = '0';
  // Chose operation
  chosenOperator: string = undefined;
  // Is holding the global calculations result    
  result: string = '0';
  // is holding all of the equations and results
  calculationsArray: Object[] = [];

  constructor(private calculatorPresenter: CalculatorPresenter) { }

  ngOnInit(): void {
  }

  // ===========================================================================
  // =============================== Enter number  =============================
  // ===========================================================================

  /**
   * EEnter a digit
   * @param value A number string or a '.'
   */
  onEnterNumber(value: string) {
    // Not allowing to Enter a multi "0" string
    if (this.preventFromMultiZero(value)) {
      return;
    }

    this.resettingTheEnteredNumber(value);

    if (this.isNumber(value) && this.isStringLengthApproval(value)) {
      this.enteredNumber += this.canAppendNumber(value);
      this.displayResult = this.prepareResultToDisplay(this.enteredNumber);
    }
  }

  /**
   * preventing form repeating of '0' characters in string
   * @param value 
   */
  preventFromMultiZero(value: string): boolean {
    return this.enteredNumber[0] === '0' && this.enteredNumber.length === 1 && value === '0';
  }

  /**
   * Overwriting the entered Number value from '0' to '' , to avoid exp. 07 digit
   * @param value 
   */
  resettingTheEnteredNumber(value: string): void {
    if (this.enteredNumber === '0' && value !== '.') {
      this.enteredNumber = '';
    }
  }

  isStringLengthApproval(value: string): boolean {
    return this.enteredNumber.length < 13;
  }

  // Checking if the value is a number or a dot symbol
  isNumber(value: string) {
    if (!isNaN(parseInt(value)) || value === '.') {
      return true;
    }
    return false;
  }

  //Appending the string with numbers only if it contains max 1 dot symbol     
  canAppendNumber(value: string) {
    //This prevents multi dots in string
    if (this.enteredNumber.includes('.') && value === '.') {
      return '';
    } else {
      return value;
    }
  }

  // ===========================================================================
  // =========================== Arithmetic operations =========================
  // ===========================================================================

  onEnterOperation(operator: string) {
    if (this.enteredNumber === '') return;
    
    this.chosenOperator = operator;

    this.result = this.chooseOperation(operator);
    this.displayResult = this.prepareResultToDisplay(this.result);

    if (!this.orderOfEquation()) {
      this.saveResultToArray();
    }

    this.previousEnteredNumber = this.enteredNumber;
    this.enteredNumber = '';
  }

  chooseOperation(operator: string) {
    let calcResult: number;

    switch (operator) {
      case '+':
        if (this.orderOfEquation()) {
          calcResult = this.stringToNumber(this.enteredNumber);
        } else {
          calcResult = this.sum();
        }
        break
      case '-':
        if (this.orderOfEquation()) {
          calcResult = this.stringToNumber(this.enteredNumber);
        } else {
          calcResult = this.subtraction();
        }
        break
      case '*':
        if (this.orderOfEquation()) {
          calcResult = this.stringToNumber(this.enteredNumber);
        } else {
          calcResult = this.multiplication();
        }
        break
      case '/':
        if (this.orderOfEquation()) {
          calcResult = this.stringToNumber(this.enteredNumber);
        } else {
          calcResult = this.division();
        }
        break
      default:
        return
    }

    this.createEquationForDisplay(operator);   

    return calcResult.toString();
  }

  sum() {
    return this.stringToNumber(this.result) + this.stringToNumber(this.enteredNumber);
  }
  subtraction() {
    return this.stringToNumber(this.result) - this.stringToNumber(this.enteredNumber);
  }

  multiplication() {
    console.log(this.stringToNumber(this.result));

    return this.stringToNumber(this.result) * this.stringToNumber(this.enteredNumber);
  }

  division() {
    return this.stringToNumber(this.result) / this.stringToNumber(this.enteredNumber);
  }

  stringToNumber(value: string): number {
    return parseFloat(value);
  }

  createEquationForDisplay(operator: string): void {
    if (this.orderOfEquation()) {
      this.displayEquation = `${this.enteredNumber} ${operator}`;
    } else {
      this.displayEquation = `${this.result} ${operator} ${this.enteredNumber}`;
    }
  }

  saveResultToArray() {
    let calculation = {
      equation: this.displayEquation,
      result: this.result
    }

    this.calculationsArray.push(calculation);
    console.log(this.calculationsArray);

  }

  orderOfEquation(): boolean {
    return this.previousEnteredNumber === '0' && this.result === '0';
  }

  // ===========================================================================
  // ================================= computing ===============================
  // ===========================================================================

  /**
   * TODO: make ot work beter !!
   * @param value 
   */
  onCompute(value: string) {   
    
    // if(this.result === '0')
   
    this.result = this.chooseOperation(this.chosenOperator);
    this.displayResult = this.prepareResultToDisplay(this.result);

    if (!this.orderOfEquation()) {
      this.saveResultToArray();
    }

    this.previousEnteredNumber = this.enteredNumber;   
  }

  // ===========================================================================
  // ============================= Delete operations ===========================
  // ===========================================================================

  onDelete(operation: string) {
    if (operation === 'del') {
      this.deleteDigit()

    } else if (operation === 'c') {
      this.clearAll();

    } else if (operation === 'ce') {
      this.clearEntry();

    } else {
      return;
    }
  }

  clearEntry(): void {
    this.displayResult = '0';
    this.enteredNumber = '0';
  }

  deleteDigit(): void {
    if (this.enteredNumber !== '') {
      this.enteredNumber = this.removeStringsLastCharacter(this.enteredNumber)
      this.displayResult = this.prepareResultToDisplay(this.enteredNumber);
    }
    return;
  }

  removeStringsLastCharacter(value: string) {
    return value.substring(0, this.enteredNumber.length - 1);
  }

  //
  clearAll(): void {
    this.displayResult = '0';
    this.enteredNumber = '0';
    this.previousEnteredNumber = '0';
    this.result = '0';
    this.displayEquation = '0'; 
    this.chosenOperator = undefined;
    this.calculationsArray = [];
  }


  // ===========================================================================
  // ==================== Converting string to locale string ===================
  // ===========================================================================

  prepareResultToDisplay(enteredNumber: string): string {

    let splitNumber: string[];
    let toNumber: number = 0;
    let result: string;

    if (enteredNumber === '') {
      return '0';
    }

    // If the entry sting contains a '.' character, then split the sting, by 
    // the character and save in an array
    if (enteredNumber.includes('.')) {
      splitNumber = enteredNumber.split('.');
      toNumber = parseInt(splitNumber[0]);
    } else {
      toNumber = parseInt(enteredNumber);
    }

    //
    if (!enteredNumber.includes('.')) {
      result = toNumber.toLocaleString();

    } else {
      result = toNumber.toLocaleString(undefined, { minimumFractionDigits: 1 });
      result = this.removeStringsLastCharacter(result);
    }

    //
    if (!splitNumber) {
      return result;

    } else if (splitNumber && (splitNumber[1] === '')) {
      return result;

    } else {
      result = result + splitNumber[1];
      return result
    }
  }

}
