-- Insert data into the "tags" table
INSERT INTO "tags"
    ("name")
VALUES 
    ('Showcase'),
    ('Antiques'),
    ('Food Vendor'),
    ('Marketer'),
    ('Content Creator'),
    ('Craft Maker');

-- Generate address fields to be used on other tables
INSERT INTO "addresses"
    ("address", "address_2", "city", "state", "zipcode")
VALUES
    ('123 Street Ave', '321 Drive Way', 'Saint Paul', 'MN', '55415'), -- 1
    ('454 1st St.', '', 'Minneapolis', 'MN', '55406'),
    ('10355 3rd Ave.', '', 'Lakeville', 'MN', '55311'),
    ('12 86th Blvd', 'Apt. #3', 'Roseville', 'MN', '57122'),
    ('53 12st St.', '', 'Minneapolis', 'MN', '55407'),               -- 5
    ('32578 Valley Crest Road.', '', 'Stillwater', 'MN', '55681'),
    ('454 1st St.', '', 'Minneapolis', 'MN', '55406'),
    ('9th Ave.', '', 'Minneapolis', 'MN', '55406'),
    ('32254 County Rd. 54', '', 'Glencoe', 'MN', '55103'),
    ('199 W Kellogg Blvd', '', 'St Paul', 'MN', '55102'),            -- 10
    ('1265 Snelling Ave N', '', 'St Paul', 'MN', '55108'),
    ('12 Snelling Ave.', '', 'Minneapolis', 'MN', '55604'),
    ('1301 2nd Ave S','', 'Minneapolis', 'MN', '55404'),
    ('9916 Academy St.', '', 'Rego Park', 'NY', '11374'),
    ('40 Proctor Circle', '', 'Jamestown', 'NY', '14701'),           -- 15
    ('7001 S. Bridge Street', '', 'Prattville', 'AL', '36067'),
    ('18 St Margarets Street', '', 'Toledo', 'OH', '43612'),
    ('78 Woodland St.', '', 'Smithtown', 'NY', '11787'),
    ('187 Franklin St.', '', 'Orland Park', 'IL', '60462'),
    ('933 Ryan Rd.', '', 'Lanham', 'MD', '20706'),                   -- 20
    ('216 South Halifax Road', '', 'West Lafayette', 'IN', '47906'),
    ('9934 East Cottage St.', '', 'Hillsboro', 'OR', '97124'),
    ('8947 Pineknoll Street', '', 'Loganville', 'GA', '30052'),
    ('332 North Tarkiln Hill Circle', '', 'Rapid City', 'SD', '57701'),
    ('7613 Albany Lane', '', 'Deltona', 'FL', '32725'),              -- 25
    ('9707 Edgemont Dr.', '', 'West New York', 'NJ', '07093'),
    ('98 East Lincoln Ave.', '', 'Muncie', 'IN', '47302'),
    ('45 Logan Dr.', '', 'Leesburg', 'VA', '20175'),
    ('11 Blackburn St.', '', 'Union City', 'NJ', '07087'),
    ('9662 Wall St.', '', 'Cranberry Twp', 'PA', '16066'),           -- 30
    ('88 Joy Ridge Drive', '', 'Schererville', 'IN', '46375'),
    ('42 Monroe Rd.', '', 'Fairborn', 'OH', '45324'),
    ('10 Belmont Rd.', '', 'Allentown', 'PA', '18102'),
    ('610 Hilltop Ave.', '', 'Green Bay', 'WI', '54302'),
    ('6 N. Jockey Hollow St.', '', 'Camden', 'NJ', '08105'),         -- 35
    ('7725 Fordham Street', '', 'North Canton', 'OH', '44720'),
    ('890 E. Trout Road', '', 'Farmingdale', 'NY', '11735'),
    ('992 Theatre Court', '', 'Savannah', 'GA', '31404'),
    ('366 S. Newcastle Street', '', 'Hummelstown', 'PA', '17036'),
    ('391 Pumpkin Hill Street', '', 'West Springfield', 'MA', '01089'),-- 40
    ('101 Leeton Ridge Court', '', 'Capitol Heights', 'MD', '20743');

-- Generate users to acccess the system
-- All passwords for each user is: 'password'
INSERT INTO "user"
    ("email", "password", "type", "first_name", "last_name", "title", "business_name", "description","address_id", "phone","main_url", "facebook_url", "etsy_url", "linkedin_url", "instagram_url", "pinterest_url")
