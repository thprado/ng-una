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











