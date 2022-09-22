import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calculator';
  num1: number[] = [];
  numbers: number[] = [];
  set: boolean = false;
  numString: String = '';
  op: String = '';
  result: number = 0;
  operation: string = '';

  constructor(){

  }

  ngOnInit(){

  }

  getNumber(num: number): void{
    this.num1.push(num);
    this.operation += num.toString();
  }

  getOperator(op: string): void{
    if(op !== '=' && op !== 'del'){
      this.op = op;
    }
    this.operation += op;

    this.numString = '';

    for(let i of this.num1){
      this.numString += i.toString();
    }

    this.numbers.push(Number(this.numString));
    this.num1 = [];

    if(op === '='){
      this.solveOperation();
    }
    if(op === 'del'){
      this.operation = '';
      this.num1 = [];
      this.numString = '';
      this.numbers = [];
    }
  }

  solveOperation(): void{
    switch(this.op) {
      case "+":
        this.result = this.numbers[0] + this.numbers[1];
        break;
      case "-":
        this.result = this.numbers[0] - this.numbers[1];
        break;
      case "*":
        this.result = this.numbers[0] * this.numbers[1];
        break;
      case "/":
        this.result = this.numbers[0] / this.numbers[1];
        break;
      default:
    }

    this.operation += this.result;

  }
}