VALUES
    -- Admin
    ('admin1@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'admin', 'Colin', 'Oraskovich', 'CEO', 'Weather', 'Weather is a cool website', '1', '123-123-1234', 'https://github.com/PrimeAcademy', 'https://www.facebook.com/', 'https://www.etsy.com/', 'https://www.linkedin.com', 'https://www.instagram.com', 'https://www.pintrest.com'),

    -- Vendors (friends)
    ('vendor1@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Neil', 'Hanson', 'CEO', 'Banana Store', 'We only sell the finest bananas', '2', '123-123-1234', 'https://github.com/PrimeAcademy', 'https://www.facebook.com/', 'https://www.etsy.com/', 'https://www.linkedin.com','',''),
    ('vendor2@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Nimo', 'Abdi', 'CEO', 'TV Shows Store', 'We sell tv shows', '3', '123-123-1234', 'https://github.com/PrimeAcademy', 'https://www.facebook.com/', 'https://www.etsy.com/', '','',''),
    ('vendor3@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'John', 'Maras', 'CEO', 'Dog Store', 'We make good daog treats', '4', '123-123-1234', 'https://github.com/PrimeAcademy', '', '', 'https://www.linkedin.com','',''),
    ('vendor4@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Edan', 'Schwartz', 'CEO', 'Mushroom Store', 'We sell great shrooms', '5', '123-123-1234', '', '', '', '','',''),
    
    -- Vendors (random)
    ('vendor5@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Janiyah', 'Santiago', 'Owner', 'Rubber Bands Band', 'Stretching the realities of rock', '14', '123-123-1234', '', '', '', '','',''),
    ('vendor6@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Macie', 'Berry', 'Founder', 'Sandal Store', 'We sell sandals', '15', '123-123-1234', '', '', '', '','',''),
    ('vendor7@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Amelia', 'Small', '', 'Ford Trucks', 'Va-Room!!!!!!!!!!!!!!', '16', '123-123-1234', '', '', '', '','',''),
    ('vendor8@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Gabriel', 'Richardson', 'Founder', 'Balloon Parties', 'Putting the He He in balloons!', '17', '123-123-1234', '', '', '', '','',''),
    ('vendor9@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Lena', 'Carrillo', 'Founder', 'Slippers & More!', 'Keep your feet warm and covered!', '18', '123-123-1234', '', '', '', '','',''),
    ('vendor10@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Monique', 'Bailey', '', 'Spoons', 'We sell soups and spoons', '19', '123-123-1234', '', '', '', '','',''),
    ('vendor11@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Tyrone', 'Villa', 'Owner', 'Clothes With Style', 'More than white shirts!', '20', '123-123-1234', '', '', '', '','',''),
    ('vendor12@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Sanai', 'Rollins', '', 'Leg Warmers', 'Cover your knees if you going to be walking around...', '21', '123-123-1234', '', '', '', '','',''),
    ('vendor13@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Nola', 'Key', '', 'Lace & Delicates', 'Wear clothes, but not too much.', '22', '123-123-1234', '', '', '', '','',''),
    ('vendor14@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Jesse', 'Orr', '', 'Shovels', 'If you''re in a whole, ya just gotta dig yourself out', '23', '123-123-1234', '', '', '', '','',''),
    ('vendor15@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Richard', 'Stark', 'Owner', 'Candles', 'Mostly vanilla scented', '24', '123-123-1234', '', '', '', '','',''),
    ('vendor16@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Willow', 'Poole', 'Founder', 'Cars & Trackors', 'People need to get places. We offer solutions. And cars. And trackors.', '25', '123-123-1234', '', '', '', '','',''),
    ('vendor17@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Cameron', 'Chambers', 'Owner', 'Sketch Pad Store', 'Artist choice shop', '26', '123-123-1234', '', '', '', '','',''),
    ('vendor18@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Shamar', 'Vazquez', 'Founder', 'Cats and Spaghetti', 'When you don''t know what to sell, sell everything.', '27', '123-123-1234', '', '', '', '','',''),
    ('vendor19@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Sadie', 'Wilson', '', 'Piano Tuners', 'You''re not a bad musician, your piano''s just out of tune!', '28', '123-123-1234', '', '', '', '','',''),
    ('vendor20@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Rhett', 'Ortiz', 'Owner', 'Shawls, Scarfs, and More', 'Fashion on a budget', '29', '123-123-1234', '', '', '', '','',''),
    ('vendor21@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Zachary', 'Levy', 'Founder', 'Packing Peanuts Vendor', 'Literally everywhere', '30', '123-123-1234', '', '', '', '','',''),
    ('vendor22@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Cristina', 'Phelps', 'Founder', 'Apple Cider and Orchard', 'Home grown apples, fresh from farm to your table.', '31', '123-123-1234', '', '', '', '','',''),
    ('vendor23@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Kaila', 'Pham', '', 'Thread Founders', 'Stitch your life back together', '32', '123-123-1234', '', '', '', '','',''),
    ('vendor24@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Cannon', 'Rubio', 'Founder', 'Rusty Nail', 'A local bar, not a hardware store. Please stop asking about lumber prices.', '33', '123-123-1234', '', '', '', '','',''),
    ('vendor25@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Aiyana', 'Burke', 'Owner', 'Paint Brushes', 'A partner in art. Ask about the sketch pad store and get a 20% discount.', '34', '123-123-1234', '', '', '', '','',''),
    ('vendor26@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Hamza', 'Chavez', 'Founder', 'MP3 Players - Refurbished', 'Much like the record player, we''re going to be a big hit!', '35', '123-123-1234', '', '', '', '','',''),
    ('vendor27@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Santino', 'Mcintyre', '', 'Buttons Emporium', 'You have spare buttons from suits and pants, we collect them. All sales are final!', '36', '123-123-1234', '', '', '', '','',''),
    ('vendor28@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Gaven', 'Cowan', 'Owner', 'Shipping Boxes', 'Boxes of all sizes for all your needs', '37', '123-123-1234', '', '', '', '','',''),
    ('vendor29@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Marlie', 'Joyce', 'Founder', 'Chair Restoration', 'A litte varnish goes a long way', '38', '123-123-1234', '', '', '', '','',''),
    ('vendor30@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Brenden', 'Mcpherson', 'Founder', 'Coasters', 'Save your furniture with us. Never lose a friend again!!!', '39', '123-123-1234', '', '', '', '','',''),
    ('vendor31@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Tyrell', 'Shields', '', 'Sidewalk Chalk', '#1 chalk vendor in Missouri', '40', '123-123-1234', '', '', '', '','',''),
    ('vendor32@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'vendor', 'Kayleigh', 'Duncan', 'Founder', 'Toothpaste', 'It''s free. Take the hint...', '41', '123-123-1234', '', '', '', '','',''),

    -- Host
    ('host1@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'host', 'Tarek', 'Azzazi', 'CEO', 'Food Host Company', 'Food Event is a cool website', '6', '123-123-1234', '', '', 'https://www.etsy.com/', '','',''),
    ('host2@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'host', 'Josh', 'Synder', 'CEO', 'River Run Hosting Company', 'River Run Event is a cool website', '7', '123-123-1234', 'https://github.com/PrimeAcademy', '', '', '','https://www.instagram.com',''),
    ('host3@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'host', 'Jean-Luc', 'LaCosse', 'CEO', 'Wine Tasting Events INC', 'WE host the biggest wine tasting events in MN!', '8', '123-123-1234', 'https://github.com/PrimeAcademy', '', '', '','https://www.instagram.com',''),
    ('host4@example.com', '$2a$10$1luP05zl8k51vCWkTaSu9.O8jwisNGB3dhzwoALeJynhbyNTj0QKe', 'host', 'Alex', 'Ratanas', 'CEO', 'Hotdog Eating Events INC', 'We only host the greatest hotdog events', '9', '123-123-1234', 'https://github.com/PrimeAcademy', '', '', '','','https://www.pintrest.com');

-- Generate venue locations
INSERT INTO "venues"
    ("name", "address_id", "contact_name", "contact_phone", "contact_email", "contact_url")
VALUES
    ('Xcel Energy Center', 10, 'Bill Billson', '(651) 265-4800', 'xcel@example.com', 'https://www.xcelenergycenter.com/'),
    ('Minnesota State Fairgrounds', 11, 'Olga Norberg', '(651) 288-4400', 'mn-state-fair@example.com', 'https://www.mnstatefair.org'),
    ('St. John''s Lutheran Church', 12, 'Susan Anderson', '123-123-1234', 'church@example.com', 'https://www.church-website.com/'),
    ('Minneapolis Convention Center', 13, 'Christa Allez', '(612) 335-6000', 'mn-convention@example.com', 'https://www.minneapolis.com');

-- Generate events for the user
INSERT INTO "events"
    ("user_id", "name", "venue_id", "description", "start_date", "end_date", "verified")
VALUES
    (6, 'Billys Bee Bonanza', 1, 'And event for bee keepers and lovers to explore the world of bee keeping', '2022-07-16', '2022-07-17', 'TRUE'),
    (7, 'Minnesota State Fair', 2, 'The Minnesota State Fair is one of the largest and best-attended expositions in North America, attracting 2 million visitors annually. In addition to being a showcase for Minnesota’s finest agriculture, art and industry, the fair features hundreds of entertainment options including music all around the fairgrounds; educational exhibits; hands-on experiences; more than 60 carnival rides; thousands of competitions; 11 nights of Grandstand shows; and more than 500 different foods.', '2022-08-05', '2022-08-13', 'TRUE'),
    (8, 'Farm Fest', 3, 'At Farmfest, we strive to bring together the best in agribusiness from Minnesota and around the country. We endeavor to provide one place for farmers to network, experience and learn to grow their farming operations.', '2022-07-30', '2022-07-31', 'TRUE'),
    (9, 'Comic Con', 4, 'A comic book convention or comic con is an event with a primary focus on comic books and comic book culture, in which comic book fans gather to meet creators, experts, and each other. Commonly, comic conventions are multi-day events hosted at convention centers, hotels, or college campuses.', '2022-09-06', '2022-09-07', 'FALSE'),
    (6, 'Billys Bee Bonanza', 1, 'And event for bee keepers and lovers to explore the world of bee keeping', '2022-07-30', '2022-07-31', 'TRUE'),
    (6, 'Billys Bee Bonanza', 1, 'And event for bee keepers and lovers to explore the world of bee keeping', '2022-08-13', '2022-08-14', 'TRUE'),
    (6, 'Billys Bee Bonanza', 1, 'And event for bee keepers and lovers to explore the world of bee keeping', '2022-08-27', '2022-08-28', 'FALSE'),
    (8, 'Farm Fest', 3, 'At Farmfest, we strive to bring together the best in agribusiness from Minnesota and around the country. We endeavor to provide one place for farmers to network, experience and learn to grow their farming operations.', '2022-08-06', '2022-08-07', 'TRUE'),
    (8, 'Farm Fest', 3, 'At Farmfest, we strive to bring together the best in agribusiness from Minnesota and around the country. We endeavor to provide one place for farmers to network, experience and learn to grow their farming operations.', '2022-08-13', '2022-08-14', 'TRUE'),
    (8, 'Farm Fest', 3, 'At Farmfest, we strive to bring together the best in agribusiness from Minnesota and around the country. We endeavor to provide one place for farmers to network, experience and learn to grow their farming operations.', '2022-08-20', '2022-08-21', 'FALSE'),
    (8, 'Farm Fest', 3, 'At Farmfest, we strive to bring together the best in agribusiness from Minnesota and around the country. We endeavor to provide one place for farmers to network, experience and learn to grow their farming operations.', '2022-08-27', '2022-08-28', 'FALSE');

-- Create event tags
INSERT INTO "event_tags"
    ("event_id", "tag_id")
VALUES
    (1,3), (1,6), 
    (2,1), (2,3), (2,4), (2,5), (2,6),
    (3,1), (3,2), (3,6),
    (4,3), (4,4), (4,5),
    (5,3), (5,6),
    (6,3), (6,6), 
    (7,3), (7,6), 
    (8,1), (8,2), (8,6),
    (9,1), (9,2), (9,6),
    (10,1), (10,2), (10,6),
    (11,1), (11,2), (11,6);

-- Create the booths for the various events
INSERT INTO "booths"
    ("event_id", "type", "dimensions", "quantity", "description", "cost")
VALUES
    (1, 'Small booth', '5x5', 10, '1 table', 110),
    (1, 'Corner booth', '5x10', 4, '2 table and 2 chairs', 250),
    (1, 'Queen''s Chamber', 'Dedicated room for the queen bee!', 1, 'Large room, 4 tables, air conditioned. Free sweets provided to vendor.', 2000),
    (2, 'Small Booth', '20x20', 32, 'Outdoors space next to dedicated pathways. 4 outlets provided. Car / truck access available overnight.', 10000),
    (2, 'Large Booth', '30x20', 16, 'Outdoors space next to dedicated pathways. 6 outlets provided. Car / truck access available overnight.', 20000),
    (2, 'Indoor Small Booth', '15x12', 12, 'Indoor space within a building. 4 outlets provided. Water access.', 26899),
    (2, 'Indoor Large Booth', '25x12', 10, 'Indoor space within a building. 4 outlets provided. Water access. Car / truck access available overnight.', 39999),
    (3, 'small', '5x5', 5, '', 160),
    (3, 'medium', '10x5', 5, '1 table', 210),
    (3, 'large', '15x5', 3, '2 tables, 2 chairs', 400),
    (4, 'Small Booth', '20x20', 20, 'Indoor space next to dedicated pathways. 4 outlets provided. Car / truck access available overnight.', 1500),
    (4, 'Large Booth', '30x20', 10, 'Indoor space next to dedicated pathways. 6 outlets provided. Car / truck access available overnight.', 3000),
    (5, 'Small booth', '5x5', 10, '1 table', 110),
    (5, 'Corner booth', '5x10', 4, '2 table and 2 chairs', 250),
    (5, 'Queen''s Chamber', 'Dedicated room for the queen bee!', 1, 'Large room, 4 tables, air conditioned. Free sweets provided to vendor.', 2000),
    (6, 'Small booth', '5x5', 10, '1 table', 110),
    (6, 'Corner booth', '5x10', 4, '2 table and 2 chairs', 250),
    (6, 'Queen''s Chamber', 'Dedicated room for the queen bee!', 1, 'Large room, 4 tables, air conditioned. Free sweets provided to vendor.', 2000),
    (7, 'Small booth', '5x5', 10, '1 table', 110),
    (7, 'Corner booth', '5x10', 4, '2 table and 2 chairs', 250),
    (7, 'Queen''s Chamber', 'Dedicated room for the queen bee!', 1, 'Large room, 4 tables, air conditioned. Free sweets provided to vendor.', 2000),
    (8, 'small', '5x5', 5, '', 160),
    (8, 'medium', '10x5', 5, '1 table', 210),
    (8, 'large', '15x5', 3, '2 tables, 2 chairs', 400),
    (9, 'small', '5x5', 5, '', 160),
    (9, 'medium', '10x5', 5, '1 table', 210),
    (9, 'large', '15x5', 3, '2 tables, 2 chairs', 400),
    (10, 'small', '5x5', 5, '', 160),
    (10, 'medium', '10x5', 5, '1 table', 210),
    (10, 'large', '15x5', 3, '2 tables, 2 chairs', 400),
    (11, 'small', '5x5', 5, '', 160),
    (11, 'medium', '10x5', 5, '1 table', 210),
    (11, 'large', '15x5', 3, '2 tables, 2 chairs', 400);

-- Create the booth applications
INSERT INTO "booth_applications"
    ("booth_id", "user_id", "approved_by_host")
VALUES
    -- 10 booths
    (1,2,'APPROVED'), (1,4,'APPROVED'), (1,5,'REJECTED'), (1,6,'PENDING'), (1,8,'APPROVED'), (1,9,'APPROVED'), (1,10,'REJECTED'), (1,11,'PENDING'), (1,13,'APPROVED'), (1,14,'APPROVED'), (1,15,'REJECTED'), (1,16,'PENDING'), (1,18,'APPROVED'), (1,19,'APPROVED'), (1,20,'REJECTED'), (1,21,'PENDING'), (1,23,'APPROVED'), (1,24,'APPROVED'), (1,25,'REJECTED'), (1,26,'PENDING'),
    -- 4 booths
    (2,2,'APPROVED'), (2,3,'APPROVED'), (2,5,'REJECTED'), (2,6,'REJECTED'), (2,7,'APPROVED'), (2,9,'PENDING'), (2,10,'REJECTED'), (2,11,'PENDING'), (2,13,'PENDING'), (2,14,'APPROVED'), (2,15,'REJECTED'),
    -- 1 booths
    (3,2,'REJECTED'), (3,3,'REJECTED'), (3,4,'REJECTED'), (3,5,'APPROVED'),
    -- 32 booths
    (4,2,'PENDING'), (4,3,'APPROVED'), (4,4,'PENDING'), (4,5,'PENDING'), (4,6,'PENDING'), (4,7,'PENDING'), (4,8,'PENDING'), (4,9,'APPROVED'), (4,10,'REJECTED'), (4,11,'PENDING'), (4,12,'PENDING'), (4,13,'APPROVED'), (4,14,'PENDING'), (4,15,'PENDING'), (4,16,'PENDING'), (4,17,'PENDING'), (4,18,'PENDING'), (4,19,'APPROVED'), (4,20,'PENDING'), (4,21,'PENDING'), (4,22,'PENDING'), (4,23,'APPROVED'), (4,24,'PENDING'), (4,25,'PENDING'), (4,26,'PENDING'), (4,27,'PENDING'), (4,28,'PENDING'), (4,29,'APPROVED'), (4,30,'PENDING'), (4,31,'PENDING'), (4,32,'PENDING'), (4,33,'PENDING'),
    -- 16 booths
    (5,2,'PENDING'), (5,3,'PENDING'), (5,4,'PENDING'), (5,11,'PENDING'), (5,12,'PENDING'), (5,13,'APPROVED'), (5,14,'PENDING'), (5,15,'PENDING'), (5,18,'PENDING'), (5,19,'APPROVED'), (5,20,'PENDING'), (5,22,'PENDING'), (5,23,'APPROVED'), (5,24,'PENDING'), (5,25,'PENDING'), (5,26,'PENDING'), (5,27,'PENDING'), (5,28,'PENDING'), (5,29,'PENDING'), (5,30,'PENDING'), (5,31,'PENDING'),
    --12 booths
    (6,2,'PENDING'), (6,3,'PENDING'), (6,5,'PENDING'), (6,6,'PENDING'), (6,7,'PENDING'), (6,10,'REJECTED'), (6,11,'PENDING'), (6,13,'APPROVED'), (6,15,'PENDING'), (6,18,'PENDING'), (6,20,'PENDING'), (6,21,'PENDING'), (6,22,'PENDING'), (6,23,'APPROVED'), (6,25,'PENDING'), (6,26,'PENDING'), (6,27,'PENDING'), (6,31,'PENDING'), (6,33,'PENDING'),
    -- 10 booths
    (7,2,'PENDING'), (7,3,'PENDING'), (7,7,'PENDING'), (7,10,'REJECTED'), (7,15,'PENDING'), (7,17,'APPROVED'), (7,18,'PENDING'), (7,19,'PENDING'), (7,20,'PENDING'), (7,21,'PENDING'), (7,24,'PENDING'), (7,25,'APPROVED'), (7,26,'PENDING'), (7,27,'PENDING'), (7,31,'PENDING'), (7,32,'PENDING'),
    -- 5 booths
    (8,16,'REJECTED'), (8,17,'REJECTED'), (8,19,'APPROVED'), (8,20,'PENDING'), (8,21,'REJECTED'), (8,22,'REJECTED'), (8,23,'APPROVED'), (8,24,'REJECTED'), (8,25,'REJECTED'), (8,26,'PENDING'), (8,27,'REJECTED'), (8,29,'APPROVED'), (8,30,'REJECTED'), (8,31,'PENDING'), (8,32,'APPROVED'), (8,33,'APPROVED'),
    -- 5 booths
    (9,16,'APPROVED'), (9,17,'REJECTED'), (9,19,'REJECTED'), (9,20,'APPROVED'), (9,21,'REJECTED'), (9,22,'REJECTED'), (9,23,'PENDING'), (9,25,'REJECTED'), (9,26,'PENDING'), (9,27,'APPROVED'), (9,29,'PENDING'), (9,30,'REJECTED'), (9,31,'PENDING'), (9,32,'PENDING'), (9,33,'PENDING'),
    -- 3 booths
    (10,16,'REJECTED'), (10,17,'APPROVED'), (10,20,'APPROVED'), (10,22,'REJECTED'), (10,23,'APPROVED'), (10,28,'REJECTED'), (10,25,'REJECTED'), (10,26,'PENDING'),
    -- 20 booths
    (11,2,'PENDING'), (11,3,'APPROVED'), (11,4,'PENDING'), (11,5,'PENDING'), (11,6,'PENDING'), (11,7,'PENDING'), (11,8,'PENDING'), (11,9,'APPROVED'), (11,10,'REJECTED'), (11,11,'PENDING'), (11,12,'PENDING'), (11,13,'APPROVED'), (11,14,'PENDING'), (11,15,'PENDING'), (11,16,'PENDING'), (11,17,'PENDING'), (11,18,'PENDING'), (11,19,'APPROVED'), (11,20,'PENDING'), (11,21,'PENDING'), (11,22,'PENDING'), (11,23,'APPROVED'), (11,24,'PENDING'), (11,25,'PENDING'), (11,26,'PENDING'), (11,27,'PENDING'), (11,28,'PENDING'), (11,29,'APPROVED'), (11,30,'PENDING'), (11,31,'PENDING'), (11,32,'PENDING'), (11,33,'PENDING'),
    -- 10 booths
    (12,2,'PENDING'), (12,3,'PENDING'), (12,4,'PENDING'), (12,11,'PENDING'), (12,12,'PENDING'), (12,13,'APPROVED'), (12,14,'PENDING'), (12,15,'PENDING'), (12,18,'PENDING'), (12,19,'APPROVED'), (12,20,'PENDING'), (12,22,'PENDING'), (12,23,'APPROVED'), (12,24,'PENDING'), (12,25,'PENDING'), (12,26,'PENDING'), (12,27,'PENDING'), (12,28,'PENDING'), (12,29,'PENDING'), (12,30,'PENDING'), (12,31,'PENDING'),
    -- 10 booths
    (13,2,'APPROVED'), (13,4,'APPROVED'), (13,5,'REJECTED'), (13,6,'PENDING'), (13,8,'APPROVED'), (13,9,'APPROVED'), (13,10,'REJECTED'), (13,11,'PENDING'), (13,13,'APPROVED'), (13,14,'APPROVED'), (13,15,'REJECTED'), (13,16,'PENDING'), (13,18,'APPROVED'), (13,19,'APPROVED'), (13,20,'REJECTED'), (13,21,'PENDING'), (13,23,'APPROVED'), (13,24,'APPROVED'), (13,25,'REJECTED'), (13,26,'PENDING'),
    -- 4 booths
    (14,2,'APPROVED'), (14,3,'APPROVED'), (14,5,'REJECTED'), (14,6,'REJECTED'), (14,7,'APPROVED'), (14,9,'PENDING'), (14,10,'REJECTED'), (14,11,'PENDING'), (14,13,'PENDING'), (14,14,'APPROVED'), (14,15,'REJECTED'),
    -- 1 booths
    (15,2,'REJECTED'), (15,15,'REJECTED'), (15,4,'REJECTED'), (15,5,'APPROVED'),
    -- 10 booths
    (16,2,'APPROVED'), (16,4,'APPROVED'), (16,5,'REJECTED'), (16,6,'PENDING'), (16,8,'APPROVED'), (16,9,'APPROVED'), (16,10,'REJECTED'), (16,11,'PENDING'), (16,13,'APPROVED'), (16,14,'APPROVED'), (16,15,'REJECTED'), (16,16,'PENDING'), (16,18,'APPROVED'), (16,19,'APPROVED'), (16,20,'REJECTED'), (16,21,'PENDING'), (16,23,'APPROVED'), (16,24,'APPROVED'), (16,25,'REJECTED'), (16,26,'PENDING'),
    -- 4 booths
    (17,2,'APPROVED'), (17,3,'APPROVED'), (17,5,'REJECTED'), (17,6,'REJECTED'), (17,7,'APPROVED'), (17,9,'PENDING'), (17,10,'REJECTED'), (17,11,'PENDING'), (17,13,'PENDING'), (17,14,'APPROVED'), (17,15,'REJECTED'),
    -- 1 booths
    (18,2,'REJECTED'), (18,3,'REJECTED'), (18,4,'REJECTED'), (18,5,'APPROVED'),
    -- 10 booths
    (19,2,'APPROVED'), (19,4,'APPROVED'), (19,5,'REJECTED'), (19,6,'PENDING'), (19,8,'APPROVED'), (19,9,'APPROVED'), (19,10,'REJECTED'), (19,11,'PENDING'), (19,13,'APPROVED'), (19,14,'APPROVED'), (19,15,'REJECTED'), (19,16,'PENDING'), (19,18,'APPROVED'), (19,19,'APPROVED'), (19,20,'REJECTED'), (19,21,'PENDING'), (19,23,'APPROVED'), (19,24,'APPROVED'), (19,25,'REJECTED'), (19,26,'PENDING'),
    -- 4 booths
    (20,2,'APPROVED'), (20,3,'APPROVED'), (20,5,'REJECTED'), (20,6,'REJECTED'), (20,7,'APPROVED'), (20,9,'PENDING'), (20,10,'REJECTED'), (20,11,'PENDING'), (20,13,'PENDING'), (20,14,'APPROVED'), (20,15,'REJECTED'),
    -- 1 booths
    (21,2,'REJECTED'), (21,3,'REJECTED'), (21,4,'REJECTED'), (21,5,'APPROVED'),
    -- 5 booths
    (22,16,'REJECTED'), (22,17,'REJECTED'), (22,19,'APPROVED'), (22,20,'PENDING'), (22,21,'REJECTED'), (22,22,'REJECTED'), (22,23,'APPROVED'), (22,24,'REJECTED'), (22,25,'REJECTED'), (22,26,'PENDING'), (22,27,'REJECTED'), (22,29,'APPROVED'), (22,30,'REJECTED'), (22,31,'PENDING'), (22,32,'APPROVED'), (22,33,'APPROVED'),
    -- 5 booths
    (23,16,'APPROVED'), (23,17,'REJECTED'), (23,19,'REJECTED'), (23,20,'APPROVED'), (23,21,'REJECTED'), (23,22,'REJECTED'), (23,23,'PENDING'), (23,25,'REJECTED'), (23,26,'PENDING'), (23,27,'APPROVED'), (23,29,'PENDING'), (23,30,'REJECTED'), (23,31,'PENDING'), (23,32,'PENDING'), (23,33,'PENDING'),
    -- 3 booths
    (24,16,'REJECTED'), (24,17,'APPROVED'), (24,20,'APPROVED'), (24,22,'REJECTED'), (24,23,'APPROVED'), (24,28,'REJECTED'), (24,25,'REJECTED'), (24,26,'PENDING'),
    -- 5 booths
    (25,16,'REJECTED'), (25,17,'REJECTED'), (25,19,'APPROVED'), (25,20,'PENDING'), (25,21,'REJECTED'), (25,22,'REJECTED'), (25,23,'APPROVED'), (25,24,'REJECTED'), (25,25,'REJECTED'), (25,26,'PENDING'), (25,27,'REJECTED'), (25,29,'APPROVED'), (25,30,'REJECTED'), (25,31,'PENDING'), (25,32,'APPROVED'), (25,33,'APPROVED'),
    -- 5 booths
    (26,16,'APPROVED'), (26,17,'REJECTED'), (26,19,'REJECTED'), (26,20,'APPROVED'), (26,21,'REJECTED'), (26,22,'REJECTED'), (26,23,'PENDING'), (26,25,'REJECTED'), (26,26,'PENDING'), (26,27,'APPROVED'), (26,29,'PENDING'), (26,30,'REJECTED'), (26,31,'PENDING'), (26,32,'PENDING'), (26,33,'PENDING'),
    -- 3 booths
    (27,16,'REJECTED'), (27,17,'APPROVED'), (27,20,'APPROVED'), (27,22,'REJECTED'), (27,23,'APPROVED'), (27,28,'REJECTED'), (27,25,'REJECTED'), (27,26,'PENDING'),
    -- 5 booths
    (28,16,'REJECTED'), (28,17,'REJECTED'), (28,19,'APPROVED'), (28,20,'PENDING'), (28,21,'REJECTED'), (28,22,'REJECTED'), (28,23,'APPROVED'), (28,24,'REJECTED'), (28,25,'REJECTED'), (28,26,'PENDING'), (28,27,'REJECTED'), (28,29,'APPROVED'), (28,30,'REJECTED'), (28,31,'PENDING'), (28,32,'APPROVED'), (28,33,'APPROVED'),
    -- 5 booths
    (29,16,'APPROVED'), (29,17,'REJECTED'), (29,19,'REJECTED'), (29,20,'APPROVED'), (29,21,'REJECTED'), (29,22,'REJECTED'), (29,23,'PENDING'), (29,25,'REJECTED'), (29,26,'PENDING'), (29,27,'APPROVED'), (29,29,'PENDING'), (29,30,'REJECTED'), (29,31,'PENDING'), (29,32,'PENDING'), (29,33,'PENDING'),
    -- 3 booths
    (30,16,'REJECTED'), (30,17,'APPROVED'), (30,20,'APPROVED'), (30,22,'REJECTED'), (30,23,'APPROVED'), (30,28,'REJECTED'), (30,25,'REJECTED'), (30,26,'PENDING'),
    -- 5 booths
    (31,16,'REJECTED'), (31,17,'REJECTED'), (31,19,'APPROVED'), (31,20,'PENDING'), (31,21,'REJECTED'), (31,22,'REJECTED'), (31,23,'APPROVED'), (31,24,'REJECTED'), (31,25,'REJECTED'), (31,26,'PENDING'), (31,27,'REJECTED'), (31,29,'APPROVED'), (31,30,'REJECTED'), (31,31,'PENDING'), (31,32,'APPROVED'), (31,33,'APPROVED'),
    -- 5 booths
    (32,16,'APPROVED'), (32,17,'REJECTED'), (32,19,'REJECTED'), (32,20,'APPROVED'), (32,21,'REJECTED'), (32,22,'REJECTED'), (32,23,'PENDING'), (32,25,'REJECTED'), (32,26,'PENDING'), (32,27,'APPROVED'), (32,29,'PENDING'), (32,30,'REJECTED'), (32,31,'PENDING'), (32,32,'PENDING'), (32,33,'PENDING'),
    -- 3 booths
    (33,16,'REJECTED'), (33,17,'APPROVED'), (33,20,'APPROVED'), (33,22,'REJECTED'), (33,23,'APPROVED'), (33,28,'REJECTED'), (33,25,'REJECTED'), (33,26,'PENDING');

-- Get vendor associated with tags
INSERT INTO "vendor_tags"
    ("user_id", "tag_id")
VALUES
    (2,3), (2,5),
    (3,1), (3,4), (3,5),
    (5,1), (5,2), (5,3), (5,4),
    (6,4), (6,5), (6,6),
    (7,2), (7,3), (7,4), (7,5), (7,6),
    (8,3), (8,5),
    (9,2),
    (11,1), (11,4), (11,5), (11,6),
    (12,3), (12,6),
    (13,2), (13,5),
    (14,4), (14,5),
    (15,1), (15,3), (15,6),
    (16,1), (16,2),
    (17,5), (17,6),
    (18,3), (18,4), (18,5),
    (20,2),
    (21,6),
    (22,2), (22,3), (22,4), (22,5), (22,6),
    (23,1), (23,2), (23,3), (23,4), (23,5), (23,6),
    (24,1), (24,2),
    (25,2), (25,3), (25,5),
    (26,3), (26,4),
    (27,3), (27,5), (27,6),
    (28,1),
    (29,5),
    (30,4), (30,6),
    (31,2), (31,3), (31,4), (31,5),
    (32,1), (32,6),
    (33,1), (33,2), (33,3), (33,4), (33,5), (33,6);