/* ===================================================================
-- Script to create database

-- Name Database : DropItDatabase
-- Address : localhost: {PORT}

-- Choose a common port for debugging 
-- ================================================================ */


/* ===================================================================
-- Create table user
-- ================================================================ */
begin;

CREATE TABLE myuser(
  email      	VARCHAR(45) PRIMARY KEY,
  password      VARCHAR(45) NOT NULL,
  cf		    VARCHAR(15) NOT NULL,
  name          VARCHAR(45) NOT NULL,
  datebirth     Date NOT NULL,
  cityBirth     VARCHAR(20) NOT NULL,
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
  dateorder     DATE NOT NULL,
  address       VARCHAR(30) NOT NULL,
  status        NUMERIC(1) NOT NULL,

  constraint reference_id foreign key (id)    references makes(id) DEFERRABLE	INITIALLY	DEFERRED 
  );
  
  /* ===================================================================
-- Create table makes
-- ================================================================ */

CREATE TABLE makes(
  id            NUMERIC(300) PRIMARY KEY,
  email		    VARCHAR(45) NOT NULL,

  constraint reference_email foreign key (email) references myuser(email) DEFERRABLE	INITIALLY	DEFERRED,
  constraint reference_id foreign key (id)    references myorder(id) DEFERRABLE	INITIALLY	DEFERRED 
  );
  
  
  commit;
