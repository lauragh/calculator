import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

//puede haber más de un describe si hay varias funciones
describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;

  });

  it('should create the app', () => {
    //Es necesario tener el zone.js y el zone.js/testing en el angular.json
    //para que pase la prueba correctamente
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should be 3', () => {
    //A = arrange
    const num1 = 1;
    const num2 = 2;

    //A = act
    const result = num1 + num2;

    //A = assert
    expect(result).toBe(3);
  })

  it(`should have the 'zoneless-calculator' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zoneless-calculator');
  });

  // it('should render router-outlet', () => {
  //   expect(compiled.querySelector('router-outlet')).not.toBeNull();
  // });

  //No se debería repetir pruebas para que luego si cambia algo no se tenga que cambiar en varias pruebas
  it('should render router-outlet wrapped with css classes', () => {
    const divElement = compiled.querySelector('div');
    const cssClasses = 'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5';
    const mustHaveClasses = 'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(' ');

    expect(divElement).not.toBeNull();

    //No es recomendable aquí usar toBe porque si se cambia las clases o el orden de ellas, ya dejaría de funcionar
    //por lo que voy a separar el string de las clases para verificar cada una
    // expect(divElement?.classList.value).toBe(cssClasses);

    //Tiene que ser flexible
    //Pero este de abajo tiene un problema, si añades una nueva clase, va a fallar, porque esa nueva clase no está en el mustHaveclasses
    // divElement?.classList.forEach(className => {
    //   expect(mustHaveClasses).toContain(className)
    // });

    //Entonces se tiene que comprobar al revés
    const divClasses = divElement?.classList.value.split(' ');
    mustHaveClasses.forEach(className => {
      expect(divClasses).toContain(className)
    });
  });


  it("should contain the 'buy me a beer' link", () => {
    const anchorElement = compiled.querySelector('a');
    const anchorElementTitle = 'Buy me a beer';
    const anchorElementHref = 'https://www.buymeacoffee.com/scottwindon';

    expect(anchorElement).not.toBeNull();
    expect(anchorElement?.title).toBe(anchorElementTitle);

    //Se puede hacer de ods maneras
    expect(anchorElement?.href).toBe(anchorElementHref);
    expect(anchorElement?.getAttribute('href')).toBe(anchorElementHref);
  })
});
