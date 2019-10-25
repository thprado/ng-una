# NgUna

Olá pessoal, a partir do momento que instalamos as dependências agora iremos criar os componentes da nossa aplicação.

De um terminal que está aberto na raiz do projeto, digite o seguinte comando:

```
ng generate module shared
````

A partir desse comando, vemos que ele gerou pra gente o seguinte módulo:

!["Shared Module"](https://i.imgur.com/64AbrLE.jpg)

Depois disso vamos criar o primeiro componente, do nosso shared module, então pra isso, executamos o seguinte comando:

```
ng generate component shared/navbar --skipTests=true
```

E assim vemos que ele criou o nosso primeiro componente:

!["Componente Navbar"](https://i.imgur.com/YfQFRXe.jpg)

Agora pessoal, vamos criar o módulo de estudantes, pra isso, vamos executar o seguinte comando:

```
ng generate module pages/students --routing
```

Nota: o flag --routing é pra gerar o módulo de rotas automaticamente:

E aqui está o nosso módulo de estudantes:

!["Módulo de estudantes"](https://i.imgur.com/1kALDuf.jpg)

Agora vamos gerar o módulo da página home:

```
ng generate module pages/home --routing
```

!["Módulo Home"](https://i.imgur.com/EDX8oF8.jpg)


E agora iremos gerar o componente da home:

```
ng generate component pages/home --skipTests=true
```

!["Componente Home"](https://i.imgur.com/bMCa2ik.jpg)

Agora pessoal, lembra do Navbar que criamos, agora precisamos utilizar ele na aplicação, então inicialmente precisamo exportá-lo:

!["Exportando navbar"](https://i.imgur.com/RCTXzjz.jpg)

E agora é só importarmos o Shared Module no AppModule:

!["Importando Shared Module"](https://i.imgur.com/eykh4EU.jpg)

Feito isso, agora precisamos testar o componente na nossa página principal da aplicação, então o arquivo "app.component.html" deve ficar desta maneira: 

```
<app-navbar></app-navbar>

<div class="container">
  <router-outlet></router-outlet>
</div>
```

Assim como a imagem:

!["Utilizando navbar na app component"](https://i.imgur.com/6XpIIyr.jpg)

E este deverá ser o nosso resultado no browser:

!["View"](https://i.imgur.com/AXowtU0.jpg)

Agora devemos colocar um corpo no nosso navbar, então devemos usar o seguinte trecho de código na nossa navbar:

```
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a class="navbar-brand" [routerLink]="'/'">Home</a>
   
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item" routerLinkActive="active">
                <a class="nav-link" [routerLink]="'/students'">Estudantes</a>
            </li>
        </ul>
    </div>
</nav>
```

E antes de testarmos, devemos ir no nosso Shared Module, e inserir o seguinte trecho:

!["Router Module"](https://i.imgur.com/rfNEwfM.jpg)

Agora vamos gerar os componentes de Estudantes, pra isso, vamos usar os seguintes comandos:

```
ng generate component pages/students/students-form --skipTests=true
ng generate component pages/students/students-list --skipTests=true
```

E este será o nosso resultado:

!["Componentes de Estudantes"](https://i.imgur.com/DDpt2GV.jpg)

Agora, no nosso arquivo "app-routing.module.ts" devemos inserir o seguinte trecho:


```
const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/home/home.module#HomeModule'
  },
  {
    path: 'students',
    loadChildren: './pages/students/students.module#StudentsModule'
  }
];
```

Após isso, no arquivo "home-routing.module.ts" devemos inserir o seguinte trecho:

```
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];
```

E também no arquivo "students-routing.module.ts", devemos inserir este trecho:

```
import { StudentsFormComponent } from './students-form/students-form.component';
import { StudentsListComponent } from './students-list/students-list.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsListComponent
  },
  {
    path: 'new',
    component: StudentsFormComponent
  },
  {
    path: ':id/edit',
    component: StudentsFormComponent
  }
];
```

Este será o nosso resultado:

!["Home Works"](https://i.imgur.com/QryP6B3.jpg)

E na rotas rotas de estudantes:

/students

!["Students List Works"](https://i.imgur.com/BDgEKqk.jpg)

/students/new

!["Students Form Works"](https://i.imgur.com/B3MFw1i.jpg)

/students/1/edit

!["Students Form Works"](https://i.imgur.com/pJyq09u.jpg)


Agora vamos criar um model pra representar nosso estudante:

Na pasta "pages/students" criem uma pasta chamada "shared" e criem um arquivo chamado "student.model.ts":

```
export class Student {
    constructor(
        public id?: number,
        public name?: string,
        public course?: string
    ) {
        
    }
}
```

Nessa mesma pasta, criem um arquivo chamado "students.service.ts" com o seguinte trecho:

```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private apiPath: string = 'api/students';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Student[]> {
    return this.http.get<any>(this.apiPath);
  }

  getById(id: number): Observable<Student> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get<any>(url);
  }

  update(student: Student): Observable<Student> {
    const url = `${this.apiPath}/${student.id}`;

    return this.http.put<any>(url, student);
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete<any>(url);
  }

  create(student: Student): Observable<Student> {
    return this.http.post<any>(this.apiPath, student);
  }
}
```

Agora vamos utilizar o AngularInMemoryWebApi, executem o seguinte comando:

```
npm i angular-in-memory-web-api --save
```

Após o termino do comando, insiram o seguinte trecho no "app.module.ts":

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDatabase } from "./in-memory-database";
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
      AppRoutingModule,
      SharedModule,
      BrowserAnimationsModule,
      HttpClientModule,
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Agora vamos criar nosso banco de dados, criem um arquivo na raiz do projeto com o nome "in-memory-database.ts", com o seguinte trecho: 

```
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Student } from './pages/students/shared/student.model';

