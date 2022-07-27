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
	"main_url" VARCHAR (255),
	"facebook_url" VARCHAR (255),
	"etsy_url" VARCHAR (255),
	"linkedin_url" VARCHAR (255),
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
	"cost" DECIMAL(10, 2)
);


-- Create the booth applications table
CREATE TABLE "booth_applications" (
	"id" SERIAL PRIMARY KEY,
	"booth_id" INTEGER REFERENCES "booths" ON DELETE CASCADE,
	"user_id" INTEGER REFERENCES "user" ON DELETE CASCADE,
	"approved_by_host" BOOLEAN NOT NULL DEFAULT FALSE,
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

-- Below is to insert dummy/starting data into tables

INSERT INTO "tags" (name)
VALUES ('Showcase'),('Antiques'),('Food Vendor'),('Marketer'),('Content Creator'),('Craft Maker');

INSERT INTO "events" (user_id, name, description, start_date, end_date)
VALUES
(1, 'Billys Bee Bonanza', 'And event for bee keepers and lovers to explore the world of bee keeping', '2022-07-16', '2022-07-17'),
(1, 'Minnesota State Fair', 'The Minnesota State Fair is one of the largest and best-attended expositions in North America, attracting 2 million visitors annually. In addition to being a showcase for Minnesota’s finest agriculture, art and industry, the fair features hundreds of entertainment options including music all around the fairgrounds; educational exhibits; hands-on experiences; more than 60 carnival rides; thousands of competitions; 11 nights of Grandstand shows; and more than 500 different foods.', '2022-08-25', '2022-09-5'),
(1, 'Farm Fest', 'At Farmfest, we strive to bring together the best in agribusiness from Minnesota and around the country. We endeavor to provide one place for farmers to network, experience and learn to grow their farming operations.', '2022-08-06', '2022-08-07'),
(1, 'Comic Con', 'A comic book convention or comic con is an event with a primary focus on comic books and comic book culture, in which comic book fans gather to meet creators, experts, and each other. Commonly, comic conventions are multi-day events hosted at convention centers, hotels, or college campuses.', '2022-09-06', '2022-09-07');

INSERT INTO "booths" (event_id, type, dimensions, quantity, description, cost)
VALUES
(5, 'small', '5x5', 1, '1 table and 2 chairs', 200), (7, 'premium', '20x25', 2, '1 tent, 4 tables, and 8 chairs', 1200),
(8, 'large', '18x18', 4, 'mega tables', 2000);

INSERT INTO "booth_applications" (booth_id, user_id)
VALUES
(3, 2, true), (4, 2), (5, 2, true);

SELECT
	events.name,
	booths.type,
	booths.dimensions,
	booths.quantity,
	booths.description,
	booths.cost,
	booth_applications.approved_by_host,
	booth_applications.requested_on
FROM booths
JOIN booth_applications
	ON booth_applications.booth_id = booths.id
JOIN events
	ON booths.event_id = events.id
WHERE booth_applications.user_id = 2;