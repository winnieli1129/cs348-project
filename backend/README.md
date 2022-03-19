# POS System Backend

### Prerequisites

* Node.js v16.14.0

## Getting Started
Navigate to `pos` directory

### Install Dependecy
#### `npm install`

## Usage
In the `pos` directory, run:

### `npm start`
Runs the server in the development mode.

Open [http://127.0.0.1:8080/](http://127.0.0.1:8080/) to view it in the browser.

### `sequelize db:migrate`
Run all migrations files in `/pos/migrations`. Whenever, change to databse model is made, run the command.

### `sequelize db:migrate:undo:all`
Undo all previous migrations.

### `gcloud run deploy pos --source . --region='us-central1'`
Deploy the app onto GCP Cloud Run.

App will be hosted on [https://pos-sijggu6trq-uc.a.run.app](https://pos-sijggu6trq-uc.a.run.app)

## API Endpoint Authorization
`Authorization: 'jwt token'`

## API Endpoints
### Endpoints for customer
#### `POST /customer-register`
```
Body: {
    "name": string,
    "email": string,
    "phone_number": string,
    "password": string
}
```
#### `POST /delete-customer`
Require jwt token
```
Body: {
    "customer_id": integer
}
```
#### `POST /update-customer`
Require jwt token
```
Body: {
    "customer_id": integer,
    "name": string (optional),
    "email": string (optional),
    "phone_number": string (optional),
    "password": string (optional)
}
```
#### `POST /customer-login`
```
Body: {
    "email": string,
    "password": string
}
```
#### `GET /get-customer`
Require jwt token
```
Body: {
    "customer_id": integer
}
```

### Endpoints for product
#### `POST /create-product`
Require employee's jwt token
```
Body: {
    "serial_number": string,
    "product_name": string,
    "price": double
}
```
#### `POST /update-product`
Require employee's jwt token
```
Body: {
    "product_id": integer (optional if there is serial_number)
    "serial_number": string (optional if there is product_id),
    "product_name": string (optional),
    "price": double (optional)
}
* need to have either product_id or serial_number. For updating serial_number, product_id is required.
```
#### `POST /delete-product`
Require employee's jwt token
```
Body: {
    "product_id": integer (optional if there is serial_number)
    "serial_number": string (optional if there is product_id)
}
* need to have either product_id or serial_number.
```
#### `GET /get-product`
Require employee's jwt token
```
Querystring: {
    "product_id": integer (optional if there is serial_number),
    "serial_number": string (optional if there is product_id)
}
* need to have either product_id or serial_number.
```
#### `GET /get-products`
Require employee's jwt token
```
Body: {}
```

### Enpoints for employee
#### `POST /employee-register`
```
Body: {
    "store_id": integer,
    "name": string,
    "email": string,
    "password": string
}
```
#### `POST /update-employee`
Require employee's jwt token
```
Body: {
    "employee_id": integer,
    "store_id": integer (optional),
    "name": string (optional),
    "email": string (optional),
    "password": string (optional)
}
```
#### `POST /employee-login`
```
Body: {
    "email": string,
    "password": string
}
```
#### `POST /delete-employee`
Require employee's jwt token
```
Body: {
    "employee_id": integer
}
```
#### `GET /get-employee`
Require employee's jwt token
```
Querystring: {
    "employee_id": integer
}
```

### Enpoints for order
#### `POST /create-order`
Require employee's jwt token
```
Body: {
    "customer_id": integer (optional),
    "store_id": integer,
    "prodcuts": [
        {
            "serial_number": string,
            "quantity": integer
        }
    ]
}
```
This will also update inventory quantity and return error if there is not enought stock.

#### `POST /delete-order`
Require employee's jwt token
```
Body: {
    "order_id": integer
}
```
#### `POST /get-store-orders`
Require employee's jwt token
```
Querystring: {
    "store_id": integer
}
```
#### `POST /get-customer-orders`
Require jwt token
```
Querystring: {
    "store_id": integer
}
```

#### `POST /get-orders`
Require employee's jwt token
```
Body: {}
```

### Endpoints for store
#### `POST /create-store`
Require employee's jwt token
```
Body: {
    "address" : string
    "phone_number" : string
}
```

#### `POST /update-store`
Require employee's jwt token
```
Body: {
    "store_id": integer,
    "address": string (optional),
    "phone_number": string (optional)
}
```

#### `GET /get-store`
```
Querystring: {
    "store_id": integer
}
```

#### `GET /get-stores`
```
Body: {}
```

#### `POST /delete-store`
Require employee's jwt token
```
Body: {
    "store_id": integer
}
```

### Endpoints for inventory
#### `POST /create-inventory`
Require employee's jwt token
```
Body:{
    "product_id" : integer,
    "store_id" : integer,
    "quantity": integer
}
```

#### `POST /delete-inventory`
Require employee's jwt token
```
Body:{
    "inventory_id" : integer
}
```

#### `POST /update-inventory`
Require employee's jwt token
```
Body:{
    "inventory_id" : integer,
    "quantity" : integer
}
```
*quantity cannot be less than 0

#### `GET /get-inventory`
Require employee's jwt token
```
Querystring:{
    "inventory_id" : integer
}
```

#### `GET /get-inventories`
Require employee's jwt token
```
Querystring:{
    "store_id" : integer (optional),
    "product_id" : integer (optional)
}
```
Returns all inventories if you provide neither store_id nor product_id.
Returns all inventories at a certain store if you provide store_id and not product_id.
Returns all inventories of a certain product if you provide product_id and not store_id.
Returns only the inventory of the requested product at the requested store if you provide both.