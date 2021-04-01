/* eslint-disable max-len */
const functions = require("firebase-functions");
const config = functions.config();
const admin = require("firebase-admin");
admin.initializeApp();

const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

const transporter = nodemailer.createTransport({
  service: "Gmail",
  // firebase functions:config:set user.email= "noreply.arcDevelopment.com"
  // firebase functions:config:set user.pass= "xyz"
  auth: { user: config.user.email, pass: config.user.password },
});

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.sendMail = functions.https.onRequest((request, response) => {
  //   functions.logger.info("Hello logs!", {structuredData: true});
  cors(request, response, () => {
    const {
      name,
      email,
      phone,
      message,
      total,
      // eslint-disable-next-line no-unused-vars
      service,
      platforms,
      features,
      customFeatures,
      users,
      category,
    } = request.query;

    let mailOptions = {};

    if (total) {
      if (category) {
        mailOptions = {
          from: "Arc Development",
          to: "firojvsfacebook@gmail.com",
          subject: "Estimate Received",
          html: `
        <p style="font-size:16px">From:${name}</p>
        <p style="font-size:16px">Email:${email}</p>
        <p style="font-size:16px">Phone Number:${phone}</p>
        <p style="font-size:16px">Message:${message}</p>
        <p style="font-size:16px">Total:${total}</p>
        <p style="font-size:16px">Service:${service}</p>
        <p style="font-size:16px">Category:${category}</p>
        `,
        };
      }
      mailOptions = {
        from: "Arc Development",
        to: "firojvsfacebook@gmail.com",
        subject: "Estimate Received",
        html: `
        <p style="font-size:16px">From:${name}</p>
        <p style="font-size:16px">Email:${email}</p>
        <p style="font-size:16px">Phone Number:${phone}</p>
        <p style="font-size:16px">Message:${message}</p>
        <p style="font-size:16px">Total:${total}</p>
        <p style="font-size:16px">Service:${service}</p>
        <p style="font-size:16px">Platforms:${platforms}</p>
        <p style="font-size:16px">Features:${features}</p>
        <p style="font-size:16px">Custom Features:${customFeatures}</p>
        <p style="font-size:16px">Users:${users}</p>
        `,
      };
      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          response.send(error);
        } else {
          response.send("Message sent successfully");
        }

        const receiptMailOptions = {
          from: "Arc Development",
          to: email,
          subject: "Order Acknowledged",
          html: `
          Thanks for placing your estimate request! We'll go over the details and get back to you as soon as possible.
        `,
        };
        transporter.sendMail(receiptMailOptions);
      });
    } else {
      mailOptions = {
        from: "Arc Development",
        to: "firojvsfacebook@gmail.com",
        subject: "Message Received",
        html: `
        <p style="font-size:16px">From:${name}</p>
        <p style="font-size:16px">Email:${email}</p>
        <p style="font-size:16px">Phone Number:${phone}</p>
        <p style="font-size:16px">Message:${message}</p>
        `,
      };
      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          response.send(error);
        } else {
          response.send("Message sent successfully");
        }

        const receiptMailOptions = {
          from: "Arc Development",
          to: email,
          subject: "We have received your Message.",
          html: `
        This is the receipt of what you sent us.
        `,
        };
        transporter.sendMail(receiptMailOptions);
      });
    }
  });
});

// steps to deploy firebase cloud function
// npm install -g firebase-tools
// firebase login
// yes, which will open up in browser for authentication
// firebase init
// use an existing project and follow through
// cd functions
// pending works
// google requires billing account to deploy cloud function which i don't have
// so it's uselsess turn on less secure app access
// firebase deploy
