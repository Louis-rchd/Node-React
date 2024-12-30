import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { StudentService, Student } from '../services/students.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule, HighchartsChartModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})

export class StudentsComponent implements OnInit, AfterViewInit {
  students: Student[] = [];
  loading = true;
  newStudent: Omit<Student, 'id'> = { firstName: '', lastName: '', class: '' }; // adding form
  errorMessage: string = ''; // Error message if necessary

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  chartInstance: any;

  constructor(
    private studentService: StudentService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadChartData();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe(
      (data: Student[]) => {
        this.students = data;
        this.loading = false;
        this.loadChartData();
      },
      (error) => {
        console.error('Error while loading students', error);
        this.loading = false;
      }
    );
  }

  loadChartData(): void {
    // Charger les données pour le graphique
    this.studentService.getClassDistribution().subscribe(
      (data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          this.chartOptions = {
            chart: {
              type: 'pie'
            },
            title: {
              text: 'Students repartition by classes'
            },
            series: [{
              type: 'pie',
              name: 'Students',
              data: data
            }]
          };

          if (this.chartInstance) {
            this.chartInstance.destroy();
          }

          const chartContainer = document.getElementById('chart-container');
          if (chartContainer) {
            this.chartInstance = Highcharts.chart(chartContainer, this.chartOptions);
          }

        } else {
          this.errorMessage = 'data collected are invalid or empty.';
        }
      },
      (error) => {
        this.errorMessage = 'Error while collecting data. Check API.';
        console.error('Error API: ', error);
      }
    );
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        try {
          const chartContainer = document.getElementById('chart-container');
          if (chartContainer) {
            if (this.chartInstance) {
              this.chartInstance.destroy();
            }

            this.chartInstance = Highcharts.chart(chartContainer, this.chartOptions);
          }
        } catch (error) {
          console.error('Error while initializing the graph:', error);
        }
      }, 100);
    }
  }

  // Ajouter un étudiant
  addStudent(): void {
    if (!this.newStudent.firstName || !this.newStudent.lastName || !this.newStudent.class) {
      this.errorMessage = 'All fields must be filled';
      return;
    }
    this.studentService.addStudent(this.newStudent).subscribe(
      (student: Student) => {
        this.students.push(student); // Adding student to the list
        this.newStudent = { firstName: '', lastName: '', class: '' }; // Reinitialize form
        this.errorMessage = ''; // Reinitialize error message
        this.loadChartData();
      },
      (error) => {
        console.error('Error while adding the student', error);
        this.errorMessage = 'Error while adding the student';
      }
    );
  }

  // Deleting a student
  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(
      () => {
        this.students = this.students.filter((student) => student.id !== id); // Deleting student from the list
        this.loadChartData();
      },
      (error) => {
        console.error('Error while deleting the student', error);
        this.errorMessage = 'Error while deleting the student';
      }
    );
  }

  // trackBy to avoid recreating an already existing element
  trackByStudentId(index: number, student: Student): number {
    return student.id;
  }
}

