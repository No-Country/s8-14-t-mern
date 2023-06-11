# API DOCUMENTATION

1. **Create an .env file with the following constants:**
   - NODE_ENV: default as DEVELOPMENT
   - PORT : port where you go to run the server.
   - DB_URL : connection chaing of the mongo database.
   - FRONTEND_URL : URL of the frontend client.
   - SECRET : secret key used for JWT
   - STRIPE_KEY : secret key Stripe platform
   - CLOUDINARY_URL = URI of cloudinary server
   - EMAIL_HOST= email host provider
   - EMAIL_PORT= port host provider
   - EMAIL_USER= user host provider
   - EMAIL_PASS= password host provider
2. **Install dependencies with npm i**
3. **Run the server with npm run dev (development) or npm start (production)**
   **If you want run the server with npm start, you must build it first with npm run build**

   ***

   **Base Route: `http://URL:PORT/api/v1/pigmeo/`**
   
 <hr/>

## Auth

|    TYPE    |                    DETAIL                     |            ENDPOINT             |                              DATA                              |
| :--------: | :-------------------------------------------: | :-----------------------------: | :------------------------------------------------------------: |
|  **POST**  |                  login user                   |         **users/login**         |                   body: { email, password }                    |
|  **POST**  |                  login user                   |       **users/register**        | body: { firstName, lastname, email, password, repeatPassword } |
|  **GET**   |                  user by id                   |          **users/:id**          |                         params: { id }                         |
|  **PUT**   |                  user by id                   |          **users/:id**          |                    params: { id }, body: {}                    |
| **DELETE** |                  user by id                   |          **users/:id**          |                         params: { id }                         |
|  **GET**   |             confirm user account              |    **users/confirm/:token**     |                       params: { token }                        |
|  **GET**   |            user - forget password             |    **users/forgot-password**    |                        body: { email }                         |
|  **GET**   |     user - forget password - check token      | **users/reset-password/:token** |                       params: { token }                        |
|  **POST**  | user - forget password - confirm new password | **users/reset-password/:token** |             params: { token }, body: { password }              |

### User Schema

| KEY                  | TYPE                            | REQUIRED | DEFAULT                  |
| -------------------- | ------------------------------- | -------- | ------------------------ |
| email                | String                          | YES      | -                        |
| password             | String                          | YES      | -                        |
| firstName            | String                          | YES      | -                        |
| lastname             | String                          | YES      | -                        |
| role                 | String-[admin, user]            | NO       | user                     |
| typeIdentification   | String-[dni, cedula, pasaporte] | NO       | -                        |
| numberIdentification | Number                          | NO       | -                        |
| alias                | String                          | NO       | firstName.lastname.email |
| phoneNumber          | String                          | NO       | -                        |
| country              | String                          | NO       | -                        |
| city                 | String                          | NO       | -                        |
| address              | String                          | NO       | -                        |
| avatar               | String                          | NO       | -                        |
| balance              | Number                          | NO       | 0                        |
| isActive             | Boolean                         | NO       | false                    |
| token                | String                          | NO       | uuid()                   |
| benefices            | Array                           | NO       | -                        |
| topUpCard            | Array                           | NO       | -                        |

<hr/>

## Transactions

|    TYPE    |                    DETAIL                     |                      ENDPOINT                     |                            DATA                          |
| :--------: | :-------------------------------------------: | :-----------------------------------------------: | :------------------------------------------------------: |
|  **POST**  |                verify account                 |         **transactions/verify-account**           |                       body: { alias }                    |
|  **POST**  |               make transaction                |         **transactions/transfer-funds**           |  body: { amount, sender, receiver, reference, status }   |
|  **GET**   |              transactions by id               | **transactions/get-all-transactions-by-user/:id** |                                                          |
|  **POST**  |            deposit funds by Stripe            |       **transactions/deposit-funds-stripe**       |                body: { token, amount, userId }           

### Transaction Schema

| KEY                  | TYPE                            | REQUIRED | DEFAULT                  |
| -------------------- | ------------------------------- | -------- | ------------------------ |
| amount               | Number                          | YES      | -                        |
| sender               | ObjectId                        | YES      | -                        |
| receiver             | ObjectId                        | YES      | -                        |
| reference            | String                          | YES      | -                        |
| charge               | Number                          | NO       | 0                        |
| transaction_type     | String                          | NO       | null                     |
| status               | String                          | NO       | success                  |

