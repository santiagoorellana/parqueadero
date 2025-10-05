<<<<<<<<<  Informaciones útiles >>>>>>>>>>

Antes de ejecutar el server, debe existir una base de datos 'postgres' que contenga 
la tabla "parqueos" y las siguientes caracteristicas...

port: 5433,
database: 'parqueos',
user: 'postgres',
password: 'admin'

Si se esta ejecutando en un ambiente de pruebas y desarrollo, puede crear la 
base de datos y la tabla mediante el fichero "parqueos.sql" que contiene el dump 
de la tabla llamada "parqueos" donde se encuentran los datos 
de la disponibilidad de los parqueaderos. 

En un entorno de trabajo real, esos datos de disponibilidad son actualizados por 
otra aplicacion independiente que tambien tiene acceso a la tabla "parqueos".


Para ejecutar el server con el nodemon:

1 - Debe entrar en el CMD hasta el directorio "service" del proyecto.
2 - Una vez en el directorio del proyecto, debes descargar las dependencias con el comando:  

    npm install
    
3 - Ejecuta el comando:

    node src/index.js

Ahora el endpoint del server estara disponible en:

    https://localhost:3000/parkings/request

Si se consulta con navegador la URL:

https://localhost:3000/parkings/request?text=parqueo

Deberá devolverle un texto sugiriendo un parqueo.

El servidor está preparado para devolver la siguiente información:

 - Disponibilidad de parqueaderos en cualquier zona 
 - Lista de las zonas con parqueo disponible. 
 - Disponibilidad de un parqueadero especifico 
 - Disponibilidad de parqueaderos en una zona especifica 
 - Zona a la que pertenece un parqueadero 
 - Saluda al usuario y ofrece servicios
 - Menu de servicios
 

Algunas URL utilizadas para resolver dudas sobre la codificación:

https://juanda.gitbooks.io/webapps/content/api/creacion_de_una_api_con_nodejs.html
https://bravedeveloper.com/2021/03/22/crear-un-api-rest-con-nodejs-y-express-nunca-fue-tan-provechoso-y-sencillo/
https://lenguajejs.com/javascript/peticiones-http/cors/
https://lenguajejs.com/javascript/peticiones-http/fetch/
https://www.freecodecamp.org/espanol/news/tutorial-de-fetch-api-en-javascript-con-ejemplos-de-js-fetch-post-y-header/
https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/
https://apuntes.de/nodejs-desarrollo-web/importar-y-exportar-modulos/#gsc.tab=0
https://expressjs.com/en/resources/middleware/cors.html
https://levelup.gitconnected.com/combining-api-calls-with-javascript-try-catch-ba1b7b9303a5
https://es.stackoverflow.com/questions/300740/exportar-e-importar-clases-en-node-js
https://tutz.tv/javascript/every
https://ed.team/blog/como-usar-bases-de-datos-postgres-con-nodejs
https://onestepcode.com/postgres-nodejs-tutorial/
https://node-postgres.com/apis/client

https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/
https://blog.logrocket.com/build-rest-api-node-express-mysql/



Algunas fraces que se deberian probar en el sistema para ver si responde correctamente:

const COMMANDS = {
    "cm1":{  // [(will / reference)], parking
        "info":"Devuelve la disponibilidad de parqueaderos en cualquier zona",
        "trainingDocuments":[
            "Hay parqueaderos disponibles",
            "Donde hay parqueaderos",
            "Donde hay parqueaderos disponibles",
            "Necesito parquear",
            "Necesito un parqueadero",
            "Quiero parquear",
            "Dame un parqueadero",
            "Donde debo parquear",
            "Donde puedo parquear",
            "Dime donde parquear",
            "Indicame donde parquear",
            "No encuentro donde parquear",
            "Parqueo"
        ]
    },
    "cm2":{ // [mention], zone, status
        "info":"Lista de las zonas con parqueo disponible",
        "trainingDocuments":[
            "Cuales son las zonas de parqueo disponibles",
            "Me dice cuales son las zonas de parqueo disponibles",
            "Cuales zonas de parqueo hay disponible",
            "Cuales zonas de parqueo tienen disponibilidad",
            "Cuales zonas hay",
            "Cuales zonas son",
            "Cuantas son las zonas",
            "Cuantas zonas hay",
            "Cuantas zonas son",
            "Cuantas son las zonas",
            "Cuantas son las zonas de parqueo disponible",
            "Lista de las zonas disponibles",
            "Lista de las zonas de parqueo",
            "Dame una lista de las zonas",
            "Dame una lista de las zonas de parqueo"
        ]
    },
    "cm3":{  // repeat
        "info":"Repite la ultima informacion dada",
        "trainingDocuments":[
            "Repita por favor",
            "Repite",
            "Repita",
            "No entendi",
            "No entiendo",
            "Que dijo?",
        ]
    },
    "cm4":{  // will, parking, number
        "info":"Devuelve la disponibilidad de un parqueadero especifico",
        "trainingDocuments":[
            "Esta ocupado el parqueadero 000",
            "Puedo ocupar el parqueadero 000",
            "Se puede ir al parqueadero 000",
            "Me puede dar el parqueadero 000",
            "Necesito el parqueadero 000",
            "Quiero el parqueadero 000",
            "Quiero parquear en 000",
            "Necesito parquear en 000",
            "Quiero parquear en el parqueadero 000",
            "Necesito parquear en el parqueadero 000"
        ]
    },
    "cm5":{ // (will / status), zone, number
        "info":"Devuelve la disponibilidad de parqueaderos en una zona especifica",
        "trainingDocuments":[
            "Esta llena la zona 000",
            "Hay disponibilidad en la zona 000",
            "Hay espacio en la zona 000",
            "Hay posibilidad en la zona 000",
            "Es posible en la zona 000",
            "Puedo en la zona 000",
            "Dime si puedo en la zona 000",
            "Puedo ocupar la zona 000",
            "Se puede ir la zona 000",
            "Me puede dar la zona 000",
            "Necesito la zona 000",
            "Quiero la zona 000",
            "Quiero parquear en la zona 000",
            "Necesito parquear en la zona 000"
        ]
    },
    "cm6":{ // reference, parking, zone, number
        "info":"Devuelve la zona a la que pertenece un parqueadero",
        "trainingDocuments":[
            "A que zona pertenece el parqueadero 000",
            "El parqueadero 000 donde esta",
            "El parqueadero 000, de que zona es",
            "Donde esta el parqueadero 000",
            "Donde se encuentra el parqueadero 000",
            "Donde se ubica el parqueadero 000",
            "informacion del parqueadero 000",
            "No encuentro el parqueadero 000",
            "De donde es el parqueadero 000",
            "Donde encuentro el parqueadero 000",
            "El parqueadero 000"
        ]
    },
    "cm7":{   //hello
        "info":"Saluda al usuario y ofrece menu de servicios",
        "trainingDocuments":[
            "Hola",
            "Buenos dias",
            "Buenas tardes",
            "Buen dia"
        ]
    },
    "cm8":{ // help
        "info":"Devuelve el menu de servicios",
        "trainingDocuments":[
            "Ayuda",
            "Necesito ayuda",
            "Que debo hacer",
            "Que hago",
            "Informacion",
            "Info",
            "Que haces",
            "Ayudame",
            "Menu"
        ]
    },
}


// Bueno, dame un parqueadero en la zona 3.