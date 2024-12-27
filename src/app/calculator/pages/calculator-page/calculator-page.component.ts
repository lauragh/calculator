import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalculatorComponent } from "../../components/calculator/calculator.component";

@Component({
  selector: 'calculator-page',
  standalone: true,
  imports: [CalculatorComponent],
  templateUrl: './calculator-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CalculatorPageComponent { }