<hr/>

## Benefices

|   TYPE   |                 DETAIL                  |                     ENDPOINT                      |                                                            DATA                                                             |
| :------: | :-------------------------------------: | :-----------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------: |
| **POST** |             CREAR BENEFICIO             |         **api/v1/pigmeo/benefice/create**         | body: {name, description, category,startDate,endDate, discountPercentage, cashbackAmount, promoCode, theBest, typeBenefice} |
| **GET**  |      OBTENER TODOS LOS BENEFICIOS       |          **api/v1/pigmeo/benefice/all**           |                                                                                                                             |
| **GET**  |    OBTENER BENEFICIOS POR CATEGORIAS    | **api/v1/pigmeo/benefice/category/:categoryName** |                                                  params: { categoryName }                                                   |
| **GET**  |        OBTENER BENEFICIO POR ID         |      **api/v1/pigmeo/benefice//:idBenefice**      |                                                   params: { idBenefice }                                                    |
| **PUT**  | ACTIVAR/DESACTIVAR BENEFICIO EN USUARIO |        **api/v1/pigmeo/benefice/activate**        |                                            body: { idUser, idBenefice, active }                                             |

<hr/>

## Cards

|    TYPE    |                    DETAIL                     |                      ENDPOINT                     |                            DATA                          |
| :--------: | :-------------------------------------------: | :-----------------------------------------------: | :------------------------------------------------------: |
|  **POST**  |                create new card                 |         **cards/create**           |                       body: { cardType, name, image }                    |
|  **GET**  |               all cards                |         **cards/**           |     |
|  **GET**   |              card by id               | **cards/:id** |                      params: { id of card }                                     |
|  **PATCH**  |            edit card            |       **CardsOfUser/:id**       |                body: { cardType, name, image }, params: { id of card }           

### Card Schema

| KEY                  | TYPE                            | REQUIRED | DEFAULT                  |
| -------------------- | ------------------------------- | -------- | ------------------------ |
| cardType             | String                          |YES       | -                        |
| image                | String                         | YES       | -                        |
| name                 | String                          | YES      | -                        |

<hr/>

## Cards of user

|    TYPE    |                    DETAIL                     |                      ENDPOINT                     |                            DATA                          |
| :--------: | :-------------------------------------------: | :-----------------------------------------------: | :------------------------------------------------------: |
|  **POST**  |                add new card                 |         **cardsOfUser/add-card**           |                       body: { cardOptions, numberCard, userId }                    |
|  **GET**  |               all cards of a user                |         **cardsOfUser/**           |     |
|  **GET**   |              card by id               | **cardsOfUser/:id** |                      params: { id of card of user }                                    |
|  **PATCH**  |            edit card            |       **cardsOfUser/:id**       |                body: { cardOptions, numberCard }, params: { id of card of user }           

### Cards of user Schema

| KEY                  | TYPE                            | REQUIRED | DEFAULT                  |
| -------------------- | ------------------------------- | -------- | ------------------------ |
| balanceCard          | Number                          | NO       | 0                        |
| cardOptions          | ObjectId                        | NO       | -                        |
| numberCard           | Number                          | YES      | -                        |
| userId               | ObjectId                        | NO       | -                        |


<hr/>

## Top-up cards service

|    TYPE    |                    DETAIL                     |                      ENDPOINT                     |                            DATA                          |
| :--------: | :-------------------------------------------: | :-----------------------------------------------: | :------------------------------------------------------: |
|  **POST**  |                top-up card                 |         **topUpCardsService/top-up**           |                       body: { cardOfUserId, amount, userId }                    |
|  **GET**  |               all top-up cards by user                |         **topUpCardsService/top-up-by-user/:id**           |  params: { id of user}   |


### Top-up cards service Schema

| KEY                  | TYPE                            | REQUIRED | DEFAULT                  |
| -------------------- | ------------------------------- | -------- | ------------------------ |
| cardOfUserId         | ObjectId                        | YES      | -                        |
| amount               | Number                          | YES      | -                        |
| userId               | ObjectId                        | YES      | -                        |

<hr/>

