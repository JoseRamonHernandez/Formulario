import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

noHernandez(control: FormControl):{[s:string]: boolean }  {

if(control.value?.toLowerCase() === 'Hernandez'){
  return{
    noHernandez: true
  }
}

return null;
}



}
