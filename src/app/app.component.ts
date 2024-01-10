import { Component, OnInit } from '@angular/core';

import { HolaService } from './hola.service';
import { Saludo } from './models/saludo.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  saludos: Saludo[] = [
    {
      id: 0,
      description: '',
    },
  ];

  form: FormGroup;

  showInput: boolean = true;

  greet: Saludo = {
    id: 0,
    description: '',
  };

  constructor(
    private holaService: HolaService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.findAll();
  }

  onSubmit() {
    if (this.form.valid) {
      const formValues = this.form.value;
      this.create(formValues);
      this.form.reset();
    } else {
      console.log('Form invalid');
    }
  }

  habilitarEdicion(saludo: Saludo) {
    this.greet = saludo;
    this.showInput = false;
  }

  findAll(): void {
    this.holaService.findAll().subscribe((saludos) => {
      this.saludos = saludos;
    });
  }

  findOne(id: number): void {
    this.holaService.findOne(id);
  }

  create(saludo: Saludo): void {
    this.holaService.create(saludo).subscribe((newSaludo) => {
      this.saludos.push(newSaludo);
    });
  }

  update(saludo: Saludo): void {
    this.holaService.update(saludo.id, saludo).subscribe((updatedSaludo) => {
      const index = this.saludos.findIndex((u) => u.id === updatedSaludo.id);
      if (index !== -1) {
        this.saludos[index] = updatedSaludo;
      }
    });
  }

  delete(id: number): void {
    this.holaService.remove(id).subscribe(() => {
      this.saludos = this.saludos.filter((u) => u.id !== id);
    });
  }
}
