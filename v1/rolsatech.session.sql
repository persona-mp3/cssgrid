CREATE TABLE bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(80) NOT NULL,
    lastName VARCHAR(80) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    type ENUM('Consultation', 'Installation', 'Other'),
    phone VARCHAR(20) UNIQUE NOT NULL DEFAULT 'None Provided',
    address VARCHAR(255) NOT NULL,
    postcode VARCHAR(10) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    password TEXT NOT NULL,
    firstLogin BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- I decided to change the schema as the previous one in the design documnet was 
-- complex and stored unneccesarry data in different parts
-- I modified the database to only store users who have bookings, and can sign in to manage it

-- @block
alter table bookings modify password text null;


--@block
alter table bookings modify phone varchar(20) null;
