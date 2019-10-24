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























