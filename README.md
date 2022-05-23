# E-Commerce Back End

![Sequelize](https://img.shields.io/badge/6.3.5-0?label=Sequelize&style=for-the-badge&labelColor=white&color=black) ![Express](https://img.shields.io/badge/4.17.1-0?label=Express&style=for-the-badge&labelColor=white&color=black) ![mysql2](https://img.shields.io/badge/2.2.1-0?label=mysql2&style=for-the-badge&labelColor=white&color=black) ![dotenv](https://img.shields.io/badge/8.2.0-0?label=dotenv&style=for-the-badge&labelColor=white&color=black)

## Introduction

This RESTful e-commerce back end allows developers to perform CRUD API calls like view, add, update and delete. It would allow a developer to test requests using Insomnia to prepare for front-end integration.

This CLI application uses npm packages `Express`, `Sequelize`, `mysql2` and `dotenv`.

I made this app in order to learn how to implement a database model using Sequelize.

I used GitHub Projects and various Pull Requests to create this app: https://github.com/leoelicos/bcs-13-ecommerce-back-end/projects/1

## Installation

### 0. Required

| Programs   | Download links                             |
| ---------- | ------------------------------------------ |
| `Node`     | https://nodejs.org/en/download/            |
| `Mysql`    | https://dev.mysql.com/downloads/installer/ |
| `Insomnia` | https://insomnia.rest/download             |

### 1. Git clone and go inside

```sh
git clone https://github.com/leoelicos/bcs-13-ecommerce-back-end.git

cd bcs-13-ecommerce-back-end
```

### 2. Rename `.env.EXAMPLE` to `.env`

```sh
mv .env.Example .env
```

Input your Mysql credentials. _Don't forget to save!_

- `DB_USER={username}`
- `DB_PW={password}`

### 3. Go inside `db`, invoke `Mysql`, enter {password}, run `schema`

```sh
cd db

mysql -u root -p

{password}

source schema.sql;

exit
```

### 4. Return to root, install dependencies, (optionally) run seed

```sh
cd ..

npm install

//optional
npm run seed
```

## Usage

1. Start the server: `npm start`

2. Access the APIs with Insomnia

## Video Demo

https://user-images.githubusercontent.com/99461390/169060902-aa4b208f-06e7-4906-9732-afa4881f74bc.mp4

## API

### Base URL

All URLs start with `http://localhost:3001/api/`.

No API key or authentication is required.

---

### Searching

GET request to `/{type}` searches for items which have a specified type.

Possible types include:

- categories: `categories`
- tags: `tags`
- products: `products`
- product tags: `product_tags`

**Example**:

```sh
GET http://localhost:3001/api/categories
```

---

### Requesting a specific item

GET request to `/{type}/{id}` searches for items which have a specified type and specified id.

Possible types include:

- categories: `categories`
- tags: `tags`
- products: `products`

**Example**:

```sh
GET http://localhost:3001/api/categories/1
```

---

### Adding a specific item

POST request to `/{type}/` adds an item of the specified type. You need to include a JSON with a valid body.

Possible types and the JSON body:

| `{type}`     | JSON                                                                                                                  |
| ------------ | --------------------------------------------------------------------------------------------------------------------- |
| `categories` | `{ "category_name": STRING }`                                                                                         |
| `tags`       | `{ "tag_name": STRING, "productIds": [INTEGER, INTEGER…] }`                                                           |
| `products`   | `{ "product_name": STRING, "price": DECIMAL, "stock": INTEGER, category_id: INTEGER, "tagIds": [INTEGER, INTEGER…] }` |

**Example**

```sh
POST http://localhost:3001/api/tags/
{ "tag_name": "Golf", "productIds": [3] }
```

---

### Editing a specific item

PUT request to `/{type}/` edits an item of the specified type. You need to include a JSON with a valid body.

Possible types and the JSON body:

| `{type}`     | JSON                                                                                                                  |
| ------------ | --------------------------------------------------------------------------------------------------------------------- |
| `categories` | `{ "category_name": STRING }`                                                                                         |
| `tags`       | `{ "tag_name": STRING, "productIds": [INTEGER, INTEGER…] }`                                                           |
| `products`   | `{ "product_name": STRING, "price": DECIMAL, "stock": INTEGER, category_id: INTEGER, "tagIds": [INTEGER, INTEGER…] }` |

**Example**

```sh
PUT http://localhost:3001/api/products/
{ "product_name": "Baseball Bats", "price": 20.00, "stock": 3, category_id: 2, "tagIds": [2] }
```

---

### Deleting a specific item

DELETE request to `/{type}/{id}` deletes items which have a specified type and specified id.

Possible types include:

- categories: `categories`
- tags: `tags`
- products: `products`

**Example**:

```sh
DELETE http://localhost:3001/api/categories/1
```

---

## Example of API response

Request:

```sh
GET http://localhost:3001/api/categories
```

Response:

```sh
[
	{
		"id": 1,
		"category_name": "Shirts",
		"products": []
	},
	{
		"id": 2,
		"category_name": "Shorts",
		"products": [
			{
				"id": 5,
				"product_name": "Cargo Shorts",
				"price": 30,
				"stock": 22,
				"category_id": 2
			}
		]
	}
]
```

## Screenshots

### Screenshot: Insomnia GET Product Tags

![Screenshot: Insomnia GET Product Tags](https://user-images.githubusercontent.com/99461390/169060661-d4b69c7f-3e09-4109-b11d-67c57a3c0ee2.jpg)

## Credits

- BCS Resources

## License

&copy; Leo Wong <leoelicos@gmail.com>

Licensed under the [MIT License](./LICENSE).
