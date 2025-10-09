
<h1>Arquitectura básica del sistema</h1>

El sistema se diseñó dividido en tres partes: 
<p><b>Base de datos:</b> Almacena los datos de los parqueaderos y su estado (ocupado/libre). Esta base de datos es actualizada por otra aplicación independiente o por usuarios de forma manual.</p>
<p><b>Servicio:</b> Es un programa que se conecta directamente a la Base de Datos para obtener información sobre los parqueaderos. Implementa una API RESTFUL mediante la cual se le puede enviar textos (lenguaje natural en español) con preguntas sobre los parqueaderos y recibir la respuesta. Cuando recibe un texto, primero hace un Procesamiento de Lenguaje Natural (PNL) del texto para clasificar la pregunta y saber el tipo de respuesta que debe devolver. </p>
<p><b>Cliente:</b> Es una aplicación web para el navegador Chrome que captura el audio de la voz humana y lo convierten a texto para enviarlo al servicio. El texto de respuesta que recibe del servicio es sintetizado como voz humana y reproducida inmediatamente. Es el punto final desde donde el usuario puede interactuar con el sistema mediante comandos de voz flexibles para pedirle o preguntarle por parqueaderos. </p>
 

<h1>Aplicación Servidor</h1>
<p>Para la realización del servidor del sistema se decidió emplear Node JavaScript como lenguaje de programación y para el Procesamiento de Lenguaje Natural, se decidió utilizar la librería Natural que no es de pago (licencia MIT) y cuenta buena documentación online, lo cual facilita el proceso de desarrollo y acorta los tiempos. Para agregar la librería Natural a un proyecto Node, solo es necesario entrar mediante la consola de comando (en adelante CMD) al directorio del proyecto y teclear:</p>
<code>npm install natural</code>

<p>La documentación de la librería puede encontrarse en: https://naturalnode.github.io/natural/ 
Para la ejecución de la aplicación Cliente de prueba, se decidió utilizar el programa XAMPP que dispone de un servidor web bastante rápido y fácil de administrar y para ejecutar una web solo hay que ejecutar el XAMPP y colocar el fichero index.html del la web en el directorio: C:\xampp\htdocs <br>
Para ver la web en el navegador, solo necesita acceder a la dirección http://localhost/ </p>

<h2>Información que debe brindar la aplicación a los usuarios</h2>
El sistema se ha planificado para devolver la siguiente información:
1.	Disponibilidad de parqueaderos en cualquier zona 
2.	Zonas con parqueaderos disponible. 
3.	Disponibilidad de un parqueadero especifico 
4.	Disponibilidad de parqueaderos en una zona especifica 
5.	Zona a la que pertenece un parqueadero 
6.	Saludo al usuario y ofrece servicios
7.	Ofrecer menú de servicios

<h2>Selección del método de PLN a emplear</h2>
<p>Existen muchas frases que el usuario puede emplear para preguntar por las disponibilidades de parqueos, por lo que el reconocimiento de las preguntas no puede ser por comparación directa entre cadenas, ya que pueden aparecer variaciones en la sintaxis, palabras mal escritas, palabras innecesarias, adjetivos, pausas. </p>
<p>Teniendo en cuenta le necesidad de encontrar un equilibrio entre la complejidad computacional del algoritmo de clasificación, el tiempo de investigación-implementación, la importancia y la complejidad del problema a resolver, se pensó en utilizar como base alguno de los siguientes algoritmos que ya están implementados en la librearía Natural:</p>

A.	Clasificadores Probabilísticos (Naive Bayes y el de Regresión Logística)
B.	Distancia de Levenshtein para comparar
C.	Clasificación Heurística

<p>La librería Natural contiene implementaciones de la distancia de Levenshtein, y de clasificadores probabilísticos tiene el clasificador Naive Bayes y el de Regresión Logística. </p>
<p>La distancia de Levenshtein es un algoritmo útil para realizar comparaciones aproximadas donde hay faltas de ortografías, errores y cambios, pero utilizarlo con frases completas requeriría tener un conjunto de muestras de frases muy grande para abarcar todas las posibles formas de preguntar de los usuarios. Otro problema es que cuando se comparan palabras, las palabras con menos de 6 caracteres suelen confundirse cuando la distancia es mayor o igual a dos. Además, la distancia entre dos palabras puede ser corta, por ejemplo 1, y aún así ser palabras con un significado completamente diferente. </p>
<p>En cuanto a la utilización de los clasificadores Probabilísticos, se hicieron pruebas exploratorias con el clasificador Naive Bayes, utilizando como conjunto de entrenamiento frases seleccionadas y creadas por el autor, pero no se obtuvieron buenos resultados. Se repitieron las pruebas con el clasificador de Regresión Logística y tampoco se obtuvieron resultados satisfactorios. Lo que sucede es que los clasificadores probabilísticos suelen tener dificultades al clasificar patrones cuando una clase es un subconjunto de otra de las clases a clasificar. Solo hacen clasificaciones correctas cuando las clases son linealmente separables.</p>
<h2>El conjunto de frases creadas por el autor para los pedidos de cada uno de los tipos de información que brinda la aplicación son:</h2>

