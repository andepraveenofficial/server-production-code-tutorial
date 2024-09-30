import prisma from './config/prisma';
import path from 'path';
import dotenv from 'dotenv';

/* -----> Express Instance <----- */
import app from './app';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

/* -----> Start the Server <----- */
// console.log(process.env.PORT);
// const port = 5000;
const port = process.env.PORT ?? 5000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/* -----> Database Connection <------ */
async function testDbConnection() {
  try {
    await prisma.$connect();
    console.log('Connected to the database successfully.');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

/* -----> nodemailer <----- */
import transporter from './config/nodemailer';

// Verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error while connecting to SMTP server:', error);
  } else {
    console.log('SMTP server connected successfully:', success);
  }
});

testDbConnection();
