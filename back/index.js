var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
var cors = require('cors');
const session = require("express-session");
const MySQL = require('./modulos/mysql');
const app = express();
const PORT = process.env.PORT || 4000;
const { Server } = require("socket.io");


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/*SOCKET*/ 
const sessionMiddleware = session({
  secret: "supersarasa",
  resave: false,
  saveUninitialized: false,
});
app.use(sessionMiddleware);
const server = app.listen(PORT, () => {
  console.log(`Servidor NodeJS corriendo en http://localhost:${PORT}/`);
});

const io = new Server(server, {
  cors: {
	origin: ["http://localhost:3000", "http://localhost:3001"],
	methods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true,
	path: "/api/socketio",
	addTrailingSlash: false,
  },
});


io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});


io.on("connection", (socket) => {
	console.log('connection')
  const req = socket.request;

  socket.on("joinRoom", (data) => {
	if (req.session.room != undefined && req.session.room.length > 0) {
	  socket.leave(req.session.room);
	}
	req.session.room = data.room;
	socket.join(req.session.room);

	io.to(req.session.room).emit("chat-messages", {
	  user: req.session.user,
	  room: req.session.room,
	});
  });

  socket.on("pingAll", (data) => {
	console.log("PING ALL:", data);
	io.emit("pingAll", { event: "Ping to all", message: data });
  });

  socket.on("sendMessage", (data) => {
	console.log("Message recieved")
	io.to(req.session.room).emit("newMessage", {
	  room: req.session.room,
	  message: data.message,
	});
  });


  socket.on("disconnect", () => {
	console.log("Disconnect");
  });
});




/*MYSQL*/ 




app.get('/', function(req, res){
	res.status(200).send({
		message: `Hola`
	});
});


app.get('/proxid', async function(req, res){
	try {
		let tabla = req.query.tabla
		if(tabla){
			await connection.query(`ANALYZE TABLE '2026_5INF_G03'.${tabla}`);
			await MySQL.realizarQuery('SET information_schema_stats_expiry = 0;')
			let resp= await MySQL.realizarQuery(`SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = '2026_5INF_G03' AND TABLE_NAME = '${tabla}';`)
			console.log(resp)
			  res.status(200).send({
				  message: resp[0]
			  });
		}
	} catch (error) {
		res.status(500).send({
			message: "error"
		})
	}
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
			if (existe.length===0){
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
			const result =await MySQL.realizarQuery(`INSERT INTO Grupos(nombre,foto)
			VALUES ("${req.body.nombre}","${req.body.foto}");`)
			const newID = result.insertId
			console.log(newID);
			res.send({message: newID});
			
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
			VALUES ("${req.body.contenido}","${req.body.email}",${req.body.grupo_id});`)
	
			
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
			if (existe.length===0){
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


app.put('/Mensaje', async function(req, res){
try {
		let contenido=req.body.contenido
		let id=req.body.id
		if(contenido){
			await MySQL.realizarQuery(`UPDATE Mensajes SET contenido = "${contenido}" WHERE id=${id};`)
		}
				
		
} catch (error) {
	console.log('Error:', error.message)
	res.status(500).send({
		message: "Error"
	});
}
});
