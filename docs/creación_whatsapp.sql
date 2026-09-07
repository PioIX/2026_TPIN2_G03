CREATE TABLE IF NOT EXISTS WhatsappUsuarios(
email varchar(255),
nombre varchar(255),
contrasena varchar(255),
foto_perfil varchar(255),
numero int,
primary key(email)

);
CREATE TABLE IF NOT EXISTS Grupos(
nombre varchar(255),
foto varchar(255),
id int unique auto_increment not null,
primary key(id)

);

CREATE TABLE IF NOT EXISTS UsuariosEnGrupo(
email varchar(255),
grupo_id int,
foreign key(grupo_id) references Grupos(id),
foreign key(email) references WhatsappUsuarios(email)
);

CREATE TABLE IF NOT EXISTS Mensajes(
grupo_id int,
email varchar(255),
contenido varchar(255),
id int unique auto_increment not null,
primary key(id),
foreign key(grupo_id) references Grupos(id),
foreign key(email) references WhatsappUsuarios(email)
);


INSERT INTO WhatsappUsuarios(email,nombre,contrasena,foto_perfil,numero) VALUES
("a@gmail.com","a","a","ej.png",111111111),
("b@gmail.com","b","b","ej.png",222222222);

INSERT INTO Grupos(nombre,foto) VALUES
("nombregrupo","aa.png");

INSERT INTO UsuariosEnGrupo(email,grupo_id) VALUES
("a@gmail.com",1);

INSERT INTO Mensajes(email,grupo_id,contenido) VALUES
("a@gmail.com",1,"hola soy un mensaje de ejemplo");