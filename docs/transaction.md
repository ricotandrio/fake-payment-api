# Transaction API Spec

## Create Pay Transaction

**Endpoint :** POST /api/transaction

**Request Body :**

```json
{
  "payment_type": "qris",
  "transaction_detail": {
    "order_id": "O-123-456",
    "amount": "10000"
  },
  "customer_detail": {
    "customer_id": "USER001",
    "customer_name": "User Name",
    "customer_email": "username@mail.com",
    "customer_phone": "0812356789"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
}
```

**Response Body (Success):**

```json
{
  "code": 201,
  "message": "QR Transaction is Created",
  "transaction": {
    "transaction_id": "e6723674-bf2f-4a5b-9175-17b3bf3deaf9",
    "order_id": "O-123-456",
    "merchant_id": "mejabelajar.web.app",
    "amount": "10000",
    "currency_symbol": "IDR",
    "payment_type": "qris",
    "transaction_time": "2020-09-29 11:46:13",
    "transaction_status": "pending"
  },
  "actions": {
    "name": "generate-qrcode",
    "method": "GET",
    "url": "/api/qrcode/e6723674-bf2f-4a5b-9175-17b3bf3deaf9"
  }
}
```

**Response Body (Completed):**

```json
{
  "code": 200,
  "message": "QR Transaction is Completed",
  "transaction_id": "e6723674-bf2f-4a5b-9175-17b3bf3deaf9",
  "order_id": "O-123-456",
  "merchant_id": "mejabelajar.web.app",
  "amount": "10000",
  "currency_symbol": "IDR",
  "payment_type": "qris",
  "transaction_time": "2020-09-29 11:46:13",
  "transaction_status": "completed"
}
```

**Response Body (Expired):**

```json
{
  "code": 202,
  "message": "QR Transaction is Expired",
  "transaction_id": "e6723674-bf2f-4a5b-9175-17b3bf3deaf9",
  "order_id": "O-123-456",
  "merchant_id": "MB001",
  "amount": "10000",
  "currency_symbol": "IDR",
  "payment_type": "qris",
  "transaction_time": "2020-09-29 11:46:13",
  "transaction_status": "expired"
}
```

**Response Body (Failed):**

```json
{
  "code": 404,
  "message": "Failed to create Transaction"
}
```

## Get Transaction By Id

**Endpoint :** GET /api/transaction/:id

**Response Body (Success):**

```json
{
  "code": 200,
  "message": "Transaction found",
  "data": {
    "transaction_id": "123456789",
    "merchant": {
      "merchant_id": "mejabelajar.web.app",
      "merchant_name": "Meja Belajar",
      "merchant_email": "admin@mejabelajar.com",
      "merchant_phone": "12345678",
      "merchant_address": "Jakarta, Indonesia",
      "merchant_country": "Indonesia",
      "merchant_fee": 0,
      "currency_symbol": "IDR"
    },
    "currency": {
      "currency_symbol": "IDR",
      "currency_name": "Indonesia Rupiah"
    },
    "customer_id": "MCS001",
    "transaction_status": "completed",
    "transaction_amount": 50000,
    "transaction_date": "2024-04-20T12:00:00Z",
    "transaction_updated": "2024-04-20T12:05:00Z",
    "payment_method": "qrcode"
  }
}
```

**Response Body (Failed):**

```json
{
  "code": 404,
  "message": "Transaction not found",
}
```

## Get All Transaction


**Endpoint :** GET /api/transactions

**Response Body (Success):**

```json
{
  "code": 200,
  "message": "Get all transactions",
  "data": [
    {
      "transaction_id": "123456789",
      "merchant": {
        "merchant_id": "mejabelajar.web.app",
        "merchant_name": "Meja Belajar",
        "merchant_email": "admin@mejabelajar.com",
        "merchant_phone": "12345678",
        "merchant_address": "Jakarta, Indonesia",
        "merchant_country": "Indonesia",
        "merchant_fee": 0,
        "currency_symbol": "IDR"
      },
      "currency": {
        "currency_symbol": "IDR",
        "currency_name": "Indonesia Rupiah"
      },
      "customer_id": "MCS001",
      "transaction_status": "completed",
      "transaction_amount": 50000,
      "transaction_date": "2024-04-20T12:00:00Z",
      "transaction_updated": "2024-04-20T12:05:00Z",
      "payment_method": "qrcode"
    }
  ]
}
```
