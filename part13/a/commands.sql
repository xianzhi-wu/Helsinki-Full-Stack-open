CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes INTEGER DEFAULT 0
);

insert into blogs (author, url, title) values ('xianzhi', 'www.google.com', 'ex 13.2');
insert into blogs (author, url, title) values ('xianzhi-test', 'www.google.com', 'ex 13.2');