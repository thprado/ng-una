import { Component, OnInit } from '@angular/core';
import { Student } from '../shared/student.model';
import { StudentsService } from '../shared/students.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  students: Student[] = [];

  constructor(private studentService: StudentsService) { }

  ngOnInit() {
    this.studentService.getAll().subscribe(
        students => this.students = students,
        error => alert('Erro ao carregar a lista')
    );
  }

  deleteStudent(student) {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete) {
        this.studentService.delete(student).subscribe(
            () => this.students = this.students.filter(element => element != student,
            () => alert('Erro ao tentar excluir')
        ));
    }
  }
}
