import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';
import { Component } from '@angular/core';


@Component({
  standalone: true,
  imports: [CalculatorButtonComponent],
  template: `
    <calculator-button>
      <span class="projected-content underline">Test content</span>
    </calculator-button>
  `
})
class TestHostComponent {}


describe('CalculatorButton', () => {
  let fixture: ComponentFixture<CalculatorButtonComponent>
  let compiled: HTMLElement;
  let component: CalculatorButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorButtonComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    //Necesario para detectar cambios como el añadir la clase 1/4 o 2/4 según el input
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should apply w-1/4 if doubleSize is false', () => {
    const hostCssClasses = compiled.classList.value.split(' ');
    expect(hostCssClasses).toContain('w-1/4');
    expect(component.isDoubleSize()).toBeFalse();
  });

  it('should apply w-2/4 if doubleSize is false', () => {
    fixture.componentRef.setInput('isDoubleSize', true);
    fixture.detectChanges();

    const hostCssClasses = compiled.classList.value.split(' ');
    expect(hostCssClasses).toContain('w-2/4');
    expect(component.isDoubleSize()).toBeTrue();
  });

  it('should emit onClick when handleClick() is called', () => {
    //Espías, están pendientes de sucesos
    spyOn(component.onClick, 'emit');

    component.handleClick();

    expect(component.onClick.emit).toHaveBeenCalled();
    // expect(component.onClick.emit).toHaveBeenCalledWith('1');
  });

  it('should set isPressed to true and then false when keyboardPressedStyle is called with a matching key', (done) => {
    component.contentValue()!.nativeElement.innerText = '1';
    component.keyboardPressedStyle('1');

    expect(component.isPressed()).toBeTrue();

    setTimeout(() => {
      expect(component.isPressed()).toBeFalse();
       //El done hace que espere hasta que se llama aquí, si no se usa,
       //dará un error en consola diciendo que se ha invocado sin existir ningún test actual
      done();
    }, 101);
  });


  it('should not set isPressed to true if key is not matching', () => {
    component.contentValue()!.nativeElement.innerText = '1';
    component.keyboardPressedStyle('2');

    expect(component.isPressed()).toBeFalse();
  });

  it('should display projected content', () => {
    const testHostFixture = TestBed.createComponent(TestHostComponent);
    console.log(testHostFixture.debugElement); //Esto te muestra más atributos aparte del nativeElement
    const compiled = testHostFixture.nativeElement as HTMLDivElement;
    const projectedContent = compiled.querySelector('.projected-content');
    expect(projectedContent).not.toBeNull();
    expect(projectedContent?.classList.contains('underline')).toBeTrue();

  });

  // it('should contain basic css classes', () => {
  //   const divElement = compiled.querySelector('div');
  //   const divClasses = divElement?.classList.value.split(' ');
  //   const mustHaveClasses = 'border-r border-b border-indigo-400'.split(' ');

  //   mustHaveClasses.forEach(className => {
  //     expect(divClasses).toContain(className)
  //   })
  // });
});
