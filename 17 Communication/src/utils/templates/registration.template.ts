export const userRegistration = (
  companyName: string,
  userName: string
) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Registration Successful</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f7f7f7;
        margin: 0;
        padding: 0;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #4caf50;
        text-align: center;
      }
      p {
        line-height: 1.6;
        color: #666;
      }
      .btn {
        display: block;
        width: fit-content;
        padding: 10px 20px;
        margin: 20px auto;
        background-color: #4caf50;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 20px;
        font-size: 12px;
        text-align: center;
        color: #999;
      }
      .footer a {
        color: #4caf50;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome to ${companyName} Company!</h1>
      <p>Hello ${userName},</p>
      <p>
        We're excited to have you join us! You've successfully registered on our
        platform. Now you can start exploring all the features we have to offer.
      </p>
      <p>
        If you have any questions, feel free to reply to this email or visit our
        help center for more information.
      </p>      
    </div>
  </body>
</html>
`;
