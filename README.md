# E-Commerce Back End

![Sequelize](https://img.shields.io/badge/6.3.5-0?label=Sequelize&style=for-the-badge&labelColor=white&color=black) ![Express](https://img.shields.io/badge/4.17.1-0?label=Express&style=for-the-badge&labelColor=white&color=black) ![mysql2](https://img.shields.io/badge/2.2.1-0?label=mysql2&style=for-the-badge&labelColor=white&color=black) ![dotenv](https://img.shields.io/badge/8.2.0-0?label=dotenv&style=for-the-badge&labelColor=white&color=black)

## Introduction

This RESTful e-commerce back end allows developers to perform CRUD API calls like view, add, update and delete. It would allow a developer to test requests using Insomnia to prepare for front-end integration.

This CLI application uses npm packages `Express`, `Sequelize`, `mysql2` and `chalk`.

I made this app in order to learn how to implement a database model using Sequelize.

I used GitHub Projects and various Pull Requests to create this app: https://github.com/leoelicos/bcs-13-ecommerce-back-end/projects/1

## Installation

Source code: [Ecommerce Back End on GitHub](https://github.com/leoelicos/bcs-13-ecommerce-back-end).

| Step                          | Instruction                                                            |
| ----------------------------- | ---------------------------------------------------------------------- |
| install node                  | https://nodejs.org/en/download/                                        |
| install mysql                 | https://dev.mysql.com/downloads/installer/                             |
| install insomnia              | https://insomnia.rest/download                                         |
| clone this repo               | `git clone https://github.com/leoelicos/bcs-13-ecommerce-back-end.git` |
| Go inside the database folder | `cd db`                                                                |
| invoke mysql                  | `mysql -u root -p`                                                     |
| Enter your mysql password     | `{password}`                                                           |
| Create schema                 | `source schema.sql`                                                    |
| (optional) Add dummy data     | `source seeds.sql`                                                     |
| Exit mysql                    | `exit`                                                                 |
| Import dependencies           | `npm i`                                                                |
| Start the app                 | `npm start`                                                            |
| Start testing                 | Open Insomnia                                                          |

## Demo

### Video demo

TBA

Also on YouTube … [TBA](**)

## Usage

### Insomnia

| Menu | What it does      |
| ---- | ----------------- |
| +    | Add a new request |

## Screenshots

### Screenshot: Insomnia GET

![Screenshot: Insomnia GET](TBA)

## Credits

- BCS Resources

## License

&copy; Leo Wong <leoelicos@gmail.com>

Licensed under the [MIT License](./LICENSE).
