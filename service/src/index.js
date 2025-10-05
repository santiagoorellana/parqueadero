const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const createPathern = require('./create_pathern.js');
const readNumber = require('./read_number.js');
const recogniceQuestionsPathern = require('./questions_recognition.js');
const questionsResponser = require('./questions_responser.js');
const Pool = require('pg').Pool;

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
 
// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
 
// La disponibilidad de los parqueaderos se consulta en la base de datos postgres 
// llamada "parqueos" y se encuentra en la tabla tambien llamada "parqueos".
const pool = new Pool({
  host: 'localhost',
  port: 5433,
  database: 'parqueos',
  user: 'postgres',
  password: 'admin'
});

// Este es el endpoint del API
app.get('/parkings/request', cors({ origin: '*' }), (request, response) => {    
  let pathern = createPathern(request.query.text);
  let number = readNumber(request.query.text);
  let question = recogniceQuestionsPathern(pathern);

  let query = "";
  let parameter = [];
  switch (question) {
    case "cm1": query = "SELECT * FROM parqueos WHERE estado=0"; break;
    case "cm2": query = "SELECT DISTINCT id_zona FROM parqueos WHERE estado=0"; break;
    case "cm3": query = ""; break;
    case "cm4":
      query = "SELECT * FROM parqueos WHERE id_parqueadero=$1";
      parameter.push(number);
      break;
    case "cm5":
      query = "SELECT * FROM parqueos WHERE estado=0 AND id_zona=$1";
      parameter.push(number);
      break;
    case "cm6":
      query = "SELECT * FROM parqueos WHERE id_parqueadero=$1";
      parameter.push(number);
      break;
    case "cm7": query = ""; break;
    case "cm8": query = ""; break;
    case "cm9": query = ""; break;
    default: query = ""; break;
  }

  pool.query(query, parameter, (error, results) => {
    if (error) {
      throw error;
      //{"text":"Server error"}
    }
    let responseJson = questionsResponser(question, number, results.rows);
    console.log(responseJson);
    response.status(200).json(responseJson);
  });
});


app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});
