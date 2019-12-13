class CalcController {

    constructor() {

        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvent();
    }
    initialize() {
        this.setDisplayDateTime();
        let interval = setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);

    }
    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }
    equals() {
        let last = this._operation.pop();
        let result = eval(this._operation.join(""));
        if (last == '%') {
            result /= 100;
            this._operation = [result];
        } else {
            this._operation = [result, last];
        }


        this.setLastNumberToDisplay();
    }
    clearAll(value) {
        this._operation = [];
        this.setLastNumberToDisplay();
    }
    clearlEntry() {
        this._operation.pop();
        this.setLastNumberToDisplay();
    }
    getLastOperation() {
        return this._operation[this._operation.length - 1];
    }
    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value;
    }
    isOperator(value) {
        return (['+', '-', '*', '/', '%'].indexOf(value) > -1);
    }
    setLastNumberToDisplay() {
        let lastNumber;

        for (let i = this._operation.length - 1; i >= 0; i--) {
            if (!this.isOperator(this._operation[i])) {
                lastNumber = this._operation[i];
                break;
            }
        }
        if (!lastNumber) lastNumber = 0;
        this.displayCalc = lastNumber;
    }
    pushOperation(value) {
        this._operation.push(value);
        if (this._operation.length > 3) {
            this.equals();
        }
    }
    addOperation(value) {

        if (isNaN(this.getLastOperation())) {
            if (this.isOperator(value)) {
                this.setLastOperation(value);
            } else if (isNaN(value)) {

            } else {

                this.pushOperation(value);
                this.setLastNumberToDisplay();

            }
        } else {
            if (this.isOperator(value)) {
                this.pushOperation(value);
            } else {
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));

                this.setLastNumberToDisplay();
            }

        }

        console.log(this._operation);
    }
    setError() {
        this.displayCalc = "Error";
    }
    execBtn(value) {
        switch (value) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearlEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                this.equals();
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
                break;
        }
    }
    initButtonsEvent() {
        let buttons = document.querySelectorAll("#buttons > g,#parts > g");

        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, "click drag", e => {

                let textBtn = btn.className.baseVal.replace("btn-", "");

                this.execBtn(textBtn);

            });
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";
            });
        });
    }
    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }
    get displayTime() {
        return this._timeEl.innerHTML;
    }
    set displayTime(value) {
        this._timeEl.innerHTML = value;
    }
    get displayDate() {
        return this._dateEl.innerHTML;
    }
    set displayDate(value) {
        this._dateEl.innerHTML = value;
    }
    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }
    get currentDate() {
        return new Date();
    }
    set currentDate(value) {
        this._dataAtual = value;
    }
}