<p><b>Para saber la disponibilidad de parqueaderos en cualquier zona:</b>
Hay parqueaderos disponibles?, Donde hay parqueaderos?, Donde hay parqueaderos disponibles?, Necesito parquear, Necesito un parqueadero, Quiero parquear, Dame un parqueadero, Donde debo parquear?, Donde puedo parquear?, Dime donde parquear, Indicame donde parquear, No encuentro donde parquear, Parqueo</p>

<p><b>Para saber una lista de las zonas con parqueo disponible:</b>
Cuales son las zonas de parqueo disponibles?, Me dice cuales son las zonas de parqueo disponibles, Cuales zonas de parqueo hay disponible?, Cuales zonas de parqueo tienen disponibilidad?, Cuales zonas hay?, Cuales zonas son?, Cuantas son las zonas?, Cuantas zonas hay?, Cuantas zonas son?, Cuantas son las zonas?, Cuantas son las zonas de parqueo disponible?, Lista de las zonas disponibles, Lista de las zonas de parqueo, Dame una lista de las zonas, Dame una lista de las zonas de parqueo</p>

<p><b>Para saber la disponibilidad de un parqueadero especifico:</b>
Esta ocupado el parqueadero X?, Puedo ocupar el parqueadero X?, Se puede ir al parqueadero X?, Me puede dar el parqueadero X?, Necesito el parqueadero X, Quiero el parqueadero X, Quiero parquear en X, Necesito parquear en X, Quiero parquear en el parqueadero X, Necesito parquear en el parqueadero X</p>

<p><b>Para saber la disponibilidad de parqueaderos en una zona específica:</b>
Esta llena la zona X, Hay disponibilidad en la zona X, Hay espacio en la zona X, Hay posibilidad en la zona X, Es posible en la zona X, Puedo en la zona X, Dime si puedo en la zona X, Puedo ocupar la zona X, Se puede ir la zona X, Me puede dar la zona X, Necesito la zona X, Quiero la zona X, Quiero parquear en la zona X, Necesito parquear en la zona X</p>

<p><b>Para saber a que zona pertenece un parqueadero:</b>
A que zona pertenece el parqueadero X?, El parqueadero X donde esta?, El parqueadero X, de que zona es?, Donde esta el parqueadero X?, Donde se encuentra el parqueadero X?, Donde se ubica el parqueadero X?, informacion del parqueadero X, No encuentro el parqueadero X, De donde es el parqueadero X?, Donde encuentro el parqueadero X?, El parqueadero X</p>

<p><b>Para obtener alguna respuesta o saludo y saber si el sistema esta activo:</b>
Hola, Buenos dias, Buenas tardes, Buen dia</p>

<p><b>Para saber el menú de servicios:</b>
Ayuda, Necesito ayuda, Que debo hacer?, Que hago?, Informacion, Info, Que haces?, Ayudame, Menu</p>

<p>Aunque hay variedad en el conjunto de palabras existen patrones que no son linealmente separables y se interceptan. Además, es necesario que en los textos se pueda reconocer los números de los parqueaderos y zonas. 
Se decidió implementar un algoritmo de Clasificación Heurística, y la Distancia de Levenshtein se empleará para hacer al algoritmo flexible ante pequeños cambios en la escritura de las palabras.</p>

<h2>Clasificación Heurística utilizada en la aplicación</h2>
<p>Esencialmente, un proceso de clasificación consiste en escoger una categoría de un conjunto de soluciones previamente enumerado y asignársela al objeto de datos que se debe clasificar. La clasificación heurística realizada consiste en:</p>

<p><b>1 - Abstracción de los Datos:</b> Se busca una representación de los datos con menos detalles, pero más significativa, que constituya un patrón identificativo de los datos. Para ello, se han creado los llamados Symbols (Utilizamos palabras en inglés para que no se confundan con las palabras en español que se emplean para interactuar con la aplicación). Cada Symbol es una abstracción de un conjunto de palabras o frases que tienen un significado o sentido común entre ellas. Al obtener una frase del usuario, se busca dentro de la frase las coincidencias con las palabras de cada Symbol y cada vez que se encuentre una palabra de un Symbol específico, se agrega el Symbol al conjunto de salida, de manera tal que al terminar se obtiene un conjunto de uno, varios o ningún Symbol para representar a la frase. Ese conjunto de Symbols es el patrón que representa a la frase del usuario. Para el algoritmo de clasificación que tratamos, se definieron los Symbols que se representan a continuación. Téngase en cuenta que las palabras se han representado sin tildes y algunas están intencionalmente truncadas, lo cual se realiza para facilitar el proceso de comparación. Por ejemplo, las frases “necesito un parqueadero”, “dame un estacionamiento” y “quiero estacionar el carro” generarán el mismo conjunto patrón de salida (will, parking) que se ha conformado utilizando los Symbols siguientes:</p>

