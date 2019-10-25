import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Student } from '../shared/student.model';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../shared/students.service';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.css']
})
export class StudentsFormComponent implements OnInit, AfterContentChecked {

	currenctAction:   string;
	studentForm:      FormGroup;
	pageTitle:        string;
	serverErrorMessages: string[] = null;
	submittingForm: boolean = false;
  student: Student = new Student();
  
	constructor(
		private studentService: StudentsService,
		private route: ActivatedRoute,
		private router: Router,
		private formBuilder: FormBuilder) { }

	ngOnInit() {
		this.buildStudentForm();
		this.setCurrentAction();
    this.loadStudent();
	}

	private setCurrentAction() {
		if (this.route.snapshot.url[0].path == 'new') {
			this.currenctAction = 'new';
		} else {
			this.currenctAction = 'edit';
		}
	}

	ngAfterContentChecked() {
		this.setPageTitle();
	}

	submitForm() {
		this.submittingForm = true;
		if (this.currenctAction == 'new') {
			this.createStudent();
		} else {
			this.updateStudent();
		}
	}

	private createStudent() {
		const student: Student = Object.assign(new Student(), this.studentForm.value);

		this.studentService.create(student).subscribe(
			(student) => {
				this.actionsFormSuccess(student)
			},
			(error) => {
				this.actionsForError(error)
			}
		);
	}

	private buildStudentForm() {
		this.studentForm = this.formBuilder.group({
			id: [null],
			name: [null, [Validators.required, Validators.minLength(2)]],
			course: [null,  [Validators.required, Validators.minLength(2)]]
		})
	}

	private setPageTitle() {
		if (this.currenctAction == 'new') {
			this.pageTitle = 'Cadastro de Novo Estudante';
		} else {
			const studentName = this.student.name || '';
			this.pageTitle = 'Editando Estudante: ' + studentName;
		}
	}

	private loadStudent() {
		if (this.currenctAction == 'edit') {
			this.studentService.getById(Number(this.route.snapshot.paramMap.get('id'))).subscribe(
				(student) => {
					this.student = student;
					this.studentForm.patchValue(this.student);
				},
				(error) => alert('Ocorreu um erro no servidor, tente mais tarde')
			);
		}
	}

	private updateStudent() {
		const student: Student = Object.assign(new Student(), this.studentForm.value);

		this.studentService.update(student).subscribe(
			(response) => {
				this.actionsFormSuccess(student)
			},
			(error) => {
				this.actionsForError(error)
			}
		);
	}

	private actionsFormSuccess(student: Student) {
		alert('Solicitação processada com sucesso.');

		this.router.navigateByUrl('students', { skipLocationChange: true }).then(
			() => {
				this.router.navigate(['students', student.id, 'edit']);
			}
		);
	}

	private actionsForError(error) {
		alert('Ocorreu um erro ao processar a sua solicitação.');

		this.submittingForm = false;
	}
}