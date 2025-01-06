
import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";

describe('CalculatorService', () => {
  let service: CalculatorService;

  //Es conveniente que se reinicie el servicio antes de cada prueba
  beforeEach(() => {
    //Dentro del configureTestingModule se podría inyectar el service como provider
    //Pero la siguiente forma es más acorde a cómo trabajamos en Angular
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  beforeAll(() => {});    //Antes de que se ejecuten todas las pruebas
  afterEach(() => {});    //Después de que se ejecuten cada pruebas, se suele usar para limpiar mocks
  afterAll(() => {});     //Después de que se ejecuten todas las pruebas

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should set resultText, subResultText to "0" when C i s pressed', () => {
    service.resultText.set('123');
    service.subResultText.set('456');
    service.lastOperator.set('*');

    service.constructNumber('C');

    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should update resulText with number input', () => {
    service.constructNumber('1');
    expect(service.resultText()).toBe('1');

    service.constructNumber('2');
    expect(service.resultText()).toBe('12');
  });

  it('should handle operators correctly', () => {
    service.constructNumber('1');
    service.constructNumber('+');

    expect(service.lastOperator()).toBe('+');
    expect(service.subResultText()).toBe('1');
    expect(service.resultText()).toBe('0');
  });

  it('should calculate result correctly for addition', () => {
    service.constructNumber('1');
    service.constructNumber('+');
    service.constructNumber('1');
    service.constructNumber('=');

    expect(service.lastOperator()).toBe('+');
    expect(service.subResultText()).toBe('0');
    expect(service.resultText()).toBe('2');
  });

  it('should calculate result correctly for subtraction', () => {
    service.constructNumber('1');
    service.constructNumber('-');
    service.constructNumber('1');
    service.constructNumber('=');

    expect(service.resultText()).toBe('0');
  });

  it('should calculate result correctly for multiplication', () => {
    service.constructNumber('1');
    service.constructNumber('*');
    service.constructNumber('1');
    service.constructNumber('=');

    expect(service.resultText()).toBe('1');
  });

  it('should calculate result correctly for division "/"', () => {
    service.constructNumber('1');
    service.constructNumber('0');
    service.constructNumber('/');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('5');
  });

  it('should calculate result correctly for division "÷"', () => {
    service.constructNumber('1');
    service.constructNumber('0');
    service.constructNumber('÷');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('5');
  });

  it('should handle decimal point correctly', () => {
    service.constructNumber('1');
    service.constructNumber('.');
    service.constructNumber('5');

    expect(service.resultText()).toBe('1.5');
    service.constructNumber('.');
    expect(service.resultText()).toBe('1.5');
  });

  it('should handle decimal point correctly starting with 0', () => {
    service.constructNumber('0');
    service.constructNumber('.');
    service.constructNumber('.');
    service.constructNumber('0');

    expect(service.resultText()).toBe('0.0');
  });

  it('should handle sign change correctly', () => {
    service.constructNumber('1');
    service.constructNumber('+/-');

    expect(service.resultText()).toBe('-1');
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('1');
  });

  it('should handle backspace correctly', () => {
    service.resultText.set('123');

    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('12');

    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('1');

    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');

    service.constructNumber('0');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');

    service.resultText.set('-2');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');
  });

  it('should handle maxLength correctly', () => {
    for(let i = 0; i < 10; i++){
      service.constructNumber('1');
    }

    expect(service.resultText().length).toBe(10);

    service.constructNumber('1');
    expect(service.resultText().length).toBe(10);
  });

  it('should handle adding multiple 0s', () => {
    service.resultText.set('-0');
    service.constructNumber('5');

    expect(service.resultText()).toBe('-5');
  });

  it('should rewrite resultText after calculating', async () => {
    service.constructNumber('1');
    service.constructNumber('+');
    service.constructNumber('2');

    await service.constructNumber('=');
    expect(service.hasCalculated).toBe(true);
    expect(service.resultText()).toBe('3');

    service.constructNumber('2');
    expect(service.resultText()).toBe('2');
  });

  it('should handle invalid input', async () => {
    service.constructNumber('a');
  });
})
