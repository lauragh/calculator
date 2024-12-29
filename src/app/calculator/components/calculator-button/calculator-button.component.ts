import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, input, OnInit, output, signal, viewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './calculator-button.component.css',  //si tengo muchos estilos que añadir en vez de usar el hostbinding
  host: {
    class: "border-r border-b border-indigo-400",
    '[class.w-2/4]': 'isDoubleSize()',
    '[class.w-1/4]': '!isDoubleSize()'
    // attribute: 'hola',
    // 'data-size': 'XL'
  },
  // encapsulation: ViewEncapsulation.None //2º solución => elimina cualquier tipo de encapsulacion incluído css
})
export class CalculatorButtonComponent implements OnInit{
  public isPressed = signal(false);

  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');
  // public isCommand = input.require(); //obliga que todos los componentes de este tipo necesite el atributo isCommand

  //Se usa el transform porque, Angular al añadir simplemente el atributo (isCommand) al elemento, pasa un string vacío en vez de ser booleano
  public isCommand = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value
  });

  public isDoubleSize = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value
  });

  /*Se puede cambiar el decorador por una función
    El hostbinding te permite tener acceso a todos los atributos del host
    Si el getter devuelve true, se aplica la clase, si devuelve false, no
  */
  // @HostBinding('class.bg-red-500') get commandStyle(){  //ESTO ES USANDO UNA CLASE DE TAILWIND
  //   return this.isCommand();
  // }


  //Esto es usando una clase propia, no lo va a detectar, por lo que hay que ver las diferentes soluciones
  // @HostBinding('class.is-command') get commandStyle(){
  //   return this.isCommand();
  // }

  ngOnInit(): void {
    // console.log(this.isCommand());
  }

  handleClick(){
    if(!this.contentValue()?.nativeElement){
      return;
    }

    const value = this.contentValue()!.nativeElement.innerText;
    this.onClick.emit(value.trim());
  }

  public keyboardPressedStyle(key: string){
    if(!this.contentValue) return;

    const value = this.contentValue()?.nativeElement.innerText;

    if(value !== key) return;

    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);

  }

 }
