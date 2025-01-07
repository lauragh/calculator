import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '@/calculator/services/calculator.service';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { By } from '@angular/platform-browser';

//En vez de usar el servicio directamente creamos una clase ficticia, siempre se llama mock-
class MockCalculatorService {
  public resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
  public subResultText = jasmine.createSpy('subResultText').and.returnValue('0');
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');

  public constructNumber = jasmine.createSpy('constructNumber');
}

describe('CalculatorComponent', () => {
  let fixture: ComponentFixture<CalculatorComponent>
  let compiled: HTMLElement;
  let component: CalculatorComponent;

  let mockCalculatorService: MockCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        {
          provide: CalculatorService,
          useClass: MockCalculatorService //Usa el calculator service a través de nuestra clase mock creada
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    mockCalculatorService = TestBed.inject(CalculatorService) as unknown as MockCalculatorService; //Para convertilo en tipo MockCalculatorService, hay que pasarlo a unkwon primero

    // fixture.detectChanges(); //Hay que esperar a que se cargue el html que usa datos a través del calculator service
  });

  it('should create the app', () => {
    console.log(compiled);
    expect(component).toBeTruthy();
  });

  it('should have the current getters', () => {
    expect(component.resultText()).toBe('100.00');
    expect(component.subResultText()).toBe('0');
    expect(component.lastOperator()).toBe('+');
  });

  it('should display proper calculation values', () => {
    //Para cambiar los valores de los atributos del servicio fake, hay que inyectarlo antes
    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('456');
    mockCalculatorService.lastOperator.and.returnValue('*');

    //Al cambiar el componente hay que llamar al detectChanges para que se aplique el cambio,
    //El que se llama en el beforeEach no sirve porque este cambio se realiza más tarde
    fixture.detectChanges();

    expect(component.resultText()).toBe('123');
    expect(component.subResultText()).toBe('456');
    expect(component.lastOperator()).toBe('*');

    //Compruebo que se muestre el subresult con el operador
    expect(compiled.querySelector('span')?.innerText).toBe('456 *');
  });

  it('should have 19 calculator-button components', () => {
    expect(component.calculatorButtons()).toBeTruthy(); //toBeTruthy devuelve true para cualquier valor que no sea false, 0, '', null, undefined, o NaN
    expect(component.calculatorButtons().length).toBe(19);
  });

  it('should have 19 calculator-button components with content projection', () => {
    const buttons = compiled.querySelectorAll('calculator-button');
    //Esta forma los devuelve como debugElement
    // const buttonsByDirective = fixture.debugElement.queryAll(
    //   By.directive(CalculatorButtonComponent)
    // );

    expect(component.calculatorButtons().length).toBe(19);

    // buttons.forEach((b) => {
    //   expect(b?.textContent?.trim()).not.toBeNull();
    // })

    expect(buttons[0].textContent?.trim()).toBe('C');
    expect(buttons[1].textContent?.trim()).toBe('+/-');
    expect(buttons[2].textContent?.trim()).toBe('%');
    expect(buttons[3].textContent?.trim()).toBe('÷');
  });

  it('should handle keyboard events correctly', () => {
    const eventEnter = new KeyboardEvent('keyup', {key: 'Enter'});
    document.dispatchEvent(eventEnter); //lanza el evento
    // expect(mockCalculatorService.constructNumber).toHaveBeenCalled(); //Aquí no evalúo que se llame con enter
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=');

    const eventESC = new KeyboardEvent('keyup', {key: 'Escape'});
    document.dispatchEvent(eventESC); //lanza el evento
    // expect(mockCalculatorService.constructNumber).toHaveBeenCalled(); //Aquí no evalúo que se llame con enter
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');
  });


  it('should display result text correctly', () => {
    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('10');
    mockCalculatorService.lastOperator.and.returnValue('-');

    fixture.detectChanges();

    expect(component.resultText()).toBe('123');

    expect(compiled.querySelector('#sub-result')?.textContent).toContain('10 -');
  });
});
