
/**
 * Los simbolos son marcadores que sirven para reconocer una frase.
 * Se representan con palabras o conjuntos de palabras que expresan objeto, cualidad o una accion.
 * Ejemplo: la accion de parquear es un simbolo que se representa por las palabras "parquear", "estacionar".
 * En el presente codigo se definen algunos simbolos y las palabras que los representan.
 * Se establece una funcion para crear un cadena pathern de simbolos que represente a la cadena original.
 * En esta libreria, los simbolos se representan en el texto mediante una palabra en ingles.
 */

var natural = require('natural');

const SYMBOLS = {
    "status":[
        "disponible", "disponibilidad", "desocupado", "libre", "vacio", "asequible", "tomado", 
        "cogido", "ocupado", "tomado", "utilizado", "lleno", "llena", "espacio", "free" 
    ],
    "parking":[
        "parqueo", "parqueadero", "parquear", "aparcar", "aparcarse", "parque",
        "estacionamiento", "estacionar", "estacionarme", "aparcamiento",
        "aparcamento", "aparcadero", "lugar", "lugares", "parking"
    ],
    "zone":["zona", "zonas", "area", "areas"],
    "will":["necesito", "quiero", "puede", "puedo", "posible", "dame"],
    "reference":[
        "donde", "lugar", "pertenece", "esta", "encuentr", "encontre",  //palabra truncada: encuentra, ubica
        "ubico", "ubica", "indicame", "indica", "dime"
    ],  
    "repeat":["repite", "repita", "no entendi", "no entiendo", "repeat"],
    "hello":["Hola", "Buenos dias", "Buenas tardes", "Buen dia"],
    "help":[
        "Ayuda", "Necesito ayuda", "Que debo hacer", "Que hago", "Informacion", 
        "Info", "Que haces", "Ayudame", "Menu"
    ]
}

/**
 * Busca numeros y textos que representen a números.
 * @param {*} inputString - El texto de entrada donde se deben buscar numeros.
 * @returns - Devuelve 
 */
function detectNumbers(inputString){
    if (inputString == undefined) return false;
    try {
        const ordinals = ["primero", "segundo", "tercero", "cuarto", "quinto", "sexto", "séptimo", "octavo", "noveno", "décimo"];
        const numbers = ["uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "dies"];
        var tokenizer = new natural.WordTokenizer();
        let tokens = tokenizer.tokenize(inputString);

        const testToken = (token) => {
            if (token.search(/[0-9]+/) >= 0) return false;
            if (ordinals.indexOf(token) >= 0) return false;
            if (numbers.indexOf(token) >= 0) return false;
            return true;
        }

        return ! tokens.every(testToken);
    } catch (error) {
        return false;
    }
}

/**
 * Recibe una cadena de texto y devuelve los un pathern de symbolos que la representa.
 * @param {*} inputString - Cadena de texto con una instruccion del usuario.
 * @returns - Pathern de symbolos que representa a la cadena de entrada.
 */
module.exports = function(inputString) {
    let pathern = [];
    try {
        if (detectNumbers(inputString)) 
            pathern.push("number");
        const testSubString = (subString) => natural.LevenshteinDistanceSearch(subString, inputString).distance > 1;
        Object.keys(SYMBOLS).forEach(key => {
            if ( ! SYMBOLS[key].every(testSubString)) 
            pathern.push(key);
        });
    } catch (error) {
        console.log('Error en la funcion principal del módulo "create_pathern.js"')        
        console.log('No se pudo crear un patron para el string de entrada.')        
    }
    return pathern;
};



