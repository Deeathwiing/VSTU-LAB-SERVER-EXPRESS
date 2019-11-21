create database om_vape_shop; 
USE om_vape_shop;
CREATE TABLE users
(
    id INT AUTO_INCREMENT  UNIQUE,
    user_password varchar(100) Not null CHECK(user_password !=''),
    delete_account_request boolean Not null,
    first_name VARCHAR(20) Not null CHECK(first_name !=''),
    last_name VARCHAR(20) Not null CHECK(last_name !=''),
	email VARCHAR(40) Not null CHECK(email !=''),
	user_update TIMESTAMP Default Null, 
	user_create TIMESTAMP Default Null, 
    
    CONSTRAINT users_pk PRIMARY KEY(id)
   
);
 
CREATE TABLE products
(
    id INT Not null AUTO_INCREMENT UNIQUE,
    price FLOAT(8) not null,
    title varchar(40) not null,
    amount INT not null,
    product_description VARCHAR(500),	
	picture blob Not null ,
    CONSTRAINT products_pk PRIMARY KEY(id)
);

CREATE TABLE rating
(
    id INT Not null AUTO_INCREMENT UNIQUE,
	Primary Key (id),
	user_id INT,
	item_id INT Not null,
    rating_value int,
    
	constraint rating_products_fk
	foreign key (item_id) references products ( id )
    ON DELETE cascade
    ON UPDATE Cascade,
    
	constraint rating_users_fk
    foreign key (user_id) references users ( id )
    ON DELETE Set Null
    ON UPDATE Cascade
);


CREATE TABLE tags
(
	id INT Not null AUTO_INCREMENT UNIQUE,
	tag_id INT Not null UNIQUE Primary key,
    tag_text varchar(15) Not null 
);

CREATE TABLE products_tags
(
	id INT Not null AUTO_INCREMENT UNIQUE,
	Primary Key (tag_id,product_id),
	tag_id INT Not null  UNIQUE,
	product_id INT Not null  UNIQUE,
    
	constraint product_tags_product_fk
	foreign key (product_id) references products ( id)
    ON DELETE Cascade
    ON UPDATE Cascade,
    
	constraint product_tags_tag_fk
	foreign key (tag_id) references tags ( tag_id)
    ON DELETE Cascade
    ON UPDATE Cascade
);

CREATE TABLE roles
(
    id INT Not null AUTO_INCREMENT UNIQUE,
	Primary Key (user_id),
	user_id INT,
    user_role varchar(15),
    
	constraint roles_users_fk
    foreign key (user_id) references users ( id )
    ON DELETE Cascade
    ON UPDATE Cascade
   
);