-- Inserts USUARIOS
INSERT INTO usuarios (usuario, clave, nombre, apel1, apel2, f_nac, bio)
			  VALUES ('gamiluu','123','Gabriel','Milagro','López','2002-05-19','Hola me justa la nintendos y el skate.');
INSERT INTO usuarios (usuario, clave, nombre, apel1, apel2, f_nac, bio)
			  VALUES ('charly','123','Carlos','Fernández','Guevara','2002-05-16','Gym y Star Wars.');
INSERT INTO usuarios (usuario, clave, nombre, apel1, apel2, f_nac, bio)
			  VALUES ('gigantosaurio','123','Jorge','Alquezar','','2002-05-16','Me gusta el ARK y el furbo.');
INSERT INTO usuarios (usuario, clave, nombre, apel1, apel2, f_nac, bio)
			  VALUES ('carver','123','Noe','','','2002-05-16','Rulando con la motico.');
SELECT * FROM usuarios;
SELECT id_usuario, CONCAT(nombre,' ',apel1,' ',apel2) AS nombre_completo, usuario FROM usuarios WHERE CONCAT(nombre,' ',apel1,' ',apel2) LIKE '%a%' OR usuario LIKE '%a%';
SELECT id_usuario FROM usuarios WHERE usuario='carver';
SELECT * FROM usuarios WHERE id_usuario=1;
-- http://127.0.0.1:8000/usuarios/add/[israelito]&[123]&[Israel]&[Colta]&[Bujalance]&[2003-04-15]&[Estudio%20en%20San%20Valero%20y%20trabajo%20en%20Deloitte]



-- Inserts EVENTOS
INSERT INTO eventos (id_usuario, titulo, fecha, hora, descripcion, edad_min, edad_max, ubicacion, participantes)
			 VALUES (1,'Ruta Panticosa','2024-06-03','08:00','Nos vamos pa panticosa, vente o k.',18,35,'Panticosa',0);
INSERT INTO eventos (id_usuario, titulo, fecha, hora, descripcion, edad_min, edad_max, ubicacion, participantes)
			 VALUES (1,'Torneo MK11','2024-06-03','08:00','Unas partidicas de chill al MK.',18,100,'CiberZGZ',20);
INSERT INTO eventos (id_usuario, titulo, fecha, hora, descripcion, edad_min, edad_max, ubicacion, participantes)
			 VALUES (2,'Quedad Parkour','2024-06-03','08:00','A dar salticos por ahi.',18,25,'Parque Delicias',30);
INSERT INTO eventos (id_usuario, titulo, fecha, hora, descripcion, edad_min, edad_max, ubicacion, participantes)
			 VALUES (3,'Furbo','2024-06-03','08:00','Amos a echar unas pachangas en Santa Inés.',18,35,'Polideportivo Santa Inés',20);
INSERT INTO eventos (id_usuario, titulo, fecha, hora, descripcion, edad_min, edad_max, ubicacion, participantes)
			 VALUES (4,'Ruta Moto','2024-06-03','08:00','Ruta hasta las pozas de Pígalo.',18,35,'Estación Delicias',10);
SELECT * FROM eventos;
SELECT CONCAT(nombre,' ',apel1,' ',apel2) as nombre_com, usuario FROM usuarios WHERE id_usuario = 1;
-- Listado de participantes en cada evento.
SELECT E.id_evento, PE.id_usuario, E.titulo, E.fecha 
FROM eventos E INNER JOIN participantes_eventos PE ON E.id_evento = PE.id_evento;
-- Cantidad de participantes en cada evento.
SELECT E.id_evento, E.titulo, COUNT(E.id_evento) AS participantes, E.fecha 
FROM eventos E INNER JOIN participantes_eventos PE ON E.id_evento = PE.id_evento
GROUP BY E.id_evento
ORDER BY participantes DESC;
-- Eventos pendientes organizados por un usuario.
SELECT count(id_evento) as eventos FROM eventos WHERE id_usuario=1 AND fecha>CURDATE();
SELECT U.id_usuario, CONCAT(nombre,' ',apel1,' ',apel2) as nombre_com, usuario FROM usuarios U INNER JOIN participantes_eventos PE ON U.id_usuario = PE.id_usuario WHERE PE.id_evento = 5;
SELECT * FROM eventos WHERE id_usuario=1;
SELECT id_evento, titulo, fecha, ubicacion FROM eventos WHERE fecha>CURDATE() ORDER BY fecha ASC LIMIT 20;


-- Inserts PARTICIPANTES_EVENTOS
INSERT INTO participantes_eventos (id_evento, id_usuario, fecha) VALUES (3,3,CURDATE());
INSERT INTO participantes_eventos (id_evento, id_usuario, fecha) VALUES (4,1,CURDATE());
INSERT INTO participantes_eventos (id_evento, id_usuario, fecha) VALUES (5,1,CURDATE());
INSERT INTO participantes_eventos (id_evento, id_usuario, fecha) VALUES (6,1,CURDATE());
INSERT INTO participantes_eventos (id_evento, id_usuario, fecha) VALUES (7,2,CURDATE());
SELECT * FROM participantes_eventos ORDER BY id_evento, id_usuario;
SELECT E.id_evento, E.titulo, E.fecha FROM participantes_eventos PE INNER JOIN eventos E ON E.id_evento = PE.id_evento WHERE PE.id_usuario = 1;
INSERT INTO participantes_eventos (id_evento, id_usuario, fecha) VALUES (1,2,CURDATE());