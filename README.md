# Fake Payment API

The Fake Payment API provides fake payment information for **application prototyping purposes**. This API enables the generation of QR code payments.

Explore the [documentation](https://github.com/ricotandrio/fake-payment-gateway-api/blob/master/docs) for detailed information on each endpoint.

## API Installation
To run this API on your local machine, you will need several things. Please make sure to follow each step provided.

### Prerequisites

<div style="clear: both;">
  <a href="https://www.mysql.com/" target="_blank" style="float: left; margin-right: 10px;">
    <img src="https://profilinator.rishav.dev/skills-assets/mysql-original-wordmark.svg" alt="MySQL" height="35" />
  </a>

  <a href="https://nodejs.org/" target="_blank" style="float: left; margin-right: 10px;">
    <img src="https://profilinator.rishav.dev/skills-assets/nodejs-original-wordmark.svg" alt="Node.js" height="50" />
  </a>
</div>

<br/>
<br/>

### Installation

Clone this repository to your local machine and install all necessary dependencies using NPM.

```bash
git clone https://github.com/ricotandrio/fake-payment-api.git

cd fake-payment-api

npm install
```

Create a `.env` file and fill it with this template:

```plaintext
MYSQL_URL=mysql://<username>:<password>@localhost:<port>/<database_name>

JWT_SECRET=<JWT_SECRET>
```

Configure Prisma by running the following commands:

```bash
npx prisma migrate dev

npx prisma generate
```

Once all necessary dependencies are installed and the database is configured, compile and run this API using:

```bash
npm run build

npm run start
```

### Testing
![alt text](public/readme-img/test-unit.png)

To run Jest unit tests with a specific test file, replace `--pathToTestFile` with the path of the test file.

```bash
npm test --pathToTestFile
```

Alternatively, you can run all unit tests by using:

```bash
npm test
```

