import { Component, inject, OnInit } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder,FormGroup,ReactiveFormsModule} from '@angular/forms';
import { CalcsService } from '../../Services/calcs.service';
import { Calculator } from '../../Models/Calculator';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-inicio-c',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './inicio-c.component.html',
  styleUrl: './inicio-c.component.css'
})

export class InicioCComponent implements OnInit {
  private calcsServicio = inject(CalcsService);
  public formBuid = inject(FormBuilder);
  

  public formCalc: FormGroup = this.formBuid.group({
    NumberOne:[''],
    NumberTwo:[''],
    cbxTipe:[''],
    Resul:[''],
  });

  ngOnInit(): void {

  }

  CalcularData(){

    const objeto : Calculator = {
      NumberOne: this.formCalc.value.NumberOne,
      NumberTwo: this.formCalc.value.NumberTwo, 
    }

    let txtNumberOne = this.formCalc.value.NumberOne;
    let tipeCalc = this.formCalc.value.cbxTipe;
    if(tipeCalc==''){
      alert("Favor de Seleccionar una opción");
      return;
    }

    if(txtNumberOne == ''){
      alert("Favor de escribir al menos dos números");
      return;
    }

    if(tipeCalc=='5' && isNaN(txtNumberOne)){
      alert("Favor de escribir solo un número...");
      return;
    }

    console.log(tipeCalc);
    switch (tipeCalc) {

      case "2":

        this.calcsServicio.generateOperations(objeto).subscribe({
          next:(data) =>{
            if(data.isSuccess){                
              this.formCalc.patchValue({              
                Resul: data.results
              })
              console.log(data.results);         
            }else{
              alert("Error al crear")
            }
          },
          error:(err) =>{
            console.log(err.message)
          }
        }) 

        break;
                
      case "5":

        this.calcsServicio.factorial(objeto).subscribe({
          next:(data) =>{
            if(data.isSuccess){                
              this.formCalc.patchValue({              
                Resul: data.results
              })
              console.log(data.results);         
            }else{
              alert("Error al crear")
            }
          },
          error:(err) =>{
            console.log(err.message)
          }
        }) 

        break;                        
    }


  }  

}
