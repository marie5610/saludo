import { Component, ViewChild } from '@angular/core';
import { Saludo } from 'src/app/models/saludo.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HolaService } from 'src/app/hola.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-greetings',
  templateUrl: './greetings.component.html',
  styleUrls: ['./greetings.component.css'],
})
export class GreetingsComponent {
  ELEMENT_DATA: Saludo[] = [];
  displayedColumns: string[] = ['id', 'description', 'actions'];
  dataSource!: MatTableDataSource<Saludo>;
  saludo_texto: string = '';
  saludo: Saludo = { id: 0, description: '' };

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(private hola: HolaService) {}

  ngOnInit(): void {
    this.cargarTabla();
  }

  cargarTabla() {
    this.hola.findAll().subscribe((data) => {
      this.ELEMENT_DATA = data;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  };

  crearSaludo() {
    this.saludo.description = this.saludo_texto;
    this.hola.create(this.saludo).subscribe(
      (nuevoSaludo) => {
        this.saludo_texto = '';
        this.saludo = { id: 0, description: '' };
        this.cargarTabla();
      },
      (error) => {
        console.error('Error al crear el saludo:', error);
      }
    );
  }
  editar(id: number, data: string) {
    this.saludo_texto = data;
    this.saludo.description = this.saludo_texto;
    this.saludo.id = id;
  }
  actualizarSaludo() {
    this.hola.update(this.saludo.id, this.saludo).subscribe(
      (respuesta) => {
        console.log('Saludo actualizado:', respuesta);
        this.cargarTabla();
      },
      (error) => {
        console.error('Error al actualizar el saludo:', error);
      }
    );
  }
  eliminarSaludo(id: number) {
    this.hola.remove(id).subscribe(
      () => {
        this.cargarTabla();
        console.log('Saludo eliminado');
      },
      (error) => {
        console.error('Error al eliminar el saludo:', error);
      }
    );
  }
}
