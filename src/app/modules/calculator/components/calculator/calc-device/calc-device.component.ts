import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
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

	// entering number marker
	numberWasEntered: boolean = false;

	// Chose operation
	chosenOperator: string = undefined;

	// Is holding the global calculations result    
	result: string = '0';

	onComputeWasUsed: boolean = false;

	// =========================================================================

	private chosenResultFromBoardSubscription: Subscription;

	// =========================================================================

	@Input()
	readonly chosenResult$: Observable<string>;

	@Output() 
	resultArrayEmitter: EventEmitter<any> = new EventEmitter<any>();

	constructor() { }

	ngOnInit(): void {

		this.chosenResultFromBoardSubscription =

			this.chosenResult$

				.subscribe(result => {

					this.result = result;

					this.displayResult = result;

				});

	}

	ngOnDestroy(): void {

		if (this.chosenResultFromBoardSubscription) {

			this.chosenResultFromBoardSubscription.unsubscribe();

		}
	}

	// ===========================================================================
	// =============================== Enter number  =============================
	// ===========================================================================

	/**	 
	 * Enter a digit
	 * @param value A number string or a '.'
	 */
	onEnterNumber(value: string): void {

		// after using the "=" character , new entire number is resting the device
		if (this.onComputeWasUsed) {

			this.clearAll();
			this.onComputeWasUsed = false;

		}

		// prevents entering multi '0'
		if (this.preventFromMultiZero(value)) return;

		// checking if max length of sting is caressed
		if (!this.isStringLengthApproval(value)) return;

		// checking if the entered value is a number
		// checking if the entered value is a dot
		if (!this.isNumber(value) && !this.isCharacterADot(value)) return;

		// the string can have only one dot character
		if (this.checkIfDotInString(value)) return;

		// appending the enteredNumber with new character
		this.enteredNumber += value;

		// removing the unnecessary front zero 
		this.enteredNumber = this.removeFrontZero(this.enteredNumber);

		// remembering information for equation operations future purpose 
		this.numberWasEntered = true;

		// Formatting string to local sting 
		this.displayResult = this.prepareResultToDisplay(this.enteredNumber);

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
	 * 
	 */
	isCharacterADot(value: string): boolean {

		return value === '.';

	}

	/**
	 * 
	 * @param value 
	 * @returns 
	 */
	isNumber(value: string): boolean {

		return !isNaN(parseInt(value));

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
	checkIfDotInString(value: string): boolean {

		//This prevents multi dots in string	
		return this.enteredNumber.includes('.') && value === '.';

	}

	/**
	 * 
	 * @param value 
	 * @returns 
	 */
	removeFrontZero(value: string): string {

		if (value === '0.') {

			return value;

		}

		if (value[0] === '0' && value[1] !== '0' && value[1] !== '.') {

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
	onEnterOperation(operator: string): void {

		if (operator === undefined) return;

		// if the chosen operators is or the operator has changed the same and the number wasn't entered
		// exp. 1 + + + or 1 + - *
		if ((this.chosenOperator === operator ||
			this.chosenOperator !== operator) &&
			this.numberWasEntered === false &&
			this.enteredNumber === '0') {

			this.chosenOperator = operator;
			this.createEquationForDisplay(operator);

			return;
		}

		if (this.onComputeWasUsed) {

			this.onComputeWasUsed = false;
			this.numberWasEntered = false;
			this.enteredNumber = '0';
			this.chosenOperator = operator;
			this.createEquationForDisplay(operator);

			return;
		}

		// exp. (2 + 3 - 4 ) it should display (5-) when pressing "-" then (4 =) gets us 1
		if (this.chosenOperator !== operator && this.chosenOperator !== undefined) {

			//calculating the previous entries
			this.createEquationForDisplay(this.chosenOperator);
			this.result = this.chooseOperation(this.chosenOperator);
			this.displayResult = this.prepareResultToDisplay(this.result);

			if (!this.orderOfEquation()) {

				this.saveResultToArray();

			}

			// displaying the new operator and result
			this.enteredNumber = '0';
			this.numberWasEntered = false;
			this.chosenOperator = operator;

			return;
		}

		this.createEquationForDisplay(operator);
		this.result = this.chooseOperation(operator);
		this.displayResult = this.prepareResultToDisplay(this.result);

		// if previousEnteredNumber and result are not "0"
		if (!this.orderOfEquation()) {

			this.saveResultToArray();

		}

		// saving current number as previous number
		this.previousEnteredNumber = this.enteredNumber;
		// resting entered numen
		this.enteredNumber = '0';
		// resting entered number marker
		this.numberWasEntered = false;
		// saving operator for future operation's
		this.chosenOperator = operator;

		this.onComputeWasUsed = false;
	}

	/**
	 * 
	 * @param operator 
	 * @returns 
	 */
	chooseOperation(operator: string): string {

		let calcResult: number;

		if (this.result === '0' && this.chosenOperator === undefined) {

			return this.stringToNumber(this.enteredNumber).toString();

		}

		switch (operator) {

			case '+':

				calcResult = this.stringToNumber(this.result) + this.stringToNumber(this.enteredNumber);

				break

			case '-':

				calcResult = this.stringToNumber(this.result) - this.stringToNumber(this.enteredNumber);

				break

			case '*':

				calcResult = this.stringToNumber(this.result) * this.stringToNumber(this.enteredNumber);

				break

			case '/':

				calcResult = this.stringToNumber(this.result) / this.stringToNumber(this.enteredNumber);

				break

			default:

				return

		}

		return calcResult.toString();
	}

	/**
	 * 
	 * @param value 
	 * @returns 
	 */
	stringToNumber(value: string): number {

		return parseFloat(value);

	}

	/**
	 * This logic tells us if the calculation is on the beginning of the operations cycle
	 * @returns 
	 */
	orderOfEquation(): boolean {

		return this.previousEnteredNumber === null && this.result === '0';

	}

	/**
	 * 
	 * @param operator 
	 */
	createEquationForDisplay(operator: string): void {

		if (this.orderOfEquation()) {

			this.displayEquation = `${this.enteredNumber} ${operator}`;

		} else if (this.numberWasEntered === false && this.enteredNumber === '0') {

			this.displayEquation = `${this.result} ${operator}`;

		} else {

			this.displayEquation = `${this.result} ${operator} ${this.enteredNumber}`;

		}

	}

	/**
	 * 
	 */
	saveResultToArray(): void {

		let calculation: Object = {}

		calculation = {

			equation: this.displayEquation,
			result: this.prepareResultToDisplay(this.result)

		}

		// emitting the array of results
		this.resultArrayEmitter.emit(calculation);

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

		this.onComputeWasUsed = true;

		// Making a loop exp. 3 + = repeating  =
		if (this.chosenOperator !== undefined && this.enteredNumber === '0' && this.previousEnteredNumber !== null) {

			this.enteredNumber = this.previousEnteredNumber;

		}

		this.createEquationForDisplay(this.chosenOperator);

		this.result = this.chooseOperation(this.chosenOperator);

		this.displayResult = this.prepareResultToDisplay(this.result);

		if (!this.orderOfEquation()) {

			this.saveResultToArray();

		}

		this.numberWasEntered = false;

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