export class InMemoryDatabase implements InMemoryDbService {
	createDb() {
		const students: Student[] = [
            { id: 1, name: 'João', course: 'Sistemas de Informação' } as Student,
            { id: 2, name: 'Maria', course: 'Sistemas de Informação' } as Student,
            { id: 3, name: 'Nicolas', course: 'Sistemas de Informação' } as Student,
            { id: 4, name: 'Alice', course: 'Sistemas de Informação' } as Student,
            { id: 5, name: 'Caroline', course: 'Sistemas de Informação' } as Student,
            { id: 6, name: 'Leonardo', course: 'Sistemas de Informação' } as Student,
            { id: 7, name: 'Patrick', course: 'Sistemas de Informação' } as Student,
            { id: 8, name: 'Carlos', course: 'Sistemas de Informação' } as Student,
            { id: 9, name: 'Laura', course: 'Sistemas de Informação' } as Student
		  ]

		return { students };
	}
}
```

Agora no arquivo "students-form.component.html", insiram o seguinte trecho:

```
<nav class="mb-5 mt-1">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <a [routerLink]="'/'">Home</a>
            </li>
            <li class="breadcrumb-item">
                <a [routerLink]="'/students'">Estudantes</a>
            </li>
            <li class="breadcrumb-item active">
                {{pageTitle}}
            </li>
        </ol>
    </nav>
    
    <div class="row mt-4">
        <div class="col-md">
            <h1 class="h2 border-left pl-2">{{pageTitle}}</h1>
        </div>
        <div class="col-md">
            <a [routerLink]="'/students'" class="btn btn-light float-right">
                << Voltar
            </a>
        </div>
    </div>
    
    <form [formGroup]="studentForm" (submit)="submitForm()">
        
        <div class="card">
            <div class="card-header">
                Informações sobre o Estudante
            </div>
    
            <div class="card-body">
                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label for="name">Nome</label>
                        <input type="text" class="form-control" id="name" formControlName="name">
    
                        <div class="text-danger" *ngIf="studentForm.get('name').invalid && studentForm.get('name').touched">
                            <div *ngIf="studentForm.get('name').errors.required">dado obrigatório</div>
                            <div *ngIf="studentForm.get('name').errors.minlength">deve ter no mínimo 2 caracteres</div>
                        </div>
                    </div>
                    
                    
                    <div class="form-group col-md-2">
                        <label for="birth">Curso</label>
                        <input type="text" class="form-control" id="course" formControlName="course">
    
                        <div class="text-danger" *ngIf="studentForm.get('course').invalid && studentForm.get('course').touched">
                            <div *ngIf="studentForm.get('course').errors.required">dado obrigatório</div>
                            <div *ngIf="studentForm.get('course').errors.minlength">deve ter no mínimo 2 caracteres</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <button type="submit" [disabled]="submittingForm || studentForm.invalid" class="btn btn-primary btn-lg float-right mt-3">Salvar</button>
    
    </form>
```


E no arquivo "students-form.component.ts", insiram o seguinte trecho:

```
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
```


E agora no arquivo students-list.component.html insiram o seguinte trecho:

```
<nav class="mb-5 mt-1">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
              <a [routerLink]="'/'">Home</a>
          </li>
          <li class="breadcrumb-item">
              <a>
                  Estudantes
              </a>
          </li>
        </ol>
      </nav>
      
      <div class="row mb-4">
          <div class="col-md-9">
              <h1 class="border-left pl-2">
                  Estudantes
              </h1>
          </div>
          <div class="col-md-3">
              <a [routerLink]="'new'" class="btn btn-success float-right">
                  + Novo Estudante
              </a>
          </div>
      </div>
      
      <table class="table table-hover">
          <thead>
              <tr class="bg-primary text-light">
                  <th>Nome</th>
                  <th>Curso</th>
                  <th class="text-center">Ações</th>
              </tr>
          </thead>
          <tbody>
              <tr *ngFor="let student of students">
                  <td>
                      <strong>{{ student.name }}</strong>
                  </td>
                  <td>
                      {{ student.course }}
                  </td>
                  <td  class="text-center">
                      <a [routerLink]="[student.id,'edit']" class="btn btn-outline-info btn-sm mr-2">Editar</a>
                      <button (click)="deleteStudent(student);" class="btn btn-outline-danger btn-sm">Excluir</button>
                  </td>
              </tr>
          </tbody>
      </table>
```

E agora no arquivo "students-list.component.ts", insiram o seguinte trecho:

```
import { Component, OnInit } from '@angular/core';
import { Student } from '../shared/student.model';
import { StudentsService } from '../shared/students.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
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
```






















