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
SELECT * FROM eventos WHERE id_usuario=1;



-- Inserts PARTICIPANTES_EVENTOS
INSERT INTO participantes_eventos (id_evento, id_usuario, fecha) VALUES (3,1,CURDATE());
INSERT INTO participantes_eventos (id_evento, id_usuario, fecha) VALUES (3,1,CURDATE());
INSERT INTO participantes_eventos (id_evento, id_usuario, fecha) VALUES (4,1,CURDATE());
INSERT INTO participantes_eventos (id_evento, id_usuario, fecha) VALUES (4,1,CURDATE());
INSERT INTO participantes_eventos (id_evento, id_usuario, fecha) VALUES (4,1,CURDATE());
INSERT INTO participantes_eventos (id_evento, id_usuario, fecha) VALUES (3,1,CURDATE());
INSERT INTO participantes_eventos (id_evento, id_usuario, fecha) VALUES (3,1,CURDATE());
INSERT INTO participantes_eventos (id_evento, id_usuario, fecha) VALUES (3,1,CURDATE());