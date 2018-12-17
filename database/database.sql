/* ===================================================================
-- Script to create database

-- Name Database : DropIt_DB
-- Address : localhost: {PORT}

-- Choose a common port for debugging 
-- ================================================================ */


/* ===================================================================
-- Create table user
-- ================================================================ */
/* Implementazione naif, subscription sarebbe più corretta come tabella a sè*/

CREATE TABLE myuser(
  email      	  VARCHAR(45) PRIMARY KEY,
  password      VARCHAR(45) NOT NULL,
  cf		        VARCHAR(16) NOT NULL,
  name          VARCHAR(45) NOT NULL,
  birthDate     Date NOT NULL,
  birthCity     VARCHAR(20) NOT NULL,
  city          VARCHAR(20) NOT NULL,
  address       VARCHAR(30) NOT NULL,
  subscription  VARCHAR(10),
  subscriptionDate Date,
  UNIQUE (cf)
  );

/* ===================================================================
-- Create table order
-- ================================================================ */

CREATE TABLE myorder(
  id            SERIAL PRIMARY KEY,
  description   VARCHAR(50) NOT NULL,
  orderDate     DATE NOT NULL,
  address       VARCHAR(30) NOT NULL,
  status        INTEGER NOT NULL
  );
  
  /* ===================================================================
-- Create table makes
-- ================================================================ */

CREATE TABLE makes(
  id          INTEGER PRIMARY KEY,
  email		    VARCHAR(45) NOT NULL,

  constraint reference_email foreign key (email) references myuser(email) DEFERRABLE	INITIALLY	DEFERRED,
  constraint reference_id foreign key (id)    references myorder(id) DEFERRABLE	INITIALLY	DEFERRED 
  );
  
ALTER TABLE myorder add constraint reference_id foreign key (id) references makes(id)
DEFERRABLE INITIALLY DEFERRED;

/* ===================================================================
-- Create table shop
-- ================================================================ */

CREATE TABLE shop(
  name          VARCHAR(45) PRIMARY KEY,
  category      VARCHAR(40) NOT NULL
  );

  /* ===================================================================
-- Create table driver
-- ================================================================ */

CREATE TABLE driver(
  email      	  VARCHAR(45) PRIMARY KEY,
  password      VARCHAR(45) NOT NULL,
  cf		        VARCHAR(16) NOT NULL,
  propName      VARCHAR(45) NOT NULL,
  shopName      VARCHAR(45) NOT NULL,
  activity      VARCHAR(45) NOT NULL,
  city          VARCHAR(20) NOT NULL,
  comune        VARCHAR(2)  NOT NULL,
  address       VARCHAR(30) NOT NULL,
  UNIQUE (cf)
  );

  /* ===================================================================
-- Insert shop services
-- ================================================================ */
insert into shop values('Zio Pagnotta','Alimenti');
insert into shop values('Il Signore degli Agnelli','Alimenti');
insert into shop values('Casa del brodo','Alimenti');
insert into shop values('La sorgente del panino','Alimenti');
insert into shop values('Sfizi di carne','Alimenti');
insert into shop values('Porkhause','Alimenti');
insert into shop values('Mago Gelo','Alimenti');
insert into shop values('Te la do io la merenda','Alimenti');
insert into shop values('Comunale San Rocco','Farmaci');
insert into shop values('Comunale g.p. Adami','Farmaci');
insert into shop values('Comunale Besenello','Farmaci');
insert into shop values('Farmaceutico di Nogaredo','Farmaci');
insert into shop values('Multiservizi Rovereto','Farmaci');
insert into shop values('Cobelli s.a.s.','Farmaci');
insert into shop values('Soave','Farmaci');
insert into shop values('San Giorgio di Manuela','Farmaci');
insert into shop values('Johnny Stockino','Abbigliamento');
insert into shop values('Baciami stupido','Abbigliamento');
insert into shop values('Malvestio','Abbigliamento');
insert into shop values('Tanta roba!','Abbigliamento');
insert into shop values('Re Erode','Abbigliamento');
insert into shop values('Scacco matto','Abbigliamento');
insert into shop values('Millepiedi','Abbigliamento');
insert into shop values('Bidon la scarpa','Abbigliamento');
insert into shop values('Riprese matrimonio','FotoVideo');
insert into shop values('Foto di edifici','FotoVideo');
insert into shop values('Foto di gruppo','FotoVideo');
insert into shop values('Video amatoriale','FotoVideo');
insert into shop values('Foto panoramica','FotoVideo');
insert into shop values('Video sorveglianza','FotoVideo');
insert into shop values('Video professionale','FotoVideo');
insert into shop values('Biblioteca dei sogni','LibriRiviste');
insert into shop values('Un mondo di libri','LibriRiviste');
insert into shop values('Un mondo di storie','LibriRiviste');
insert into shop values('Il senso delle parole','LibriRiviste');
insert into shop values('Un mondo di parole ','LibriRiviste');
insert into shop values('Lo scaffale letterario','LibriRiviste');
insert into shop values('Comunale n. 3','LibriRiviste');
insert into shop values('Angolo della cultura','LibriRiviste');
insert into shop values('Carfizzi','PostaPacchi');
insert into shop values('Melissa','PostaPacchi');
insert into shop values('Acquarica Del Capo','PostaPacchi');
insert into shop values('Cannole','PostaPacchi');
insert into shop values('Castro','PostaPacchi');
insert into shop values('Cavallino','PostaPacchi');
insert into shop values('Corsano','PostaPacchi');
insert into shop values('Cursi','PostaPacchi');
insert into shop values('Carto PC','Cancelleria');
insert into shop values('Ca.Li.Pso','Cancelleria');
insert into shop values('Cartolandia','Cancelleria');
insert into shop values('Il Cartalibro','Cancelleria');
insert into shop values('Te la do io la busta','Cancelleria');
insert into shop values('Il paradiso della carta','Cancelleria');
insert into shop values('La boutique della carta','Cancelleria');
insert into shop values('Cartomania','Cancelleria');
insert into shop values('Altro','Altro');
