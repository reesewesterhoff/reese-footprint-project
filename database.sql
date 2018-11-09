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
   total_price INTEGER
);

--we insert all the data for the default site-types
INSERT INTO site_type("type", "description", "power_need", "solar_panel", "inverter", "battery_bank", "generator", "total_price")
VALUES('Small Health Clinic', 'Daytime clinic with limited services. Electricity needed for lighting, basic cold chain and simple lab equipment.', 10, 3, 4, 10, null, 25000),
('Urgent Care Clinic', 'Health center with urgent care capabilities. Electricity needed for lighting, cold chain, lab, office and communications.', 30, 10, 8, 30, null, 80000),
('Emergency Medical Center', '24/7 emergency center with stabilization and referral capabilities. Electicity needed for lighting, cold chain, lab, office, communciations, and HVAC.', 150, 30, 16, 100, 20, 140000),
('Hospital', 'Comprehensive medical center with primary, emergency and surgical capabilities. Electricity needed for lighting, cold chain, lab, office, communications, HVAC, surgical and sophisticated diagnotic services.', 1000, 200, 100, 200, 140, 800000),
('Community Water Pump', 'Water filtration and distribution at a rate of 1000 liters per hour.', 15, 4, 4, 15, null, 40000),
('Regional Radio Tower', null, 25, 6, 8, 30, 10, 100000),
('Fire Station', null, 40, 10, 8, 20, null, 90000),
('School Shelter', 'Lighting and Communication', 50, 20, 16, 60, 20, 120000);


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
    "user_id" INT REFERENCES "person"
);

--sites table, for projects which have multiple sites
CREATE TABLE "sites" (
    "id" SERIAL PRIMARY KEY,
    "project_id" INT REFERENCES "projects",
    "site_name" VARCHAR(255),
    "site_type_id" INT REFERENCES "site_type",
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