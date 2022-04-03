---
title: "Arquitectura Hexagonal"
date: "2020-01-01"
tag: "programacion"
---

# Arquitectura hexagonal

## Principales beneficios

- Mantenibilidad
- Cambiabilidad
- Testing

## Que es la arquitectura hexagonal

![Untitled](../images/posts/Arquitectura_Hexagonal/Untitled.jpeg)

Las arquitecturas limpias definen una serie de capas en nuestra aplicación.

Define una regla de dependencia entre ellas.

La regla de dependendencia nos dice que la capa mas externa solo puede conocer a la mas cercana.

> En el momento en el que lo de dentro no conoce lo de fuera, nosotros podemos cambiar lo de fuera sin alterar lo de dentro.
Esta es la gran ventaja, podemos cambiar la BD sin tener que modificar los casos de usos o las entidades.
> 

## Capas

- Dominio
Conceptos que estan en nuestro contexto.
Reglas de negocio.
- Aplicacion
Es la capa donde viven los casos de uso de nuestra aplicacion
- Intraestructura
Es la capa donde se implementaran las interfaces que haran uso de dependencias externas
*Ej: Capa que tiene definidas las interfaces de obtener datos de la base de datos*

Orden:

Infraestructura → Aplicacion → Dominio

## Test

- Unitario
Testea la logica de nuestro dominio
- Test de integracion
Testea los servicios externos
- Test de aceptacion
Testea todo el flujo

## Puertos y adaptadores

- Puertos
Interfaces definidas en dominio para desacoplarnos de nuestra infraestructura
Ej: UserRepository
- Adaptadores
Implementaciones de estos puertos
Ej: MYSQLUserRepo

> Esto no me queda muy claro porque no veo como lo he aplicacado en Designable
> 

![Untitled](../images/posts/Arquitectura_Hexagonal/Untitled.png)

## Patron repository

![Untitled](../images/posts/Arquitectura_Hexagonal/Untitled%201.png)

El patron repository es la idea de crear interfaces, para que la accion este desacoplada a la implementacion del repositorio.

En este caso lo que se esta haciendo es crear una interfaz de dominio llamada VideoRepo.

Que contiene los metodos necesarios para que la accion de dominio se resuelva.

Despues en el caso este que usamos MYSQL, tenemos una clase que implementa los metodos del repo.

Por ultimo tenemos la accion de dominio que hace uso del VideoRepo (sin saber que es de MYSQL, esto es importante) y hace la accion que negocio a requerido.

```jsx
interface VideoRepository
{
    save(Video video): void;
    search(VideoId id): Video | null;
}
```

```jsx
class VideoFinder
{
    private repository: VideoRepository;

    constructor(VideoRepository repository) // ℹ️ Nos acoplamos al contrato de dominio, no a la implementación concreta.
    {
			this.repository = repository
    }

    public function run(VideoId id): Video | null
    {
        return this.repository.search(id);
    }
}
```

```jsx
class VideoRepositoryMySql implements VideoRepository
{
    private $entityManager;

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function save(Video $video): void
    {
        $this->entityManager()->persist($entity);
        $this->entityManager()->flush($entity);
    }

    public function search(VideoId $id): ?Video
    {
        return $this->repository(Video::class)->find($id);
    }
}
```

## Las acciones reciben primitivas

LAs acciones de dominio deberian recibir primitivas ya que esto mejora la testeabilidad y mejora lorganizacion de proyecto.

Ej: Si tenemos una rest api, tiene sentido que el constructor transforme los datos http a primitivas, se los pase por constructor a la accion y asi tenemos un controlador limpio.

ASi tenemos un constructor limpio que no se tiene que preocupar por errores de dominio ya que no esta construyendo el objeto de dominio ya se encargara la accion de construirlo y gestionar los errores que ocurran dentro de ella.

## Servicios de infraestructura

La idea es la misma que la del patron repository.

Desacoplado la implementacion de la accion.

![Untitled](../images/posts/Arquitectura_Hexagonal/Untitled%202.png)

### Apunte interesante sobre el ejemplo de email y slack

![Untitled](../images/posts/Arquitectura_Hexagonal/Untitled%203.png)

Cuando inicializo la clase slack, el constructor me tiene que pedir el parametro chanell.

Controlador

```php
class NotifyController{

	notify(){
		const slackNotify = new SlackNotify('chanel1');
		const notify = new NotificationSender(slackNotify)
		notify.run(...)
}
```

## Servicios de aplicacion vs. servicios de dominio

- Servicios de dominio
Representan una agrupacion de logica de negacio que podremos reutilizar desde multiples servicios de aplicacion

Ejemplo largo

![Untitled](../images/posts/Arquitectura_Hexagonal/Untitled%204.png)

- Servicio de aplicacion
El servicio de aplicacion recibe por constructor el colaborador, para evitar acoples lo hace a traves de una interfaz de dominio

### No abusar de los servicios de dominio

![Untitled](../images/posts/Arquitectura_Hexagonal/Untitled%205.png)

## Modelando nuestro dominio

- Patron value object

Tener nuestros propios tipos nos ayuda a que el codigo sea mas legible.

Evita hacer comprobaciones redundantes.

Nos permite meter logica.

> Ej: No podemos permitir que una url no tenga un formato concreto, por lo tango creamos el VO de url y creamos un metodo que sea validateUrl que cada vez que construimos ese objeto nos validara si la url tiene el formato que queremos.
> 

## Testing

La leccion mas importante sobre el testing es que hay que crear Servicios/Repositorios de tipo mock (que extiendan de la interfaz pero que no la rellenen) y testear que se ha llamado al repo o servicio con los parametros correctos.

Esto se hace porque sera la capa de infraestructura la que se encargue de testear esto.

Asi de esta forma nos quitamos un trabajo de encima que es implementar servicios/repositorios mock que no sirve de nada.

Tipos de tests:

- Test de aceptacion
Los e2e vamos, aquellos que recorren todo el flujo
- Test unitarios
- Test de integracion

### Test de integracion

Esto tiene dolor porque en el caso de test de integracion con BBDD hay que levantarla en real.

Levantarla, añadir las tablas, borrarlas.

Y si esto no se hace bien puede ralentizar mucho la ejecucion de tests.