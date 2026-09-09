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

app.get('/Usuarios', async function(req, res){
	try {
		let email=req.query.email
		let nombre=req.query.nombre
		let numero=req.query.numero
		if(email){
			resp= await MySQL.realizarQuery(`SELECT * FROM WhatsappUsuarios WHERE email="${email}";`)
		}else if(nombre){
			resp= await MySQL.realizarQuery(`SELECT * FROM WhatsappUsuarios WHERE nombre="${nombre}";`)
		}else if(numero){
			resp= await MySQL.realizarQuery(`SELECT * FROM WhatsappUsuarios WHERE numero=${numero};`)
		}else{

			resp= await MySQL.realizarQuery(`SELECT * FROM WhatsappUsuarios;`)
		}
		res.status(200).send({
			message: resp
		});
	} catch (error) {
		res.status(500).send({
			message: "error"
		})
	}
});

app.get('/UsuariosEnGrupo', async function(req, res){
	try {
		let grupo_id=req.query.grupo_id
		let email=req.query.email
		if (grupo_id){
			resp= await MySQL.realizarQuery(`SELECT * FROM UsuariosEnGrupo WHERE grupo_id=${grupo_id};`)
		}else if(email){
			resp= await MySQL.realizarQuery(`SELECT * FROM UsuariosEnGrupo WHERE email="${email}";`)
		}else{

			resp= await MySQL.realizarQuery(`SELECT * FROM UsuariosEnGrupo;`)
		}
		res.status(200).send({
			message: resp
		});
	} catch (error) {
		res.status(500).send({
			message: "error"
		})
	}
});

app.get('/Mensajes', async function(req, res){
	try {
		let email=req.query.email
		let id=req.query.id
		let grupo_id=req.query.grupo_id
		let cont=req.query.contenido
		if(email){
			resp= await MySQL.realizarQuery(`SELECT * FROM Mensajes WHERE email="${email}";`)
		}else if (id){
			resp= await MySQL.realizarQuery(`SELECT * FROM Mensajes WHERE id=${id};`)

		}else if(grupo_id){
			resp= await MySQL.realizarQuery(`SELECT * FROM Mensajes WHERE grupo_id="${grupo_id}";`)
		}else if(cont){

			resp= await MySQL.realizarQuery(`SELECT * FROM Mensajes WHERE contenido LIKE "@${cont}@";`)
		}
		else{

			resp= await MySQL.realizarQuery(`SELECT * FROM Mensajes;`)

		}
		res.status(200).send({
			message: resp
		});
	} catch (error) {
		res.status(500).send({
			message: "error"
		})
	}
});


app.get('/Grupos', async function(req, res){
	try {
		let id=req.query.id
		let nombre=req.query.nombre
		if(id){
			resp= await MySQL.realizarQuery(`SELECT * FROM Grupos WHERE id=${id};`)
		}else if(nombre){
			resp= await MySQL.realizarQuery(`SELECT * FROM Grupos WHERE nombre="${nombre}";`)
		}else{

			resp= await MySQL.realizarQuery(`SELECT * FROM Grupos;`)

		}
		res.status(200).send({
			message: resp
		});
	} catch (error) {
		res.status(500).send({
			message: "error"
		})
	}
});


app.post('/Registro', async function(req, res){
		try {
			console.log(req.body);
			let existe = await MySQL.realizarQuery(`SELECT * FROM WhatsappUsuarios WHERE email = "${req.body.email}";`)
			if (existe.length===0){e
				await MySQL.realizarQuery(`INSERT INTO WhatsappUsuarios(email,nombre,numero,contrasena,foto_perfil)
				VALUES ("${req.body.email}","${req.body.nombre}",${req.body.numero},"${req.body.contrasena}","${req.body.foto_perfil}");`)
	
			}else{
				res.send({message: "Usuario ya existe"})
			};
		} catch (error) {
			console.log('Error:', error.message)
			res.status(500).send({
				message: "Error al crear usuario"
			});

	}


});

app.post('/Grupo', async function(req, res){
		try {
			console.log(req.body);
			await MySQL.realizarQuery(`INSERT INTO Grupos(nombre,foto)
			VALUES ("${req.body.nombre}","${req.body.foto}");`)
	
			
		} catch (error) {
			console.log('Error:', error.message)
			res.status(500).send({
				message: "Error al crear el grupo"
			});

	}


});


