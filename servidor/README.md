# API DOCUMENTATION

1. **Create an .env file with the following constants:**
   - NODE_ENV: default as DEVELOPMENT
   - PORT : port where you go to run the server.
   - DB_URL : URI of the mongo database.
   - SECRET : secret key used for JWT
   - EMAIL_HOST= email host provider
   - EMAIL_PORT= port host provider
   - EMAIL_USER= user host provider
   - EMAIL_PASS= password host provider
2. **Install dependencies with npm i**
3. **Run the server with npm run dev (development) or npm start (production)**
   **If you want run the server with npm start, you must build it first with npm run build**

   ***

   **Base Route: `http://URL:PORT/api/v1/pigmeo/`**

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

## POSTMAN DOCUMENTATION

Link here
