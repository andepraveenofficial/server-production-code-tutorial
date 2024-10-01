import transporter from '../config/nodemailer';
import { userRegistration } from './templates/registration.template';

export const sendRegistrationEmail = async (
  email: string,
  firstName: string,
  lastName: string,
): Promise<void> => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM, // sender address
      to: email, // recipient address
      subject: 'Welcome to Our Platform', // Subject line
      text: `Hello ${firstName} ${lastName}, welcome to our platform!`, // plain text body
      html: userRegistration(firstName, lastName), // html body
    });

    console.log('Registration email sent: ', info.messageId);
  } catch (error) {
    console.error('Error sending registration email:', error);
    // Depending on your error handling strategy, you might want to throw this error
    // or handle it in some other way
    throw new Error('Failed to send registration email');
  }
};
