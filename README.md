## Backend Assessment with Node Express Mongoose

Applicaiotn for getting questions annotated by either of the sub-topics of a topic provided in the search query

## Usage

    git clone git@github.com:zelalem-12/backend-assessment.git
    cd backend-assessment
    npm install
    cp .env.example .env
    npm run start:dev

Checkout the [The Live Demo](https://pencilchallenge.herokuapp.com/)

## Seeder

To reseed the databse

```sh
DBURI='Your Databse URL' npm run seed
```

To seed the database with new Dataset

Update the [questions](https://github.com/zelalem-12/backend-assessment/blob/master/dataSheets/questions.csv) and [topics](https://github.com/zelalem-12/backend-assessment/blob/master/dataSheets/topics.csv) csv run files and run the following command

```sh
DBURI='Your Databse URL' npm run seed
```
