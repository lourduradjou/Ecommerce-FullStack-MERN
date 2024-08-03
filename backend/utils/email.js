const catchAsyncError = require('../middlewares/catchAsyncError.Middleware'); // Import the middleware for handling async errors
const nodemailer = require('nodemailer'); // Import the nodemailer module for sending emails

// Define the sendEmail function which is wrapped in the catchAsyncError middleware
const sendEmail = catchAsyncError(async (options) => {
    // Configure the transport settings for the email service
    const transport = {
        host: process.env.SMTP_HOST, // SMTP server host (e.g., 'smtp.mailtrap.io')
        port: process.env.SMTP_PORT, // SMTP server port (e.g., 587 for TLS or 465 for SSL)
        auth: {
            user: process.env.SMTP_USER, // SMTP username (authentication)
            pass: process.env.SMTP_PASS, // SMTP password (authentication)
        },
    };

    // Create a transporter object using the SMTP transport settings
    const transporter = nodemailer.createTransport(transport);

    // Define the email message to be sent
    const message = {
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`, // Sender's name and email address
        to: options.email, // Recipient's email address
        subject: options.subject, // Subject of the email
        text: options.message, // Body text of the email
    };

    // Send the email using the transporter
    await transporter.sendMail(message);
});

// Export the sendEmail function for use in other parts of the application
module.exports = sendEmail;
