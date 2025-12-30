CREATE TABLE Departement(
id serial primary key,
name varchar (255) unique not null
);
create table Roles(
id serial primary key,
name varchar (255) unique not null
);
create table Users(   
id serial primary key,
name varchar (255),
sur_name varchar (255),
email varchar (255) unique not null,
password varchar (255) unique not null,
id_departement int references departement(id),
id_roles int references roles(id)
);
create table type_of_payment(
id serial primary key,
name varchar (255)
);

create table payments(
id serial primary key,
centre varchar (255),
numero_operation varchar(255),
numero_de_dossier varchar(255),
unite_monitaire numeric,
nom_benifiere varchar (255),
montant decimal (10,2) not null,
nom_designation varchar(255),
compte_credite varchar(255),
montant_en_lettre varchar(255) not null,
verificateur varchar(255),
status varchar(255)
); 