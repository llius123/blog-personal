---
title: "Principios solid"
date: "2020-01-01"
tag: "programacion"
---
# Principios solid

## SOLID

- S →Single responsability principle.
Una clase debería tener **una, y solo una, razón para cambiar.**
- O → Open close principle.
Las clases que usas deberían estar abiertas para poder extenderse y cerradas para modificarse.
- L → Liskov sustituation principle.
Las clases derivadas deben poder sustituirse por sus clases base.
- I → Interface segregation principle.
Haz interfaces para una finalidad concreta.
- D → Dependency inversion principle.
Depende de abstracciones, no de clases concretas.

### Aplicando estos principios nuestro software sera:

- Mas tolerante a cambios
- Mayor reutilizacion de clases
- Mejor testing

## S→Single responsability principle

Clases pequeas con objetivos acotados.

Diferenciar entre modelo de dominio, que tiene muchos atributos y por lo tanto muchos getters/setters, y los servicios.

Ejemplo rapido:
EmailService.java → Esto huele a clase con varios metodos publicos, por lo tanto tiene pinta de que tiene varias responsabilidades(enviar emails, obtener listado de emails etc...)

EmailSenderService.java → Esto huele a que esta clase solo se encarga de enviar emails y ademas solo tiene 1 metodo publico, asi que esto tiene pinta de que si esta cumpliendo el principio de SRP

### Finalidad

- Alta cohesion
Mayor reutilizacion
- Permitir composicion de clases.
Inyectar clases en el constructor
- Evitar duplicidad.

### Ejemplo simple

Violacion del principio SRP

```jsx
final class Book
{
    public String getTitle()
    {
        return "A great book";
    }
    public String getAuthor()
    {
        return "John Doe";
    }
    public void printCurrentPage()
    { 
        System.out.println("current page content");
    }
}
```

Esto esta mal ya que estamos acoplando a nuestro dominio la forma de hacer print de una pagina en concreto de un libro.

La solucion:

```jsx
final class Book
{
    public String getTitle()
    {
        return "A great book";
    }
    public String getAuthor()
    {
        return "John Doe";
    }
    public String getCurrentPage()
    {
        return "current page content";
    }
}
```

Hacer que nuestro dominio devuelva la pagina actual.

Y luego que el sevicio se encargue de llamar a otra clase que tenga implementado una forma de imprimir esta hoja.

```jsx
final class Client
{
    public Client() {
        Book book = new Book(…);
        String currentPage = book.getCurrentPage();
        StandardOutputPrinter printer = new StandardOutputPrinter();
        printer.printPage(currentPage);
    }
}
```

```jsx
final class StandardOutputPrinter
{
    public void printPage(String page)
    {
        System.out.println(page);
    }
}
```

La mejora que se podria hacer aqui es hacer modular la forma de imprimir cosas.

```jsx
interface Printer
{
    public void printPage(String page);
}
```

```jsx
final class StandardOutputPrinter implements Printer
{
    public void printPage(String page)
    {
        System.out.println(page);
    }
}
```

```jsx
final class StandardOutputHtmlPrinter implements Printer
{
    public void printPage(String page)
    {
        System.out.println("<div>" + page + "</div>");
    }
}
```

En forma de UML (lineas discontinuas significa que una clase esta implementado una interfaz)

![Untitled](../images/posts/Principios_solid/Untitled.png)

### Video de ejemplo de codely

