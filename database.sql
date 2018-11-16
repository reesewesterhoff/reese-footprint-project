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
   category VARCHAR (20)
);

--we insert all the data for the default site-types
INSERT INTO site_type("type", "description", "power_need", "solar_panel", "inverter", "battery_bank", "generator", "total_price", "category")
VALUES('Small Health Clinic', 'Daytime clinic with limited services. Electricity needed for lighting, basic cold chain, and simple lab equipment.', 10, 3, 4, 10, null, 25000, 'Health'),
('Urgent Care Clinic', 'Health center with urgent care capabilities. Electricity needed for lighting, cold chain, lab, office, and communications.', 30, 10, 8, 30, null, 80000, 'Health'),
('Emergency Medical Center', '24/7 emergency center with stabilization and referral capabilities. Electicity needed for lighting, cold chain, lab, office, communciations, and HVAC.', 150, 30, 16, 100, 24, 140000, 'Health'),
('Hospital', 'Comprehensive medical center with primary, emergency and surgical capabilities. Electricity needed for lighting, cold chain, lab, office, communications, HVAC, surgical, and sophisticated diagnotic services.', 1000, 250, 100, 200, 200, 1000000, 'Health'),
('Community Water Pump', 'Water filtration and distribution at a rate of 1000 liters per hour.', 15, 4, 4, 15, null, 40000, 'Water'),
('Water Treatment Facility', null, 1000, 200, 100, 200,	140, 800000, 'Water'),
('Cell Site', 'Stand-alone communications equipment.', 10, 3, 4, 10, null, 25000, 'Comms'),
('Radio Tower','Communications equipment with on-site work space.', 35, 8,	8, 30, 10, 100000, 'Comms'),
('Fire Station', '24/7 fire department bay with engine and equipment storage.', 40, 10, 8, 20, 10, 90000, 'Ops'),
('Mobile Command Center', '24/7 modular temporary work space.', 25, 6, 8, 15, 15, 80000, 'Ops'),
('Emergency Operations Center', null, null, null, null, null, null, null, 'Ops'),
('Basic Shelter', 'Shelter space for...', null, null, null, null, null, 120000, 'Shelter'),
('Large Shelter', 'Shelter space for...', 50, 20, 16, 60, 20, null, 'Shelter'),
('Food Truck', null, null, null, null, null, null, null, 'Food'),
('Community Kitchen', null, 15,	4, 4, 15, null, 40000, 'Food'),
('Remote Field Office', 'Workspace for 2-10 people. Electricity needed for lighting, communications, and office space.', null, null, null, null, null, null, 'Admin'),
('Regional Office', 'Workspace for 10-30 people. Electricity needed for lighting, communications, cold chain, and office space.', null, null, null, null, null, null, 'Admin'),
('Headquarters Office', 'Workspace for 30-60 people. Electricity needed for lighting, communications, cold chain, HVAC, and office space.', null, null, null, null, null, null, 'Admin'),
('Small Warehouse', null, null, null, null, null, null, null, 'Logs'),
('Large Warehouse', null, null, null, null, null, null, null, 'Logs');


------------------------------------------ BELOW IS STRETCH MODE --------------------------------------------

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
    "country" VARCHAR(255),
    "user_id" INT REFERENCES "person"
);

--sites table, for projects which have multiple sites
CREATE TABLE "sites" (
    "id" SERIAL PRIMARY KEY,
    "project_id" INT REFERENCES "projects",
    "site_name" VARCHAR(255),
    "site_type_id" INT REFERENCES "site_type",
    "energy_budget" INT,
    "start_date" DATE,
    "end_date" DATE,
    "latitude" DECIMAL,
    "longitude" DECIMAL,
    "appliances" INT[]
);


--appliances table. We want users to have the ability to select appliances from a preset list.
--We will populate this table ahead of time with info on power needs of different appliances
CREATE TABLE "appliances" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR,
    "watts" INT
);