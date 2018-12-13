/* ===================================================================
-- Script to create database

-- Name Database : DropIt_DB
-- Address : localhost: {PORT}

-- Choose a common port for debugging 
-- ================================================================ */


/* ===================================================================
-- Create table user
-- ================================================================ */

CREATE TABLE myuser(
  email      	  VARCHAR(45) PRIMARY KEY,
  password      VARCHAR(45) NOT NULL,
  cf		        VARCHAR(15) NOT NULL,
  name          VARCHAR(45) NOT NULL,
  birthDate     Date NOT NULL,
  birthCity     VARCHAR(20) NOT NULL,
  city          VARCHAR(20) NOT NULL,
  address       VARCHAR(30) NOT NULL,
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