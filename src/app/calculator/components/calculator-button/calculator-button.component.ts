import { ChangeDetectionStrategy, Component, HostBinding, input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './calculator-button.component.css',  //si tengo muchos estilos que añadir en vez de usar el hostbinding
  host: {
    class: "w-1/4 border-r border-b border-indigo-400",
    // attribute: 'hola',
    // 'data-size': 'XL'
  },
  // encapsulation: ViewEncapsulation.None //2º solución => elimina cualquier tipo de encapsulacion incluído css
})
export class CalculatorButtonComponent implements OnInit{
  // public isCommand = input.require();
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

  @HostBinding('class.w-2/4') get commandStyle(){
    return this.isDoubleSize();
  }

  ngOnInit(): void {
    console.log(this.isCommand());
  }
 }
