var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
var cors = require('cors');
const MySQL = require('./modulos/mysql');

var app = express();
var port = process.env.PORT || 4000;
app.use(cors());


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get('/', function(req, res){
	res.status(200).send({
		message: `Hola`
	});
});


app.post('/', async function(req, res){
	try {
		console.log(req.body);
		existe = await MySQL.realizarQuery(`SELECT * FROM  WHERE ;`)
		if (existe.length===0){e
			await MySQL.realizarQuery(`INSERT INTO 
			VALUES ();`)

		}else{
			res.send({message: " ya existe"})
		};
	} catch (error) {
		console.log('Error:', error.message)
		res.status(500).send({
			message: "Error"
		});

	}
});


app.delete('/', async function(req, res){
	try {
		await MySQL.realizarQuery(`DELETE FROM  WHERE;`)
	} catch (error) {
		console.log('Error:', error.message)
		res.status(500).send({
			message: "Error"
		});
	}
});



app.put('/', async function(req, res){
try {
		let x=req.body.x
				if(x){
			await MySQL.realizarQuery(`UPDATE  SET 
			x = "" WHERE ;`)
		}
		
} catch (error) {
	console.log('Error:', error.message)
	res.status(500).send({
		message: "Error"
	});
}
});


app.listen(port, function(){
	console.log(`Server running in http://localhost:${port}`);
	console.log('Defined routes:');
	console.log('[GET] http://localhost:4000/');
});
