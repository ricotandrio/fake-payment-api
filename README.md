# Fake Payment Gateway API 

The Fake Payment Gateway API is an API that provides fake payment information for application prototyping purposes. This API allows generating QR code payments that cannot be scanned as actual payments.

**DISCLAIMER:** This API is created solely for prototype functionality purposes. Any problems caused by this API are not our responsibility.

## API Documentation 
Explore the documentation for detailed information on each endpoint:
1. [Token](https://github.com/ricotandrio/fake-payment-gateway-api/blob/master/docs/token.md)
2. [Transaction](https://github.com/ricotandrio/fake-payment-gateway-api/blob/master/docs/transaction.md)
3. [QR Code](https://github.com/ricotandrio/fake-payment-gateway-api/blob/master/docs/qrcode.md)

## Installation
To run this API, clone this repository to your local machine and install all dependencies used by this API:

```bash
git clone https://github.com/ricotandrio/fake-payment-gateway-api.git

cd fake-payment-gateway-api

npm install 
```

Run this API by using the following command:

```bash
node ./src/app/web.app.ts
```
