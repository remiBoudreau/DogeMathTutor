# DogeMathTutor
Small Concept App for Tutoring Elementary School Students from Grades 1 to 8

## Collecting the Questions
The questions were scraped from [prodigygame](https://www.prodigygame.com/main-en/blog/math-word-problems/) using beautiful soup. Due to the inconsistent nature of structure of the HTML tree between questions, the parsing of the data was more involved and required more formatting than would be expected from initial glance of the web page. A .txt file with the initial scraping code (python) is also provided to verify these claims. The formatted data was saved to a .csv file using the pandas library.

## Creating Database
A postgreSQL db on Heroku was created using the BaaS Hasura which uses a GraphQL API by default. The db was populated by connecting to the postgresql db:

```bash
psql postgres://<username>:<password>@<host>:<port>/<database>
```
and running the following SQL command:

```SQLcontext
\copy <table_name> from '</path/to/file/filename.csv>' delimiter ',' CSV HEADER;
```

## Starting the app
To start the app use the command
```bash
yarn start
```
in the root directory of the app.


## Using the app
To use the app after running the command above, open localhost:3000 on your machine's web browser. Instructions on the way the app works will be given following an initial fetch to the PostgreSQL db. The calculator may be controlled from either your keyboard, number pad (where the Enter key acts as "=" and the Backspace and Delete keys act as "DEL") or from the buttons on the calculator itself. In a real scenerio the answers would be available or would be enetered, however, due to the nature of this work coupled with there being no answers on the page the questions were scraped from, the answer to each question is "such doge" (case-insensitive). If you choose to leave the page and come back, the page will remain in the last state you had left it in (i.e. it will show the last question you had in the viewport and have the answers you had currently submitted saved). This was done to allow students to continue working from their last checkpoint, so to speak.

[Demo](https://doge-math-tutor.vercel.app/)
