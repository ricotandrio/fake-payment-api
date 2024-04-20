# QrCode API Spec

## Create QR Transaction

**Endpoint :** GET /api/qrcode/:transaction_id

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

