import express, { Request, Response } from 'express';

const app = express();
const port = 5000;

/* -----> Start the Server <----- */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/* -----> Routes <----- */

app.get('/', (req: Request, res: Response) => {
  console.log('I am Home Route');
  res.send('I am Home route');
});
