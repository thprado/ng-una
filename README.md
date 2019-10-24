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



