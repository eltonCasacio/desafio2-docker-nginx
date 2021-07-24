use desafiodb

create table people(
    id int not null auto_increment,
    name varchar(100),
    primary key(id)
);

insert into people(name) values('Elton');
INSERT INTO people(name) values('Roberto');
INSERT INTO people(name) values('Daniel');
INSERT INTO people(name) values('Casacio');