[link](https://pro.codely.tv/library/principios-solid-aplicados-36875/77070/path/step/46980703/)

### Pregunta interesante: ¿Cuándo empujaremos la lógica de negocio hacia nuestros modelos de dominio?

![Untitled](../images/posts/Principios_solid/Untitled%201.png)

Claro, depende de las dependencias, si tiene dependencias externas no.

## O→ Open close principle

Abierto a expansion, cerrado a modificacion.

### Cuando usar interfaces/clases abstractas

Clase abstracta viene implementada, por lo tanto el que herede no tiene que implementar los metodos.
La interfaz no viene implementada, asi que el extienda de esta interfaz tiene que implementar los metodos que necesite.

### Ejemplo simple

```jsx
final class Song {
  private Double totalLength;
  private Double sentLength;

  public Double getSentLengthPercentage() {
    return sentLength * 100 / totalLength;
  }
}
```

```jsx
final class File {
  private Double totalLength;
  private Double sentLength;

  public Double getSentLengthPercentage() {
    return sentLength * 100 / totalLength;
  }
}
```

Solucion

```jsx
interface Measurable {
  public Double getTotalLength();
  public Double getSentLength();
}
```

```jsx
final class Song implements Measurable {
    private Double totalLength;
    private Double sentLength;
    
    @Override
    public Double getTotalLength() {
        return totalLength;
    }
    
    @Override
    public Double getSentLength() {
        return sentLength;
    }
}
```

```jsx
final class Progress {
    public Double getSentLengthPercentage(Measurable measurable) {
        return measurable.getSentLength() * 100 / measurable.getTotalLength();
    }
}
```

## L → Liskov

Esto se define mejor con un ejemplo.

```jsx
interface UserRepo

class UserRepoMYSQL implements UserRepo

public class AddUser {
	constructor(UserRepo: UserRepo)
	createUser()
}

const addUser = new AddUser(new UserRepoMYSQL())
```

Ahora cambiamos a postgress

```jsx
interface UserRepo

class UserRepoPostgress implements UserRepo

public class AddUser {
	constructor(UserRepo: UserRepo)
	createUser()
}

// Solo hay que hacer un cambio y es aqui
const addUser = new AddUser(new UserRepoPostgress())
```

Y todo seguiria funcionando bien e igual que con MYSQL

## I → Interface segregation principle

Ningun cliente deberia verse forzado a depender de metodos que no usa.

*Las interfaces pertenecen a los clientes.*

Interfaz para BBDD1

```jsx
interface UserRepository
{
    public function save(User $user): void;
    
    public function flush(User $user): void;

    public function saveAll(Users $users): void;
    
    public function search(UserId $id): ?User;
    
    public function all(): Users;
}
```

Ahora queremos cambiar de BBDD.

El flush en esta nueva BBDD no hace falta, asi que tendriamos que implementar un metodo que no necesitamos.

Aqui es donde nos damos cuenta que estamos violando el ISP.

Por lo tanto la solucion es modificar la interfaz para que el contrato sirva para las 2 BBDD.

```jsx
interface UserRepository
{
    public function save(User $user): void;

    public function saveAll(Users $users): void;
    
    public function search(UserId $id): ?User;
    
    public function all(): Users;
}
```

## D → Dependency Inversion

No depender de la implementacion, sino de la interfaz/clase abstracta

> Se ha hablado del GIVEN,WHEN,THEN
> 

La inversion de dependencias es cuando por constructor le paso la interfaz

```jsx
final class UserSearcher {
    private UsersRepository usersRepository;

    public UserSearcher(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public Optional<User> search(Integer id) {
        return usersRepository.search(id);
    }
}
```

```jsx
public interface UsersRepository {
    Optional<User> search(Integer id);
}
```

```jsx
final class UserSearcherShould {
    @Test
    void find_existing_users() {
        // Now we're injecting to the UserSearcher use case different implementation of the new UserRepository interface.
        // 👍 Win: We can replace the actual implementation of the UsersRepository used by the UserSearcher.
        // That is, we'll not have to modify a single line of the UserSearcher class despite of changing our whole infrastructure.
        // This is a big win in terms of being more tolerant to changes.
        // 👍 Win: It also make it easier for us to test the UserSearcher without using the actual implementation of the repository used in production.
        // This is another big win because this way we can have test such as the following ones which doesn't actually go to the database in order to retrieve the system users.
        // This has a huge impact in terms of the time to wait until all of our test suite is being executed (quicker feedback loop for developers 💪).
        // 👍 Win: We can reuse the test environment repository using test doubles. See CodelyTvStaffUsersRepository for its particularities
        UsersRepository codelyTvStaffUsersRepository = new CodelyTvStaffUsersRepository();
        UserSearcher userSearcher = new UserSearcher(codelyTvStaffUsersRepository);

        Optional<User> expectedUser = Optional.of(UserMother.rafa());

        assertEquals(expectedUser, userSearcher.search(UserMother.RAFA_ID));
    }

    @Test
    void not_find_non_existing_users() {
        // 👍 Win: Our test are far more readable because they doesn't have to deal with the internal implementation of the UserRepository.
        // The test is 100% focused on orchestrating the Arrange/Act/Assert or Given/When/Then flow.
        // More info: http://wiki.c2.com/?ArrangeActAssert and https://www.martinfowler.com/bliki/GivenWhenThen.html
        UsersRepository emptyUsersRepository = new EmptyUsersRepository();
        UserSearcher userSearcher = new UserSearcher(emptyUsersRepository);

        Integer nonExistingUserId = 1;
        Optional<User> expectedEmptyResult = Optional.empty();

        assertEquals(expectedEmptyResult, userSearcher.search(nonExistingUserId));
    }
}
```

## Apunte sobre switch

Si cambiamos if por switch y creemos que estamos refactorizando bien y que eso seria suficiente, pues esta mal.

El switch-case es un code smell, estaríamos violando el OCP puesto que si añadimos tipo de item nuevo, tedríamos que añadir un nuevo case con su comportamiento correspondiente

## Specification pattern

El ejemplo es: Tenemos una tabla y ueremos ordenar/filtrar por columnas.

Para no tener un repo con 200 parametros de entrada vamos a usar este patron.

La solucion es tener en nuestro dominio una clase Criteria.

Entonces el repo tiene un metodo que es searchByCriteria, al cual le pasamos el objeto Criteria.

La estructura de ejemplo puede ser esta.

Un objeto filtros.

El orden.

El limite por pagina.

Numero de pagina.

```php
final class Criteria
{
    private $filters;
    private $order;
    private $offset;
    private $limit;
    public function __construct(Filters $filters, ?Order $order, ?int $offset, ?int $limit)
    {
        $this->filters = $filters;
        $this->order   = $order;
        $this->offset  = $offset;
        $this->limit   = $limit;
    }
```

```php
final class Filter
{
    private $field;
    private $operator;
    private $value;
    public function __construct(FilterField $field, FilterOperator $operator, FilterValue $value)
    {
        $this->field    = $field;
        $this->operator = $operator;
        $this->value    = $value;
    }
```

El repo queda asi de limpio

```php
interface VideoRepository
{
    public function save(Video $video): void;
    public function search(VideoId $id): ?Video;
    public function searchByCriteria(Criteria $criteria): Videos;
}
```

## Composicion sobre herencia

La gran pelea siempre, cuando usar herencia y cuando inyectar.

La herencia se tiene que usar solo cuando sea indispensable.

Poner final por defecto, asi evitamos que se pueda extender de esa clase.