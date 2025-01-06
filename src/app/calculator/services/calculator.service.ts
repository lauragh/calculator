import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/', '÷'];
const specialOperators = ['+/-', '%', '.', '=', 'C', 'Backspace', 'Enter'];


@Injectable({
  providedIn: 'root'  //Esto hace el servicio global
})
export class CalculatorService {
  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public hasCalculated = false;

  public async constructNumber(value: string): Promise<void>{
    if(this.hasCalculated && this.resultText() && this.subResultText() === '0' && numbers.includes(value)){
      console.log('entro');
      this.resultText.set(value);
      this.hasCalculated = false;
      return;
    }

    //Validar input
    if(![...numbers, ...operators, ...specialOperators].includes(value)){
      console.log('Invalid input', value);
      return;
    }

    // =
    if(value === '=' || value === 'Enter'){
      await this.calculateResult();
      this.hasCalculated = true;
      return;
    }

    //Limpiar resultados
    if(value === 'C'){
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    //Backsapce
    if(value === 'Backspace'){
      if(this.resultText() === '0') return;
      if(this.resultText().length === 2 && this.resultText().includes('-')){
        this.resultText.set('0');
        return;
      }

      if(this.resultText().length === 1){
        this.resultText.set('0');
        return;
      }

      //Se puede usar el set pero el update devuelve el valor anterior
      this.resultText.update(v => v.slice(0, -1));
      return;
    }

    //Aplicar operador
    if(operators.includes(value)){
      // await this.calculateResult();
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    //Limitar número de carácteres
    if(this.resultText().length >= 10){
      console.log('Max length reached');
      return;
    }

    //Validar punto decimal
    if(value === '.' && !this.resultText().includes('.')){
      if(this.resultText() === '0' || this.resultText() === ''){
        this.resultText.set('0.');
        return;
      }

      this.resultText.update(text => text + '.');
      return;
    }

    //Manejo de 0 inicial
    if(value === '0' && (this.resultText() === '0' || this.resultText() === '-0')){
      return;
    }

    //Cambiar signo
    if(value === '+/-'){
      if(this.resultText().includes('-')){
        this.resultText.update(text => text.slice(1));
        return;
      }
      this.resultText.update(text => `-${text}`);
      return;
    }

    //Números
    if(numbers.includes(value)){
      if(this.resultText() === '0'){
        this.resultText.set(value);
        return;
      }

      else if(this.resultText() === '-0'){
        this.resultText.set(`-${value}`);
        return;
      }

      this.resultText.update(text => text + value);
      return;
    }

  }

  public async calculateResult(){
    const number1 = parseFloat(this.subResultText());
    const number2 = parseFloat(this.resultText());

    let result = 0;

    switch(this.lastOperator()){
      case '+':
        result = number1 + number2;
        break;
      case '-':
        result = number1 - number2;
        break;
      case '*':
        result = number1 * number2;
        break;
      case '/':
        result = number1 / number2;
        break;
      case '÷':
        result = number1 / number2;
        break;
    }

    this.resultText.set(result.toString());
    this.subResultText.set('0');
  }
}