a.	status: Abstracción de las palabas disponible, disponibilidad, desocupado, libre, vacio, asequible, tomado, cogido, ocupado, tomado, utilizado, lleno, llena, espacio, free.
b.	parking: Abstracción de parqueo, parqueadero, parquear, aparcar, aparcarse, parque, estacionamiento, estacionar, estacionarme, aparcamiento, aparcamento, aparcadero, lugar, lugares, parking.
c.	zone: Abstracción de las zona, zonas, area, areas],
d.	will: Abstracción que representa la voluntad, intensión o necesidad del usuario. Las palabras son necesito, quiero, puede, puedo, posible, dame.
e.	reference: Abstracción que representa ubicación espacial o referenciación. Las palabras son donde, lugar, pertenece, esta, encuentr, encontre, ubico, ubica, indicame, indica, dime.
f.	hello: Hola, Buenos dias, Buenas tardes, Buen dia
g.	help: Representa palabras y fraces que denotan necesidad de ayuda u orientación. Abstrae las palabras Ayuda, Necesito ayuda, Que debo hacer, Que hago, Informacion, Info, Que haces, Ayudame, Menu.
h.	number: Representa a cualquier número o representación numérica que se encuentre en el texto. 

<p><b>2 - Asociación Heurística:</b> Se busca la mayor coincidencia entre el patrón abstraído y las posibles clases. Esta asociación es de naturaleza heurística y depende de conocimiento basado en la experiencia. Por ejemplo, para el conjunto patrón de salida (will, parking), el algoritmo determinará que pertenece a la clase: cm1 que significa que el usuario necesita un parqueo para su carro. </p>

Implementación del Clasificador de Heurístico
El Clasificador Heurístico está implementado en el Servicio que atiende las peticiones de las aplicaciones Cliente. El Servicio cuenta con un API RESTFUL conformado por un solo EndPoint (/parkings/request) que recibe el texto de las peticiones de los usuarios, que son enviadas desde la aplicación Cliente. Cada vez que se recibe el texto de una petición del usuario, se somete al siguiente algoritmo (expresado en pseudocódigo) que realiza la Abstracción de los Datos, para conformar el patron de Symbols que representan a la frase de petición:
 
Al final del algoritmo, se obtiene un patrón de Symbols (conjunto compuesto por uno o varios Symbols) que representa al texto de una petición del usuario. Los Symbols que componen un patrón, al ser un conjunto no tienen un orden de aparición definido, por lo que la información que aporta cada Symbol solo indica la presencia de la idea que representa en el texto. 
Para realizar la Asociación Heurística de los patrones de Symbols resultantes, se utiliza el algoritmo siguiente, expresado en pseudocódigo:
 
El algoritmo devuelve un código (cm1, cm2, cm4, cm5, cm6, cm7, cm8 o cm9) que representa a una pregunta específica y solo queda buscar la respuesta en la base de datos y devolvérsela a la aplicación Cliente del usuario.
Conformación de las respuestas del servidor
Por cada código de pregunta específica obtenido mediante la Asociación Heurística, se hace un acceso a la base de datos donde está la información de la disponibilidad de los parqueaderos. La base de datos está implementada utilizando Postgres SQL. Los campos de dato de la tabla primaria de los parqueaderos se pueden ver a continuación:
 

Las consultas sobre una tabla así son sencillas para cada tipo de petición de los usuarios:
 
Las clases restantes que no se muestran, son peticiones que no requieren acceso a la base de dato y cuyas respuestas están pre elaboradas (Mensaje de saludo, Menú del servicio). 
Al obtener los datos de respuesta de la Base de Datos, estos son insertados en textos pre elaborados y enviados a la aplicación Cliente. El texto es enviado como respuesta a la misma petición GET que se le realizó al servidor en el EndPoint (/parkings/request). 



