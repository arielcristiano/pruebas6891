-- Insertar scrims (partidas) de ejemplo
INSERT INTO scrims (id, juego, region, rango, fecha, latencia, descripcion, usuario_id, imagen) VALUES
	--(1, 'Valorant', 'EU', 1500, '2025-11-05 20:00:00', 80, 'Partida competitiva 5v5, nivel medio', 'arielcristiano'),
	--(2, 'Valorant', 'NA', 1800, '2025-11-06 21:30:00', 100, 'Scrim para equipo semi-pro', 'user2'),
	--(3, 'League of Legends', 'EU', 2000, '2025-11-07 19:00:00', 60, 'Buscamos jungla y soporte', 'capitan_lol'),
	--(4, 'CS:GO', 'EU', 1600, '2025-11-08 22:00:00', 50, 'Scrim 5v5 mapa de entrenamiento', 'clan_alpha'),
	--(5, 'Dota 2', 'SEA', 2200, '2025-11-09 18:00:00', 120, 'Partida amistosa alto MMR', 'user5'),
	(10, 'Dota 2', 'EU', 1400, '2025-11-01 16:00:00', 120, 'Scrim casual para práctica', 2, 'https://media.istockphoto.com/id/2091626012/photo/multiethnic-group-of-young-friends-playing-videogames-at-home.jpg?s=1024x1024&w=is&k=20&c=xPM8z9ZtbOID-fR6U4lU0v-KVNrPAx_3ZrRnciIXgmg='),	
    (11, 'Overwatch 2', 'LATAM', 1400, '2025-11-10 20:30:00', 150, 'Partida de prueba para nuevos reclutas', 1, 'https://cdn.pixabay.com/photo/2021/07/02/02/48/simulator-6380726_1280.jpg'),
    (12, 'Apex Legends', 'NA', 1700, '2025-11-11 19:30:00', 90, 'Scrim competitivo 3v3', 2, 'https://cdn.pixabay.com/photo/2021/07/02/02/48/simulator-6380726_1280.jpg'),
	(9, 'Valorant', 'AM', 1800, '2025-11-12 20:00:00', 90, 'Scrim con coaching', 1, 'https://cdn.pixabay.com/photo/2021/07/02/02/48/simulator-6380726_1280.jpg')
    ON DUPLICATE KEY UPDATE
  juego = VALUES(juego),
  region = VALUES(region),
  rango = VALUES(rango),
  fecha = VALUES(fecha),
  latencia = VALUES(latencia),
  descripcion = VALUES(descripcion),
  usuario_id = VALUES(usuario_id),
  imagen = VALUES(imagen);