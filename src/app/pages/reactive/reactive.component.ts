import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

 
@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {



forma: FormGroup;


  constructor(private fb: FormBuilder,
              private validadores: ValidadoresService ) { 

this.crearFormulario(); 
//this.cargarDataAlFormulario();
  }

  ngOnInit(): void {
  }

  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray;
  }


  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }
  get apellidoNoValido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }
  get correoNoValido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }

get distritoNoValido(){
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched
  }
  
  get ciudadNoValido(){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched
  }

crearFormulario()
{
this.forma = this.fb.group({
nombre: ['', [Validators.required, Validators.minLength(5)  ] ],
apellido: ['', [Validators.required, this.validadores.noHernandez]   ],
correo: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.required]  ],
direccion: this.fb.group({
  distrito: ['', Validators.required],
  ciudad: ['', Validators.required]
}),
pasatiempos: this.fb.array([])
});
}

cargarDataAlFormulario(){

//this.forma.setValue({
this.forma.reset({
nombre: 'juana',
apellido: 'perez',
correo: 'juanperez@gmail.com',
direccion: {
  distrito: 'Ottawa',
  ciudad: 'DeHay'
}
});

}


agregrarPasatiempo(){
  this.pasatiempos.push( this.fb.control(' ') );
}


borrarPasatiempo(i: number){
  this.pasatiempos.removeAt(i);
}

guardar(){
  console.log(this.forma);

  if(this.forma.invalid){
    Object.values(this.forma.controls).forEach( control =>{
      if(control instanceof FormGroup)
      {
        Object.values(control.controls ).forEach( control => control.markAsTouched() );
      }
      else{
      control.markAsTouched();
      }
    });
    return;
  }
//Posteo de informacion
this.forma.reset({
  nombre: 'Sin nombre//'
});
}
}
