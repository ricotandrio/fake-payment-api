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
    "merchant_id": "MB001",
    "amount": "10000",
    "currency_symbol": "IDR",
    "payment_type": "qris",
    "transaction_time": "2020-09-29 11:46:13",
    "transaction_status": "pending"
  },
  "actions": {
    "name": "generate-qrcode",
    "method": "GET",
    "url": "/api/transaction/qrcode/e6723674-bf2f-4a5b-9175-17b3bf3deaf9"
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
  "merchant_id": "MB001",
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

## Create QR Transaction

**Endpoint :** GET /api/transaction/qrcode/:transaction_id

**Response Body (Success):**

```json
{
  "code": 200,
  "message": "QRCode Generated",
  "qrcode": qrcode.png
}
```

**Response Body (Failed):**

```json
{
  "code": 404,
  "message": "Transaction not found"
}
```
