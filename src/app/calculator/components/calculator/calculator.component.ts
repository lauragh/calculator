import { ChangeDetectionStrategy, Component, computed, HostListener, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from "../calculator-button/calculator-button.component";
import { CalculatorService } from '../../services/calculator.service';


//3a solución => Definir la clase en el componente padre
/*
  styles: `
    .is-command {
      @apply bg-indigo-700 bg-opacity-20;
    }
  `
  */

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,

  host: {
    //Forma recomendada en vez de usar hostlistener
    '(document: keyup)': 'handleKeyboardEvent($event)'  //entreparéntesis porque es el evento al que queremos llamar
  }
})
export class CalculatorComponent {
  private calculatorService = inject(CalculatorService);
  public calculatorButtons = viewChildren(CalculatorButtonComponent);
  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());

  //Forma antigua
  // get resultText(){
  //   return this.calculatorService.resultText();
  // }


  handleClick(key: string){
    // console.log({key});
    this.calculatorService.constructNumber(key);
  }

  // @HostListener('document: keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent){
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      'x': '*',
      '/': '÷',
      Enter: '=',
    }

    const key = event.key;
    //El ?? comprueba si el valor de la izq es null o undefined
    //Algo parecido hace el ||, pero este si es un 0, se considera false, en cambio el ??
    //no lo consideraría false
    const keyValue =  keyEquivalents[key] ?? key;

    this.handleClick(keyValue);

    this.calculatorButtons().forEach(button => {
      button.keyboardPressedStyle(keyValue)
    })
  }

}
