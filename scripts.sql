-- creacion de tablas
create table pedidos (
	id int NOT NULL PRIMARY key,
	id_cliente int,
    id_mensajero int,
    id_restaurante int,
    id_pago int,
    descripcion varchar(255)
);

create table restaurantes (
	id int NOT NULL PRIMARY key,
	nombre varchar(255),
	menu varchar(255),
	activo boolean
);

create table mensajeros (
id int NOT NULL PRIMARY key,
usuario varchar(255),
nombre varchar(255)
);

create table pagos (
id int NOT NULL PRIMARY key,
id_pedido int,
valor int,
metodo varchar(255)
);

create table clientes (
id int NOT NULL PRIMARY key,
usuario varchar(255),
nombre varchar(255),
correo varchar(255)
);

-- Insercion de datos
INSERT INTO public.mensajeros (id,usuario,nombre)
	VALUES (1,'mensajero_1','Luis Leal');


INSERT INTO public.clientes (id,usuario,nombre,correo)
	VALUES (1,'Deyvid','Deyvid Beltran','deyvid44@hotmail.com');