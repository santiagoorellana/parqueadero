
Aplicación web cliente
La aplicación cliente está implementada mediante HTML, CSS y JavaScript.
Conexión al servicio mediante API Restful y obtención de la respuesta como objeto JavaScript
La aplicación se conecta al servicio mediante un EndPoint Restful, utilizando la función fetch() que es nativa de JavaScript, con la cual se envía una petición http GET al servicio y se obtiene la respuesta. El dato que se envía es el texto transcrito del dictado realizado por el usuario y se envía como parámetro de la URL. Por ejemplo, la pregunta “Está disponible la zona 3” es enviada al servicio como parámetro de URL de la siguiente forma:
GET /parkings/request?text=Est%C3%A1%20disponible%20la%20zona%203.
La respuesta obtenida es un objeto de JavaScript (JSON) que contiene el texto de respuesta, que se debe sintetizar como voz humana y reproducir por el altavoz del móvil. El objeto de respuesta también contiene los datos de los parqueaderos disponibles, estructurados como un arreglo de objetos. En el siguiente ejemplo se pueden ver el texto devuelto por el servicio y el arreglo con los datos de los parqueaderos disponibles o localizados:
{
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
}



Representación visual de zonas de parqueaderos y los estados mediante canvas 
Para representar visualmente las zonas con los parqueaderos, se emplea el objeto canvas, que es nativo del lenguaje HTML, que permite dibujar imágenes y gráficos de forma rápida mediante el lenguaje JavaScript. Para ello el canvas brinda un método llamado drawImage() que permite cargar y mostrar una imagen en el canvas, mientras que el método arc() permite dibujar círculos.  Con ayuda de esos dos métodos, se cargan las imágenes de las zonas de los parqueaderos en el canvas y sobre estas se dibujan círculos que representan a los estados de los parqueaderos según el color. Cada posición de un parqueadero ocupado o de estado desconocido, se muestra con un círculo de color oscuro. Cuando el usuario realiza alguna pregunta y se le debe señalar algún parqueadero como respuesta, se muestra en verde si está disponible o en azul oscuro si el parqueadero está ocupado.
 
Por ejemplo, al preguntar por la disponibilidad de parqueaderos en la zona 3, la aplicación puede mostrar el resultado de la siguiente manera:
 
En la imagen se puede ver que hay tres parqueaderos disponibles, los cuales se están señalando en color verde. Nótese que el botón inferior correspondiente al parqueadero tres, también se ha mostrado en color verde para indicar que la zona correspondiente tiene disponibilidades.

Estructura de mapeo de coordenadas gráficas de parqueaderos
Los parqueaderos se representan en la pantalla en una posición específica encima de la imagen de la zona correspondiente. Para saber la coordenada en píxeles donde se debe representar cada parqueadero, se emplean una estructura de mapeo por cada zona, que relaciona cada parqueadero con un par de coordenadas gráficas. Cada estructura de datos de parqueaderos se crea y llena manualmente y se guarda en un fichero JavaScript. La estructura de mapeo es un arreglo de objetos:
const zone1 = [
	{'id_parqueadero':'1', 'x':509, 'y':73}, 
	{'id_parqueadero':'2', 'x':479, 'y':73}, 
	{'id_parqueadero':'3', 'x':448, 'y':73},
	…
]
Cada vez que la aplicación necesita representar el estado de un parqueadero, busca dentro de la estructura de mapeo de la zona correspondiente el identificador del parqueadero. SI encuentra el identificador, toma las coordenada X e Y almacenadas en la estructura y en esa posición del canvas dibuja el círculo que representa al estado del parqueadero.



<h1>Necesitas un código?</h1>
<H3>Si necesitas hacer un bot de trading con tu propia estrategia, hacer backtesting, analisis de datos de mercados, o necesitas acesoramiento sobre bots de trading y automatización en exchanges de criptomonedas... escríbeme!</H3>

Santiago Orellana <br>
Email: <a href="mailto: tecnochago@gmail.com?Subject=Quiero%20un%20bot%20de%20trading"> tecnochago@gmail.com</a><br>
Whatsapp: <a href="https://wa.me/5354635944?text=Quiero contratar tus servicios">+5354635944</a>


