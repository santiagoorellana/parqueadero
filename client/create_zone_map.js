
const CIRCLE_RADIUS = 5;				// Esto determina el tamaño de los circulos que se representan.
const REAL_WIDTH = 1000;				// Ancho que deben tener todas la imagenes de zonas de arqueaderos.
const REAL_HEIGHT = 1060;				// Altura que deben tener todas la imagenes de zonas de arqueaderos.
const DISPLAY_REDUCTION_FACTOR = 0.5;				// Factor de reduccion de las imagenes al mostrarse en pantalla.
const parkingsList = [zone1, zone2, zone3, zone4];	// Las coordenadas de los parqueaderos en las zonas.


/**
 * Dibuja un circulo en una coordenada del canvas.
 * El circulo verde representa un parqueadero disponible, y oscuro ocupado.
 * @param {*} ctx - Canvas donde se debe dibujar.
 * @param {*} x - Coordenada X en pixeles del circulo en el canvas.
 * @param {*} y - Coordenada Y en pixeles del circulo en el canvas.
 * @param {*} color 
 */
function drawCircleParkingStatus(ctx, x, y, color){
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.strokeStyle = "#000000";
	ctx.arc(x, y, CIRCLE_RADIUS, 0, 2*Math.PI);
	ctx.stroke(); 
	ctx.fill();	
}


/**
 * Transforma un valor segun el factor de reduccion.
 * Se utiliza para ampliar o reducir las dimensiones de lo que se muestra en el cambas.
 * @param {*} value - Valor a transformar
 * @param {*} factor - Factor que se multiplica por el valor.
 * @returns - Valor transformado. Si el factor es menor que uno, el valor dismunuye.
 */
function transform(value, factor){
	return(Math.round(value * factor));
}


/**
 * Dibuja en el cambas una aimagen que corresponde al mapa de una zona de parqueaderos.
 * Los disponibles se muestran como un punto verde, de lo contrario, se muestran de color oscuro.
 * Las imagenes que cargan tienen que tener 1000 x 1060 pixeles de ancho y altura. 
 * @param {int} zone - Numero de la zona.
 * @param {list} listOfFreeParkings - Lista de json con los datos de parqueaderos disponibles.
 */
function draw_map_of_zone(zone, listOfRequestedParkings){
	let canvas = document.getElementById("map");
	let ctx = canvas.getContext("2d");
	ctx.font = "15px Arial";
	let img = new Image();
	img.src = "zone" + zone + ".jpg";
	img.onload = function(){
		console.log(transform(REAL_WIDTH, 0.5));
		ctx.drawImage(this, 0, 0, 
			transform(REAL_WIDTH, DISPLAY_REDUCTION_FACTOR), 
			transform(REAL_HEIGHT, DISPLAY_REDUCTION_FACTOR)
		);
		parkingsList[zone-1].forEach(item => {
			let color = '#333333';
			if (listOfRequestedParkings != null){
				listOfRequestedParkings.forEach(parking => {
				  if ((parking.id_zona == zone) && (parking.id_parqueadero == item.id_parqueadero)){
					color = (parking.estado == '0') ? "#00ff33" : "#0000cc";
				  }
				});
			}
			drawCircleParkingStatus(
				ctx, 
				transform(parseInt(item.x), DISPLAY_REDUCTION_FACTOR), 
				transform(parseInt(item.y), DISPLAY_REDUCTION_FACTOR),
				color
			);
		});
	}
}
