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


-- Below is to insert dummy/starting data into tables
INSERT INTO "tags" (name)
VALUES ('Showcase'),('Antiques'),('Food Vendor'),('Marketer'),('Content Creator'),('Craft Maker');

INSERT INTO "addresses" ("address", "address_2", "city", "state", "zipcode")
VALUES ('123 Street Ave', '321 Drive Way', 'Saint Paul', 'MN', 55415);

INSERT INTO "user" ("email", "password", "type", "first_name", "last_name", "title", "business_name", "description","address_id", "phone","main_url", "facebook_url", "etsy_url", "linkedin_url")
VALUES
('admin1@gmail.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'admin', 'Colin', 'Lastname', 'CEO', 'Weather', 'Weather is a cool website', '1', '123-123-1234', 'https://github.com/PrimeAcademy', 'https://www.facebook.com/', 'https://www.etsy.com/', 'https://www.linkedin.com'),
('vendor1@gmail.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Neil', 'Lastname', 'CEO', 'Banana Store', 'We only sell the finest bananas', '1', '123-123-1234', 'https://github.com/PrimeAcademy', 'https://www.facebook.com/', 'https://www.etsy.com/', 'https://www.linkedin.com'),
('vendor2@gmail.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Nimo', 'Lastname', 'CEO', 'TV Shows Store', 'We sell tv shows', '1', '123-123-1234', 'https://github.com/PrimeAcademy', 'https://www.facebook.com/', 'https://www.etsy.com/', 'https://www.linkedin.com'),
('vendor3@gmail.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'John', 'Lastname', 'CEO', 'Dog Store', 'We make good daog treats', '1', '123-123-1234', 'https://github.com/PrimeAcademy', 'https://www.facebook.com/', 'https://www.etsy.com/', 'https://www.linkedin.com'),
('vendor4@gmail.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Edan', 'Lastname', 'CEO', 'Mushroom Store', 'We sell great shrooms', '1', '123-123-1234', 'https://github.com/PrimeAcademy', 'https://www.facebook.com/', 'https://www.etsy.com/', 'https://www.linkedin.com'),
('host1@gmail.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'host', 'Tarek', 'Lastname', 'CEO', 'Food Host Company', 'Food Event is a cool website', '1', '123-123-1234', 'https://github.com/PrimeAcademy', 'https://www.facebook.com/', 'https://www.etsy.com/', 'https://www.linkedin.com'),
('host2@gmail.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'host', 'Josh', 'Lastname', 'CEO', 'River Run Hosting Company', 'River Run Event is a cool website', '1', '123-123-1234', 'https://github.com/PrimeAcademy', 'https://www.facebook.com/', 'https://www.etsy.com/', 'https://www.linkedin.com'),
('host3@gmail.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'host', 'Jean', 'Lastname', 'CEO', 'Wine Tasting Events INC', 'WE host the biggest wine tasting events in MN!', '1', '123-123-1234', 'https://github.com/PrimeAcademy', 'https://www.facebook.com/', 'https://www.etsy.com/', 'https://www.linkedin.com'),
('host4@gmail.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'host', 'Alex', 'Lastname', 'CEO', 'Hotdog Eating Events INC', 'We only host the greatest hotdog events', '1', '123-123-1234', 'https://github.com/PrimeAcademy', 'https://www.facebook.com/', 'https://www.etsy.com/', 'https://www.linkedin.com');


INSERT INTO "venues" ("name", "address_id", "contact_name", "contact_phone", "contact_email", "contact_url")
VALUES
('Xcel Energy Center', 1, 'Bill Billson', '123-123-1234', 'test@gmail.com', 'https://www.xcelenergycenter.com/');

INSERT INTO "events" (user_id, name, venue_id, description, start_date, end_date)
VALUES
(4, 'Billys Bee Bonanza', 1, 'And event for bee keepers and lovers to explore the world of bee keeping', '2022-07-16', '2022-07-17'),
(4, 'Minnesota State Fair', 1, 'The Minnesota State Fair is one of the largest and best-attended expositions in North America, attracting 2 million visitors annually. In addition to being a showcase for Minnesota’s finest agriculture, art and industry, the fair features hundreds of entertainment options including music all around the fairgrounds; educational exhibits; hands-on experiences; more than 60 carnival rides; thousands of competitions; 11 nights of Grandstand shows; and more than 500 different foods.', '2022-08-25', '2022-09-5'),
(5, 'Farm Fest', 1, 'At Farmfest, we strive to bring together the best in agribusiness from Minnesota and around the country. We endeavor to provide one place for farmers to network, experience and learn to grow their farming operations.', '2022-08-06', '2022-08-07'),
(5, 'Comic Con', 1, 'A comic book convention or comic con is an event with a primary focus on comic books and comic book culture, in which comic book fans gather to meet creators, experts, and each other. Commonly, comic conventions are multi-day events hosted at convention centers, hotels, or college campuses.', '2022-09-06', '2022-09-07');

INSERT INTO "booths" (event_id, type, dimensions, quantity, description, cost)
VALUES
(1, 'small', '5x5', 1, '1 table and 2 chairs', 200), (2, 'premium', '20x25', 2, '1 tent, 4 tables, and 8 chairs', 1200),
(3, 'large', '18x18', 4, 'mega tables', 2000), (4, 'meduim', '6x6', 3, 'nothing', 400);

INSERT INTO "booth_applications" (booth_id, user_id, approved_by_host)
VALUES
(1, 2, 'PENDING'), (2, 3, 'APPROVED'), (3, 3, 'APPROVED'), (4, 2, 'REJECTED');

INSERT INTO "vendor_tags" ("user_id", "tag_id")
VALUES
(1,1), (2,2), (2,3), (3,3), (4,4), (5,3), (6,2);