app.post('/Mensaje', async function(req, res){
		try {
			console.log(req.body);
			await MySQL.realizarQuery(`INSERT INTO Mensajes(contenido,email,grupo_id)
			VALUES ("${req.body.contenido}","${req.body.email}"),${req.body.grupo_id};`)
	
			
		} catch (error) {
			console.log('Error:', error.message)
			res.status(500).send({
				message: "Error al guardar el mensaje"
			});

	}


});


app.post('/UnirAlGrupo', async function(req, res){
		try {
			console.log(req.body);
			let existe = await MySQL.realizarQuery(`SELECT * FROM UsuariosEnGrupo WHERE email = "${req.body.email}" AND grupo_id=${req.body.grupo_id};`)
			if (existe.length===0){e
				await MySQL.realizarQuery(`INSERT INTO UsuariosEnGrupo(email,grupo_id)
				VALUES ("${req.body.email}",${req.body.grupo_id});`)
	
			}else{
				res.send({message: "Usuario ya está en el grupo"})
			};
		} catch (error) {
			console.log('Error:', error.message)
			res.status(500).send({
				message: "Error al añadir el usuario al grupo"
			});

	}


});

app.delete('/Grupo', async function(req, res){
	try {
		await MySQL.realizarQuery(`DELETE FROM Grupos WHERE id=${req.body.grupo_id};`)
	} catch (error) {
		console.log('Error:', error.message)
		res.status(500).send({
			message: "Error"
		});
	}
});

app.delete('/Usuario', async function(req, res){
	try {
		await MySQL.realizarQuery(`DELETE FROM WhatsappUsuarios WHERE email="${req.body.email}";`)
	} catch (error) {
		console.log('Error:', error.message)
		res.status(500).send({
			message: "Error"
		});
	}
});

app.delete('/Mensaje', async function(req, res){
	try {
		await MySQL.realizarQuery(`DELETE FROM Mensajes WHERE id=${req.body.id};`)
	} catch (error) {
		console.log('Error:', error.message)
		res.status(500).send({
			message: "Error"
		});
	}
});



app.delete('/UsuarioDeGrupo', async function(req, res){
	try {
		await MySQL.realizarQuery(`DELETE FROM UsuariosEnGrupo WHERE email="${req.body.email}" AND grupo_id=${req.body.grupo_id};`)
	} catch (error) {
		console.log('Error:', error.message)
		res.status(500).send({
			message: "Error"
		});
	}
});

app.put('/Usuario', async function(req, res){
try {
		let nombre=req.body.nombre
		let numero=req.body.numero
		let contrasena=req.body.contrasena
		let foto_perfil=req.body.foto_perfil
		let email=req.body.email
		if(nombre){
			await MySQL.realizarQuery(`UPDATE Usuarios SET nombre = "${nombre}" WHERE email="${email}";`)
		}
		if(numero){
			await MySQL.realizarQuery(`UPDATE Usuarios SET numero = ${numero} WHERE email="${email}";`)
		}
		if(contrasena){
			await MySQL.realizarQuery(`UPDATE Usuarios SET contrasena = "${contrasena}" WHERE email="${email}";`)
		}
		if(foto_perfil){
			await MySQL.realizarQuery(`UPDATE Usuarios SET foto_perfil = "${foto_perfil}" WHERE email="${email}";`)
		}
} catch (error) {
	console.log('Error:', error.message)
	res.status(500).send({
		message: "Error"
	});
}
});

app.put('/Grupo', async function(req, res){
try {
		let nombre=req.body.nombre
		let foto=req.body.foto
		let id=req.body.id
		if(nombre){
			await MySQL.realizarQuery(`UPDATE Grupos SET nombre = "${nombre}" WHERE id=${id};`)
		}
		if(foto){
			await MySQL.realizarQuery(`UPDATE Grupos SET foto = "${foto}" WHERE id=${id};`)
		}
		
} catch (error) {
	console.log('Error:', error.message)
	res.status(500).send({
		message: "Error"
	});
}
});

//falta put de los mensajes y posiblemente poder buscar chats por LIKE

app.listen(port, function(){
	console.log(`Server running in http://localhost:${port}`);
	console.log('Defined routes:');
	console.log('[GET] http://localhost:4000/');
});
