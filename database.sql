-- Drop all tables that exist
DROP TABLE IF EXISTS "booth_applications";
DROP TABLE IF EXISTS "vendor_tags";
DROP TABLE IF EXISTS "event_tags";
DROP TABLE IF EXISTS "tags";
DROP TABLE IF EXISTS "booths";
DROP TABLE IF EXISTS "events";
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS "venues";
DROP TABLE IF EXISTS "addresses";
DROP DOMAIN IF EXISTS "domain_email";
DROP EXTENSION IF EXISTS "citext";


-- Import the citext library.
CREATE EXTENSION citext;

-- Create a domain to check the validity of our profile email field.
-- Only allows valid email addresses, otherwise will return an error
-- on bad email address creation attempts.
CREATE DOMAIN "domain_email" AS citext
	CHECK ( value ~ '^(?:[a-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$' )
	CONSTRAINT limit_length CHECK (char_length(value) <= 255);


-- START WITH TABLES THAT ARE ONLY LINKED TO

-- Create the addresses table
CREATE TABLE "addresses" (
	"id" SERIAL PRIMARY KEY,
	"address" VARCHAR (255),
	"address_2" VARCHAR (255),
	"city" VARCHAR (255),
	"state" VARCHAR (2),
	"zipcode" VARCHAR (10),
	"latitude" DECIMAL(10, 2),
	"longitude" DECIMAL(10, 2)
);


-- BUILD OUT TABLES THAT UTILIZE REFERENCES TO EXISTING TABLES

-- Create the venues table
CREATE TABLE "venues" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (255) NOT NULL,
	"address_id" INTEGER REFERENCES "addresses",
	"capacity" INTEGER,
	"contact_name" VARCHAR (255),
	"contact_phone" VARCHAR (15),
	"contact_email" domain_email,
	"contact_url" VARCHAR (255),
	"notes" TEXT
);



-- Create the core users' table
CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"email" domain_email UNIQUE NOT NULL,
	"password" VARCHAR (1000) NOT NULL,
	"type" VARCHAR (31),
	"first_name" VARCHAR (63),
	"last_name" VARCHAR (63),
	"title" VARCHAR (63),
	"business_name" VARCHAR (127),
	"description" TEXT,
	"address_id" INTEGER REFERENCES "addresses",
	"phone" VARCHAR (15),
	"phone_extension" VARCHAR(15),
	"approved_host" BOOLEAN NOT NULL DEFAULT FALSE,
	"main_url" VARCHAR (1023),
	"facebook_url" VARCHAR (1023),
	"etsy_url" VARCHAR (1023),
	"linkedin_url" VARCHAR (1023),
	"instagram_url" VARCHAR (1023),
	"pinterest_url" VARCHAR (1023),
	"receive_email" BOOLEAN NOT NULL DEFAULT TRUE,
	"created_on" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	"last_login" TIMESTAMP WITH TIME ZONE
);


-- Create the events table
CREATE TABLE "events" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER REFERENCES "user",
	"name" VARCHAR (255),
	"venue_id" INTEGER REFERENCES "venues",
	"description" TEXT,
	"start_date" DATE NOT NULL,
	"end_date" DATE NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT FALSE
);


-- Create the booths table
CREATE TABLE "booths" (
	"id" SERIAL PRIMARY KEY,
	"event_id" INTEGER REFERENCES "events" ON DELETE CASCADE,
	"type" VARCHAR (255) NOT NULL,
	"dimensions" VARCHAR (255),
	"quantity" INTEGER NOT NULL,
	"description" TEXT,
	"cost" DECIMAL(10, 2),
	"service_charge" DECIMAL(2, 2) DEFAULT 0.1
);


-- Create the booth applications table
CREATE TABLE "booth_applications" (
	"id" SERIAL PRIMARY KEY,
	"booth_id" INTEGER REFERENCES "booths" ON DELETE CASCADE,
	"user_id" INTEGER REFERENCES "user" ON DELETE CASCADE,
	"approved_by_host" VARCHAR (15) DEFAULT 'PENDING',
	"notes" TEXT,
	"requested_on" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	UNIQUE ("booth_id", "user_id")
);


-- Create the tags table
CREATE TABLE "tags" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (255) NOT NULL
);


-- Create the tags to users / vendors junction
CREATE TABLE "vendor_tags" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER REFERENCES "user" ON DELETE CASCADE,
	"tag_id" INTEGER REFERENCES "tags" ON DELETE CASCADE,
	UNIQUE ("user_id", "tag_id")
);



-- Create the tags to events junction
CREATE TABLE "event_tags" (
	"id" SERIAL PRIMARY KEY,
	"event_id" INTEGER REFERENCES "events" ON DELETE CASCADE,
	"tag_id" INTEGER REFERENCES "tags" ON DELETE CASCADE,
	UNIQUE ("event_id", "tag_id")
);


return eventTagsParams.map((tag)=>{ 
	return pool.query(eventsQuery, tag)
})