import { Component, OnInit } from '@angular/core';

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
	previousEnteredNumber: string = null;

	// Chose operation
	chosenOperator: string = undefined;

	// Is holding the global calculations result    
	result: string = '0';

	// is holding all of the equations and results
	calculationsArray: Object[] = [];

	constructor() { }

	ngOnInit(): void {
	}

	// ===========================================================================
	// =============================== Enter number  =============================
	// ===========================================================================

	/**
	 * * !!! Improved !!!
	 * Enter a digit
	 * @param value A number string or a '.'
	 */
	onEnterNumber(value: string) {

		// prefects entering multi '0'
		if (this.preventFromMultiZero(value)) return;

		// checking if the entered value is a number ora a dot and if the max length is ok
		if (this.isNumber(value) && this.isStringLengthApproval(value)) {

			// appending the enteredNumber string and checking if the value is a number or a dot 
			this.enteredNumber += this.canAppendNumber(value);

			// removing the unnecessary front zero 
			this.enteredNumber = this.removeFrontZero(this.enteredNumber);

			// Formatting string to local sting 
			this.displayResult = this.prepareResultToDisplay(this.enteredNumber);

		}

	}

	/**
	 * This method is for controlling the max length of the entered value
	 * @param value 
	 * @returns 
	 */
	isStringLengthApproval(value: string): boolean {

		return this.enteredNumber.length < 13;

	}

	/**
	 * Checking if the value is a number or a dot symbol
	 */
	isNumber(value: string) {

		if (!isNaN(parseInt(value)) || value === '.') return true;

		return false;

	}

	/**
	 * preventing form repeating of '0' characters in string
	 * @param value 
	 */
	preventFromMultiZero(value: string): boolean {

		return this.enteredNumber[0] === '0' && this.enteredNumber.length === 1 && value === '0';

	}

	/**
	 * Appending the string with numbers only if it contains max 1 dot symbol
	 * @param value 
	 * @returns 
	 */
	canAppendNumber(value: string) {

		//This prevents multi dots in string
		if (this.enteredNumber.includes('.') && value === '.') return '';

		return value;

	}

	/**
	 * 
	 * @param value 
	 * @returns 
	 */
	removeFrontZero(value: string): string {

		if (this.enteredNumber[0] === '0' && this.enteredNumber.length > 1) {

			return value.substr(1);
			
		}

		return value;

	}

	// ===========================================================================
	// =========================== Arithmetic operations =========================
	// ===========================================================================

	/**
	 * when clicking an arithmetic operation button
	 * @param operator 
	 * @returns 
	 */
	onEnterOperation(operator: string) {

		let usedOperator: string;

		if (this.enteredNumber === '') return;

		if (operator === undefined) return;

		// 
		if (this.chosenOperator === undefined || this.chosenOperator === operator) {

			usedOperator = operator;

		} else {

			usedOperator = this.chosenOperator;

		}

		this.createEquationForDisplay(usedOperator);

		this.result = this.chooseOperation(usedOperator);

		this.displayResult = this.prepareResultToDisplay(this.result);

		// if previousEnteredNumber and result are not "0"
		if (!this.orderOfEquation()) {

			this.saveResultToArray();

		}

		this.previousEnteredNumber = this.enteredNumber;

		this.chosenOperator = operator;
		
	}

	/**
	 * 
	 * @param operator 
	 * @returns 
	 */
	chooseOperation(operator: string): string {

		let calcResult: number;

		switch (operator) {

			case '+':

				calcResult = this.sum();

				break

			case '-':

				calcResult = this.subtraction();

				break

			case '*':

				calcResult = this.multiplication();

				break

			case '/':

				calcResult = this.division();

				break

			default:

				return

		}

		return calcResult.toString();
	}

	// =========================================================================

	/**
	 * 
	 * @returns 
	 */
	sum(): number {

		return this.stringToNumber(this.result) + this.stringToNumber(this.enteredNumber);

	}

	/**
	 * 
	 * @returns 
	 */
	subtraction(): number {

		if(this.result = '0') {

			return this.stringToNumber(this.enteredNumber);
		}

		return this.stringToNumber(this.result) - this.stringToNumber(this.enteredNumber);

	}

	/**
	 * 
	 * @returns 
	 */
	multiplication(): number {

		return this.stringToNumber(this.result) * this.stringToNumber(this.enteredNumber);

	}

	/**
	 * 
	 * @returns 
	 */
	division(): number {

		return this.stringToNumber(this.result) / this.stringToNumber(this.enteredNumber);

	}

	// =========================================================================

	/**
	 * 
	 * @param value 
	 * @returns 
	 */
	stringToNumber(value: string): number {

		return parseFloat(value);

	}

	/**
	 * 
	 * @param operator 
	 */
	createEquationForDisplay(operator: string): void {
		

		if (this.orderOfEquation()) {

			this.displayEquation = `${this.enteredNumber} ${operator}`;

		} else {

			this.displayEquation = `${this.result} ${operator} ${this.enteredNumber}`;

		}
	}

	/**
	 * 
	 */
	saveResultToArray() {

		let calculation = {

			equation: this.displayEquation,
			result: this.result
		}	

		this.calculationsArray.push(calculation);

	}

	/**
	 * This logic tells us if the calculation is on the beginning
	 * @returns 
	 */
	orderOfEquation(): boolean {

		return this.previousEnteredNumber === null && this.result === '0';

	}

	// =========================================================================
	// ================================= computing =============================
	// =========================================================================

	/**
	 * =
	 * @param value 
	 */
	onCompute(value: string): void {

		if (this.chosenOperator === undefined) return;		

		this.previousEnteredNumber = this.enteredNumber;		

		this.createEquationForDisplay(this.chosenOperator);
		
		this.result = this.chooseOperation(this.chosenOperator);	

		this.displayResult = this.prepareResultToDisplay(this.result);

		if (!this.orderOfEquation()) {

			this.saveResultToArray();
		}

	}

	// ===========================================================================
	// ============================= Delete operations ===========================
	// ===========================================================================

	/**
	 * 
	 * @param operation 
	 * @returns 
	 */
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

	/**
	 * 
	 */
	clearEntry(): void {

		this.displayResult = '0';

		this.enteredNumber = '0';

	}

	/**
	 * 
	 * @returns 
	 */
	deleteDigit(): void {

		if (this.enteredNumber !== '') {

			this.enteredNumber = this.removeStringsLastCharacter(this.enteredNumber)
			this.displayResult = this.prepareResultToDisplay(this.enteredNumber);

		}

		return;

	}

	/**
	 * 
	 * @param value 
	 * @returns 
	 */
	removeStringsLastCharacter(value: string) {

		return value.slice(0, -1);

	}

	/**
	 * 
	 */
	clearAll(): void {

		this.displayResult = '0';
		this.enteredNumber = '0';
		this.previousEnteredNumber = null;
		this.result = '0';
		this.displayEquation = '0';
		this.chosenOperator = undefined;

	}

	// ===========================================================================
	// ==================== Converting string to locale string ===================
	// ===========================================================================


	/**
	 * * !!! Improved !!!
	 * displaying the endeared number value as a local sting 
	 * @param enteredNumber 
	 * @returns 
	 */
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

			//this gives a ',0' at the end of the sting exp. 1234,0
			result = toNumber.toLocaleString(undefined, { minimumFractionDigits: 1 });

			result = this.removeStringsLastCharacter(result);

		}

		//
		if (!enteredNumber.includes('.')) {

			toNumber = parseInt(enteredNumber);

			result = toNumber.toLocaleString();

		}

		// if there was a dot, spitNumber exist
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
