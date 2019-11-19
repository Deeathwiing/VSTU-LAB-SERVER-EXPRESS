 create database omVapeShop; 
USE omVapeShop;
CREATE TABLE Users
(
    userId INT Not null AUTO_INCREMENT  UNIQUE,
    fullName VARCHAR(40)  Not null CHECK(fullName !=''),
    userPassword varchar(100) Not null CHECK(userPassword !=''),
    deleteAccountRequest boolean Not null,
   
   
   CONSTRAINT users_pk PRIMARY KEY(userId)
);
 
CREATE TABLE firstNames
(
  userId INT Not null AUTO_INCREMENT  UNIQUE Primary Key,
    firstName VARCHAR(20) Not null CHECK(firstName !=''),
    constraint firstNames_users_fk
    foreign key (userId) references Users ( userId)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE lastNames
(
 userId INT Not null AUTO_INCREMENT  UNIQUE Primary Key,
    lastName VARCHAR(20) Not null CHECK(lastName !=''),
    constraint lastNamess_users_fk
    foreign key (userId) references Users ( userId)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE administration
(
 userId INT Not null AUTO_INCREMENT  UNIQUE Primary Key,
    isAdmin boolean Not null ,
    constraint administration_users_fk
    foreign key (userId) references Users ( userId)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE emails
(
 userId INT Not null AUTO_INCREMENT  UNIQUE Primary Key,
    email VARCHAR(40) Not null CHECK(email !=''),
    constraint emails_users_fk
    foreign key (userId) references Users ( userId)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Items
(
    itemId INT Not null AUTO_INCREMENT UNIQUE,
    price FLOAT(8) not null,
    title varchar(40) not null,
    amount INT not null,
    description VARCHAR(500),	
   CONSTRAINT items_pk PRIMARY KEY(itemId)
);

CREATE TABLE pictures
(
 itemId INT Not null AUTO_INCREMENT UNIQUE Primary Key,
    picture blob Not null ,
    constraint pictures_itemId_fk
    foreign key (itemId) references Items ( itemId)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE rating
(
  Primary Key (userId,itemId),
  userId INT Not null   UNIQUE,
  itemId INT Not null  UNIQUE,
  constraint rating_items_fk
  foreign key (itemId) references Items ( itemId),
    value int Not null ,
   constraint rating_users_fk
    foreign key (userId) references Users ( userId)
    ON DELETE No Action
    ON UPDATE Cascade
);


CREATE TABLE tags
(
  tagId INT Not null AUTO_INCREMENT UNIQUE Primary key,
    tagText varchar(15) Not null 
);

CREATE TABLE itemTags
(
 Primary Key (tagId,itemId),
  tagId INT Not null  UNIQUE,
  itemId INT Not null  UNIQUE,
   constraint itemTags_items_fk
   foreign key (itemId) references Items ( itemId),
   constraint itemTags_tags_fk
    foreign key (tagId) references tags ( tagId)
    ON DELETE No Action
    ON UPDATE Cascade
);