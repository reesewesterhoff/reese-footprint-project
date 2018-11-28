--a table of default site-types, with all solar installation needs
CREATE TABLE site_type (
   id SERIAL PRIMARY KEY,
   type VARCHAR (80) NOT NULL,
   description TEXT,
   power_need INTEGER,
   solar_panel INTEGER,
   inverter INTEGER,
   battery_bank INTEGER,
   generator INTEGER,
   total_price INTEGER,
   category VARCHAR (20),
   jobs_created INTEGER,
   co2_saved INTEGER
);

--we insert all the data for the default site-types
INSERT INTO site_type("type", "description", "power_need", "solar_panel", "inverter", "battery_bank", "generator", "total_price", "category", "jobs_created", "co2_saved")
VALUES('Small Health Clinic', 'Daytime clinic with limited services. Electricity needed for lighting, cold chain, and lab equipment.', 10, 3, 4, 10, null, 25000, 'Health', 2, 64490),
('Urgent Care Clinic', 'Health center with urgent care capabilities. Electricity needed for lighting, cold chain, lab, office, and communications.', 30, 10, 8, 30, null, 80000, 'Health', 3, 214968),
('Emergency Medical Center', '24/7 emergency center with stabilization and referral capabilities. Electicity needed for lighting, cold chain, lab, office, communciations, WASH, and HVAC.', 150, 30, 16, 100, 24, 200000, 'Health', 6, 644904),
('Field Hospital', 'Comprehensive medical center with primary, emergency and surgical capabilities. Electricity needed for lighting, cold chain, lab, office, communications, WASH, HVAC, surgical, and diagnotic equipment.', 1000, 250, 100, 200, 200, 1000000, 'Health', 10, 5374200),
('Community Water Pump', 'Water filtration and distribution at a rate of 1000 liters per hour. Electricity needed for lighting and WASH.', 15, 4, 4, 15, null, 40000, 'Water', 2, 85987),
('Water Treatment Facility', 'Water treatment at a rate of 1 million gallons per day. Electricity needed for lighting, WASH, and office.', 5000, 1000, 1000, 500, 1000, 5000000, 'Water', 30, 21496800),
('Cell Site', 'Stand-alone communications equipment. Electricity needed for communications.', 10, 3, 4, 10, null, 25000, 'Comms', 1, 64490),
('Radio Tower','Communications equipment with on-site work space. Electricity needed for lighting, communications, and office.', 35, 8, 8, 30, 10, 100000, 'Comms', 3, 171974),
('Fire Station', '24/7 department bay with office and equipment storage. Electricity needed for ligthing, communications, office, and HVAC.', 50, 10, 8, 30, 15, 110000, 'Ops', 3, 214968),
('Mobile Command Center', '24/7 modular temporary work space. Electricity needed for ligthing, communications, office, and HVAC.', 25, 6, 8, 15, 10, 80000, 'Ops', 2, 128980),
('Emergency Operations Center', '24/7 central command station with workspace for 30-60 people, specialized communications and visualization equipment. Electricity needed for lighting, communications, office, cold chain, and HVAC.', 100, 25, 16, 80, 24, 160000, 'Ops', 5, 537420),
('Basic Shelter', 'Shelter space for 50 people. Electricity needed for lighting, communications, and office.', 20, 10, 8, 30, null, 70000, 'Shelter', 3, 214968),
('School Shelter', 'Shelter space for 100-200 people. Electricity needed for lighting, communications, cold chain, and office.', 50, 20, 16, 60, 20, 120000, 'Shelter', 4, 429936),
('Food Truck', 'Basic mobile kitchen capable of feeding 100 people per day. Electricity needed for lighting, cold chain, and WASH.', 15, 2, 4, 10, 8, 30000, 'Food', 2, 42994),
('Community Kitchen', 'Commercial kitchen capable of feeding 1000 people per day. Electricity needed for lighting cold chain, WASH, office, and HVAC.', 80, 15, 16, 40, 15, 110000, 'Food', 4, 322452),
('Remote Field Office', 'Workspace for 2-5 people. Electricity needed for lighting, communications, office, and HVAC.', 20, 6, 8, 20, null, 60000, 'Admin', 3, 128981),
('Regional Office', 'Workspace for 10-20 people. Electricity needed for lighting, communications, cold chain, office, and HVAC.', 80, 15, 12, 30, 12, 115000, 'Admin', 4, 322452),
('Headquarters Office', 'Workspace for 30-50 people. Electricity needed for lighting, communications, cold chain, HVAC, and office.', 150, 25, 16, 80, 24, 140000, 'Admin', 5, 537420),
('Distribution Tent', 'Field site tent for distributing goods, staffed by 4-5 people. Electricity needed for lighting and communications.', 5, 2, 3, 6, null, 15000, 'Logs', 2, 42994),
('Small Warehouse', 'Approximately 10,000 square feet/1000 square meters. Electricity needed for lighting and office', 50, 10, 8, 30, null, 60000, 'Logs', 3, 214968),
('Large Warehouse', 'Approximately 50,000 square feet/5000 square meters. Electricity needed for lighting and office', 100, 20, 16, 60, null, 80000, 'Logs', 3, 429936);


--a table of user emails and passwords. A user's email will serve as their "username".
CREATE TABLE "person" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR,
    "password" VARCHAR
);

--projects table. Each project can have multiple sites
CREATE TABLE "projects" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255),
    "user_id" INT REFERENCES "person",
    "image" TEXT
);

--sites table, for projects which have multiple sites
CREATE TABLE "sites" (
    "id" SERIAL PRIMARY KEY,
    "project_id" INT REFERENCES "projects",
    "site_name" VARCHAR(255),
    "site_type_id" INT REFERENCES "site_type",
    "start_date" DATE,
    "end_date" DATE,
    "energy_budget" INT,
    "latitude" DECIMAL,
    "longitude" DECIMAL,
    "appliances" INT[]
);

--table to store all generators
CREATE TABLE "generator" (
    "id" SERIAL PRIMARY KEY,
    "size" INT,
    "unit" VARCHAR(5),
    "fuel_cost" INT,
    "site_id" INT
);

--appliances table. We want users to have the ability to select appliances from a preset list.
--We will populate this table ahead of time with info on power needs of different appliances
CREATE TABLE "appliances" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR,
    "watts" INT
);