<h1>Aplicación web cliente</h1>
La aplicación cliente está implementada mediante HTML, CSS y JavaScript.
<h2>Conexión al servicio mediante API Restful y obtención de la respuesta como objeto JavaScript</h2>
<p>La aplicación se conecta al servicio mediante un EndPoint Restful, utilizando la función fetch() que es nativa de JavaScript, con la cual se envía una petición http GET al servicio y se obtiene la respuesta. El dato que se envía es el texto transcrito del dictado realizado por el usuario y se envía como parámetro de la URL. Por ejemplo, la pregunta “Está disponible la zona 3” es enviada al servicio como parámetro de URL de la siguiente forma:</p>
<code>GET /parkings/request?text=Est%C3%A1%20disponible%20la%20zona%203</code>

<p>La respuesta obtenida es un objeto de JavaScript (JSON) que contiene el texto de respuesta, que se debe sintetizar como voz humana y reproducir por el altavoz del móvil. El objeto de respuesta también contiene los datos de los parqueaderos disponibles, estructurados como un arreglo de objetos. En el siguiente ejemplo se pueden ver el texto devuelto por el servicio y el arreglo con los datos de los parqueaderos disponibles o localizados:</p>
<code>{
    "text": "En la zona 3 están disponibles: el parqueadero 13, parqueadero 15, parqueadero 23",
    "data": [
        {
            "id_parqueadero": 13,
            "id_zona": 3,
            "numero": 13,
            "estado": 0
        },
        {
            "id_parqueadero": 15,
            "id_zona": 3,
            "numero": 15,
            "estado": 0
        },
        {
            "id_parqueadero": 23,
            "id_zona": 3,
            "numero": 23,
            "estado": 0
        }
    ]
}</code>
<br>
<h2>Representación visual de zonas de parqueaderos y los estados mediante canvas</h2>
<p>Para representar visualmente las zonas con los parqueaderos, se emplea el objeto canvas, que es nativo del lenguaje HTML, que permite dibujar imágenes y gráficos de forma rápida mediante el lenguaje JavaScript. Para ello el canvas brinda un método llamado drawImage() que permite cargar y mostrar una imagen en el canvas, mientras que el método arc() permite dibujar círculos.  Con ayuda de esos dos métodos, se cargan las imágenes de las zonas de los parqueaderos en el canvas y sobre estas se dibujan círculos que representan a los estados de los parqueaderos según el color. Cada posición de un parqueadero ocupado o de estado desconocido, se muestra con un círculo de color oscuro. Cuando el usuario realiza alguna pregunta y se le debe señalar algún parqueadero como respuesta, se muestra en verde si está disponible o en azul oscuro si el parqueadero está ocupado.</p>
<img width="203" height="117" alt="estados" src="https://github.com/user-attachments/assets/aa3dc379-1be3-4db1-a21b-f26ac1d6b580" />

<p>Por ejemplo, al preguntar por la disponibilidad de parqueaderos en la zona 3, la aplicación puede mostrar el resultado de la siguiente manera:</p>
<img width="420" height="530" alt="ejemplo" src="https://github.com/user-attachments/assets/aa82c21f-3367-4cd2-93fb-edf5944dba53" />

<p>En la imagen se puede ver que hay tres parqueaderos disponibles, los cuales se están señalando en color verde. Nótese que el botón inferior correspondiente al parqueadero tres, también se ha mostrado en color verde para indicar que la zona correspondiente tiene disponibilidades.</p>

<h2>Estructura de mapeo de coordenadas gráficas de parqueaderos</h2>
<p>Los parqueaderos se representan en la pantalla en una posición específica encima de la imagen de la zona correspondiente. Para saber la coordenada en píxeles donde se debe representar cada parqueadero, se emplean una estructura de mapeo por cada zona, que relaciona cada parqueadero con un par de coordenadas gráficas. Cada estructura de datos de parqueaderos se crea y llena manualmente y se guarda en un fichero JavaScript. La estructura de mapeo es un arreglo de objetos:</p>
<code>const zone1 = [
	{'id_parqueadero':'1', 'x':509, 'y':73}, 
	{'id_parqueadero':'2', 'x':479, 'y':73}, 
	{'id_parqueadero':'3', 'x':448, 'y':73},
	…
]</code>
<p>Cada vez que la aplicación necesita representar el estado de un parqueadero, busca dentro de la estructura de mapeo de la zona correspondiente el identificador del parqueadero. SI encuentra el identificador, toma las coordenada X e Y almacenadas en la estructura y en esa posición del canvas dibuja el círculo que representa al estado del parqueadero.</p>



<h1>Necesitas un código?</h1>
<H3>Si necesitas hacer una aplicación similar a esta o tienes una idea mejor para probar... escríbeme!</H3>

Santiago Orellana <br>
Email: <a href="mailto: tecnochago@gmail.com?Subject=Quiero%20un%20bot%20de%20trading"> tecnochago@gmail.com</a><br>
Whatsapp: <a href="https://wa.me/5354635944?text=Quiero contratar tus servicios">+5354635944</a>








