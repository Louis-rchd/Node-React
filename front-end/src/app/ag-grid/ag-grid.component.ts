import { Component, OnInit } from '@angular/core';
import { StudentService, Student } from '../services/students.service';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { CommonModule } from '@angular/common';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model'; 

@Component({
  selector: 'app-ag-grid',
  imports: [
    AgGridModule, CommonModule
  ],
  templateUrl: './ag-grid.component.html',
  styleUrl: './ag-grid.component.css'
})
export class AgGridComponent implements OnInit {
  students: Student[] = [];
  loading = false;
  error: string | null = null;
  
  columnDefs: ColDef[] = [
    { 
      field: 'id',
      headerName: 'ID',
      sortable: true,
      filter: 'agNumberColumnFilter',
      width: 100
    },
    { 
      field: 'firstName',
      headerName: 'Prénom',
      sortable: true,
      filter: 'agTextColumnFilter'
    },
    { 
      field: 'lastName',
      headerName: 'Nom',
      sortable: true,
      filter: 'agTextColumnFilter'
    },
    { 
      field: 'class',
      headerName: 'Classe',
      sortable: true,
      filter: 'agTextColumnFilter'
    }
  ];

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    console.log('StudentGridComponent initialized');
    this.loadStudents();
  }

  loadStudents(): void {
    console.log('Loading students...');
    this.loading = true;
    this.error = null;
    
    this.studentService.getStudents().subscribe({
      next: (data: Student[]) => {
        console.log('Students loaded:', data);
        this.students = data;
        console.log('Current students:', this.students);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading students:', error);
        this.error = 'Erreur lors du chargement des étudiants: ' + error.message;
        this.loading = false;
      },
      complete: () => {
        console.log('Loading complete');
        this.loading = false;
      }
    });
  }

  onGridReady(params: GridReadyEvent) {
    console.log('Grid ready');
    console.log('Current data', this.students);
    params.api.sizeColumnsToFit();
  }

  public get modules(): any[] {
    return [ClientSideRowModelModule];
  }
}
