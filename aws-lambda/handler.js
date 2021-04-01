const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

var transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    auth: { user: process.env.user, pass: process.env.pass },
  })
);

var enableCORS = {
  headers: {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
  },
};
var response = {};

exports.sendMail = function (event, context, callback) {
  const {
    name,
    email,
    phone,
    message,
    total,
    service,
    platforms,
    features,
    customFeatures,
    users,
    category,
  } = event.queryStringParameters;

  let defaultMailOptions = {
    from: "Arc Development",
    to: "firoj.is.available@gmail.com",
  };

  let mailOptions;
  let receiptMailOptions;

  if (total) {
    if (category) {
      mailOptions = {
        ...defaultMailOptions,
        subject: "Estimate Received",
        html: `
        
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Pacifico|Raleway:100,400,400i,700|Roboto:300,400,500,700&display=swap" />
            <title>Email Template</title>
            <!-- class for making it responsive -->
            <style>
              @import url("https://fonts.googleapis.com/css?family=Pacifico|Raleway:100,400,400i,700|Roboto:300,400,500,700&display=swap");
              table p {
                color:white;
              }
              .border{
                border-color: #ffba6096;
                margin-top: 1em;
                font-family: Railway;
                font-size: 1.2em;
              }
              tr.spaceTopBottom>td {
                padding-top: 0.3em;
                padding-bottom: 0.3em;
              }
              .title{
                font-family: Railway;
                font-size: 1.8em;
              }
              @media only screen and (max-width: 600px) {
                .width100 {
                  width: 100%;
                  font-size: 0.98em;
                }
                .maxChars{
                  max-width: 7ch;
                }
              }
            </style>
          </head>
          <body style="font-family: Railway;">
            <!-- encapsulating table of entire email template -->
            <table
              cellpadding="0"
              cellspacing="0"
              border="0"
              align="center"
              width="100% "
              style="max-width: 600;"
            >
              <tr>
                <td>
                  <!-- inner whole table -->
                  <table
                    cellpadding="10"
                    cellspacing="0"
                    border="0"
                    align="center"
                    width="600 "
                    class="width100"
                    style="background-color: #0b72b9;max-width: 600;"
                  >
                    <tr>
                      <td>


                                        <!-- header section -->
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="0"
                                          align="center"
                                          width="600 "
                                          style="text-align: center; background-color: black"
                                          class="width100"
                                        >
                                          <tr>
                                            <td>
                                              <a href="https://ace-development.netlify.app" target="_blank" style=" text-decoration: none; color: black;">
                                                <p style="font-weight: 700; font-size:1.8em ;color: #0b72b9;">Ace Development</p>
                                              </a>
                                              <p style="color: #1885ce;">Design | Develop | Deploy</p>
                                            </td>
                                          </tr>
                                        </table>

                                        <!-- client section -->

                                          <table
                                            cellpadding="0"
                                            cellspacing="0"
                                            border="0"
                                            align="center"
                                            width="600"
                                            style="
                                              text-align: center;
                                              text-align: justify;
                                              color: white;
                                              margin-top: 1em;
                                              font-family: Railway;
                                              font-size: 1.1em;
                                            "
                                            class="width100"
                                          >
                                            <tr>
                                              <td align="center" class="maxChars">Client Details:</td>
                                              <td align="center" style="color: #ffba60">
                                                <table
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  border="0"
                                                  align="center"
                                                  style="text-align: center; color: white"
                                                  class="width100"
                                                >
                                                  <tr>
                                                    <td>${name}</td>
                                                  </tr>
                                                  <a href="mailto:${email}">
                                                  <tr class="spaceTopBottom">
                                                    <td
                                                      style="text-decoration: none; color:white"
                                                    >
                                                      ${email}
                                                    </td>
                                                  </tr>
                                                  </a>
                                                  <tr>
                                                    <td href="tel:${phone}">${phone}</td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                          </table>

                                      <!-- messages -->
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="0"
                                          align="center"
                                          width="600 "
                                          style="text-align: center; color: white;"
                                          class="width100"
                                        >
                                          <tr>
                                            <td>
                                              <h2 style="color: #ffba60; font-family: pacifico;">
                                                Message
                                              </h2>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center">
                                              <p
                                                style="
                                                  max-width: 58ch;
                                                  word-wrap: break-word;
                                                  font-family: Railway;
                                                  font-size: 1.1em;
                                                  text-justify: initial;
                                                  text-align: justify;
                                                  color:white;
                                                "
                                              >
                                                ${message}
                                              </p>
                                            </td>
                                          </tr>
                                        </table>
                                         
                                 <!-- Order card section -->        
                                        <table
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        align="center"
                        width="600 "
                        style="text-align: center; color: white;"
                        class="width100"
                      >
                        <tr>
                          <td align="center">
                            <h2 style="color: #ffba60; font-family: pacifico">
                              Product Details
                            </h2>
                          </td>
                        </tr>
                      </table>

                      <table
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        align="center"
                        width="600"
                        class="width100"
                        style="text-align: center"
                      >
                        <tr>
                          <td align="center">
                            <!-- 2 thumbnail table -->
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              align="center"
                              width="600"
                              class="width100"
                              style="text-align: center"
                            >
                              <tr>
                                <td align="center">
                                  <!-- single thumbnail table -->
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    align="left"
                                    width="298"
                                    class="width100"
                                  >
                                    <tr>
                                      <td align="center">
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="1"
                                          align="center"
                                          width="250"
                                          class="border"
                                        >
                                          <tr>
                                            <td align="center">
                                              <h3>Service</h3>
                                              <p>${service}</p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>

                                  <!-- single thumbnail table -->
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    align="left"
                                    width="298"
                                    class="width100"
                                  >
                                    <tr>
                                      <td align="center">
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="1"
                                          align="center"
                                          width="250"
                                          class="border"
                                        >
                                          <tr>
                                            <td align="center">
                                              <h3>Platforms</h3>
                                              <p>${category}</p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>

                            

                            <!-- 2 thumbnail table -->
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              align="center"
                              width="600 "
                              style="text-align: center"
                              class="width100"
                            >
                              <tr>
                                <td align="center">
                                  <!-- single thumbnail table -->
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    align="left"
                                    width="598"
                                    class="width100"
                                  >
                                    <tr>
                                      <td align="center">
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="1"
                                          align="center"
                                          width="550 "
                                          class="border"
                                        >
                                          <tr>
                                            <td align="center">
                                            <h2
                                            style="
                                              color: #ffba60;
                                              font-family: pacifico;
                                            "
                                          >
                                            Estimate
                                          </h2>
                                          <p
                                            style="
                                              color: #ffba60;
                                              font-family: pacifico;
                                            "
                                          >
                                            Rs.${total}
                                          </p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                  <!-- 2 thumbnail table -->
                                </td>
                              </tr>
                            </table>


                    <!-- footer section -->
                      <table
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        align="center"
                        width="600 "
                        style="text-align: center; background-color: black; margin-top: 1em;"
                        class="width100"
                      >
                        <tr>
                          <td>
                            <p style="font-weight: 700; font-size:1.5em ;color: #0b72b9">@ Ace Development 2021</p>
                          <!-- footer section -->
                          </td>
                        </tr>
                      </table>
                      <!-- inner whole table -->
                        </td>
                        </tr>
                        </table>
                      <!-- encapsulating table of entire email template -->
                      </td>
                      </tr>
                      </table>

                  </body>
                  </html>
        
            `,
      };
      receiptMailOptions = {
        from: "Arc Development",
        to: email,
        subject: "Order Acknowledged",
        html: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Pacifico|Raleway:100,400,400i,700|Roboto:300,400,500,700&display=swap" />
            <title>Email Template</title>
            <!-- class for making it responsive -->
            <style>
              @import url("https://fonts.googleapis.com/css?family=Pacifico|Raleway:100,400,400i,700|Roboto:300,400,500,700&display=swap");
              table p {
                color:white;
              }
              .border{
                border-color: #ffba6096;
                margin-top: 1em;
                font-family: Railway;
                font-size: 1.2em;
              }
              tr.spaceTopBottom>td {
                padding-top: 0.3em;
                padding-bottom: 0.3em;
              }
              .title{
                font-family: Railway;
                font-size: 1.8em;
              }
              @media only screen and (max-width: 600px) {
                .width100 {
                  width: 100%;
                  font-size: 0.98em;
                }
                .maxChars{
                  max-width: 7ch;
                }
              }
            </style>
          </head>
          <body style="font-family: Railway;">
            <!-- encapsulating table of entire email template -->
            <table
              cellpadding="0"
              cellspacing="0"
              border="0"
              align="center"
              width="100% "
              style="max-width: 600;"
            >
              <tr>
                <td>
                  <!-- inner whole table -->
                  <table
                    cellpadding="10"
                    cellspacing="0"
                    border="0"
                    align="center"
                    width="600 "
                    class="width100"
                    style="background-color: #0b72b9;max-width: 600;"
                  >
                    <tr>
                      <td>


                                        <!-- header section -->
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="0"
                                          align="center"
                                          width="600 "
                                          style="text-align: center; background-color: black"
                                          class="width100"
                                        >
                                          <tr>
                                            <td>
                                              <a href="https://ace-development.netlify.app" target="_blank" style=" text-decoration: none; color: black;">
                                                <p style="font-weight: 700; font-size:1.8em ;color: #0b72b9;">Ace Development</p>
                                              </a>
                                              <p style="color: #1885ce;">Design | Develop | Deploy</p>
                                            </td>
                                          </tr>
                                        </table>

                                        <!-- client section -->

                                          <table
                                            cellpadding="0"
                                            cellspacing="0"
                                            border="0"
                                            align="center"
                                            width="600"
                                            style="
                                              text-align: center;
                                              text-align: justify;
                                              color: white;
                                              margin-top: 1em;
                                              font-family: Railway;
                                              font-size: 1.1em;
                                            "
                                            class="width100"
                                          >
                                            <tr>
                                              <td align="center" class="maxChars">Client Details:</td>
                                              <td align="center" style="color: #ffba60">
                                                <table
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  border="0"
                                                  align="center"
                                                  style="text-align: center; color: white"
                                                  class="width100"
                                                >
                                                  <tr>
                                                    <td>${name}</td>
                                                  </tr>
                                                  <a href="mailto:${email}">
                                                  <tr class="spaceTopBottom">
                                                    <td
                                                      style="text-decoration: none; color:white"
                                                    >
                                                      ${email}
                                                    </td>
                                                  </tr>
                                                  </a>
                                                  <tr>
                                                    <td href="tel:${phone}">${phone}</td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                          </table>

                                      <!-- messages -->
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="0"
                                          align="center"
                                          width="600 "
                                          style="text-align: center; color: white;"
                                          class="width100"
                                        >
                                          <tr>
                                            <td>
                                              <h2 style="color: #ffba60; font-family: pacifico;">
                                                Message
                                              </h2>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center">
                                              <p
                                                style="
                                                  max-width: 58ch;
                                                  word-wrap: break-word;
                                                  font-family: Railway;
                                                  font-size: 1.1em;
                                                  text-justify: initial;
                                                  text-align: justify;
                                                  color:white;
                                                "
                                              >
                                                ${message}
                                              </p>
                                              <h4 style="
                                              max-width: 58ch;
                                              word-wrap: break-word;
                                              font-family: Railway;
                                              font-size: 1.1em;
                                              text-justify: initial;
                                              text-align: justify;
                                              color:white;">
                                              Thanks for placing your estimate request! We'll go over the details and get back to you as soon as possible.
                                              </h4>
                                            </td>
                                          </tr>
                                        </table>
                                         
                                 <!-- Order card section -->        
                                        <table
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        align="center"
                        width="600 "
                        style="text-align: center; color: white;"
                        class="width100"
                      >
                        <tr>
                          <td align="center">
                            <h2 style="color: #ffba60; font-family: pacifico">
                              Product Details
                            </h2>
                          </td>
                        </tr>
                      </table>

                      <table
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        align="center"
                        width="600"
                        class="width100"
                        style="text-align: center"
                      >
                        <tr>
                          <td align="center">
                            <!-- 2 thumbnail table -->
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              align="center"
                              width="600"
                              class="width100"
                              style="text-align: center"
                            >
                              <tr>
                                <td align="center">
                                  <!-- single thumbnail table -->
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    align="left"
                                    width="298"
                                    class="width100"
                                  >
                                    <tr>
                                      <td align="center">
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="1"
                                          align="center"
                                          width="250"
                                          class="border"
                                        >
                                          <tr>
                                            <td align="center">
                                              <h3>Service</h3>
                                              <p>${service}</p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>

                                  <!-- single thumbnail table -->
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    align="left"
                                    width="298"
                                    class="width100"
                                  >
                                    <tr>
                                      <td align="center">
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="1"
                                          align="center"
                                          width="250"
                                          class="border"
                                        >
                                          <tr>
                                            <td align="center">
                                              <h3>Platforms</h3>
                                              <p>${category}</p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>

                            

                            <!-- 2 thumbnail table -->
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              align="center"
                              width="600 "
                              style="text-align: center"
                              class="width100"
                            >
                              <tr>
                                <td align="center">
                                  <!-- single thumbnail table -->
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    align="left"
                                    width="598"
                                    class="width100"
                                  >
                                    <tr>
                                      <td align="center">
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="1"
                                          align="center"
                                          width="550 "
                                          class="border"
                                        >
                                          <tr>
                                            <td align="center">
                                            <h2
                                            style="
                                              color: #ffba60;
                                              font-family: pacifico;
                                            "
                                          >
                                            Estimate
                                          </h2>
                                          <p
                                            style="
                                              color: #ffba60;
                                              font-family: pacifico;
                                            "
                                          >
                                            Rs.${total}
                                          </p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                  <!-- 2 thumbnail table -->
                                </td>
                              </tr>
                            </table>


                    <!-- footer section -->
                      <table
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        align="center"
                        width="600 "
                        style="text-align: center; background-color: black; margin-top: 1em;"
                        class="width100"
                      >
                        <tr>
                          <td>
                            <p style="font-weight: 700; font-size:1.5em ;color: #0b72b9">@ Ace Development 2021</p>
                          <!-- footer section -->
                          </td>
                        </tr>
                      </table>
                      <!-- inner whole table -->
                        </td>
                        </tr>
                        </table>
                      <!-- encapsulating table of entire email template -->
                      </td>
                      </tr>
                      </table>

                  </body>
                  </html>`,
      };
    } else {
      mailOptions = {
        ...defaultMailOptions,
        subject: "Estimate Received",
        html: `

        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Pacifico|Raleway:100,400,400i,700|Roboto:300,400,500,700&display=swap" />
            <title>Email Template</title>
            <!-- class for making it responsive -->
            <style>
              table p {
                color:white;
              }
              .border{
                border-color: #ffba6096;
                margin-top: 1em;
                font-family: Railway;
                font-size: 1.2em;
              }
              tr.spaceTopBottom>td {
                padding-top: 0.3em;
                padding-bottom: 0.3em;
              }
              .title{
                font-family: Railway;
                font-size: 1.8em;
              }
              @media only screen and (max-width: 600px) {
                .width100 {
                  width: 100%;
                  font-size: 0.98em;
                }
                .maxChars{
                  max-width: 7ch;
                }
              }
            </style>
          </head>
          <body style="font-family: Railway;">
            <!-- encapsulating table of entire email template -->
            <table
              cellpadding="0"
              cellspacing="0"
              border="0"
              align="center"
              width="100% "
              style="max-width: 600;"
            >
              <tr>
                <td>
                  <!-- inner whole table -->
                  <table
                    cellpadding="10"
                    cellspacing="0"
                    border="0"
                    align="center"
                    width="600 "
                    class="width100"
                    style="background-color: #0b72b9;max-width: 600;"
                  >
                    <tr>
                      <td>


                                        <!-- header section -->
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="0"
                                          align="center"
                                          width="600 "
                                          style="text-align: center; background-color: black"
                                          class="width100"
                                        >
                                          <tr>
                                            <td>
                                              <a href="https://ace-development.netlify.app" target="_blank" style=" text-decoration: none; color: black;">
                                                <p style="font-weight: 700; font-size:1.8em ;color: #0b72b9;">Ace Development</p>
                                              </a>
                                              <p style="color: #1885ce;">Design | Develop | Deploy</p>
                                            </td>
                                          </tr>
                                        </table>

                                        <!-- client section -->

                                          <table
                                            cellpadding="0"
                                            cellspacing="0"
                                            border="0"
                                            align="center"
                                            width="600"
                                            style="
                                              text-align: center;
                                              text-align: justify;
                                              color: white;
                                              margin-top: 1em;
                                              font-family: Railway;
                                              font-size: 1.1em;
                                            "
                                            class="width100"
                                          >
                                            <tr>
                                              <td align="center" class="maxChars">Client Details:</td>
                                              <td align="center" style="color: #ffba60">
                                                <table
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  border="0"
                                                  align="center"
                                                  style="text-align: center; color: white"
                                                  class="width100"
                                                >
                                                  <tr>
                                                    <td>${name}</td>
                                                  </tr>
                                                  <a href="mailto:${email}">
                                                  <tr class="spaceTopBottom">
                                                    <td
                                                      style="text-decoration: none; color:white"
                                                    >
                                                      ${email}
                                                    </td>
                                                    </tr>
                                                    </a>
                                                  <tr>
                                                    <td href="tel:${phone}">${phone}</td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                          </table>

                                      <!-- messages -->
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="0"
                                          align="center"
                                          width="600 "
                                          style="text-align: center; color: white;"
                                          class="width100"
                                        >
                                          <tr>
                                            <td>
                                              <h2 style="color: #ffba60; font-family: pacifico;">
                                                Message
                                              </h2>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center">
                                              <p
                                                style="
                                                  max-width: 58ch;
                                                  word-wrap: break-word;
                                                  font-family: Railway;
                                                  font-size: 1.1em;
                                                  text-justify: initial;
                                                  text-align: justify;
                                                  color:white;
                                                "
                                              >
                                                ${message}
                                              </p>
                                            </td>
                                          </tr>
                                        </table>
                                         
                                 <!-- Order card section -->        
                                        <table
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        align="center"
                        width="600 "
                        style="text-align: center; color: white;"
                        class="width100"
                      >
                        <tr>
                          <td align="center">
                            <h2 style="color: #ffba60; font-family: pacifico">
                              Product Details
                            </h2>
                          </td>
                        </tr>
                      </table>

                      <table
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        align="center"
                        width="600"
                        class="width100"
                        style="text-align: center"
                      >
                        <tr>
                          <td align="center">
                            <!-- 2 thumbnail table -->
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              align="center"
                              width="600"
                              class="width100"
                              style="text-align: center"
                            >
                              <tr>
                                <td align="center">
                                  <!-- single thumbnail table -->
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    align="left"
                                    width="298"
                                    class="width100"
                                  >
                                    <tr>
                                      <td align="center">
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="1"
                                          align="center"
                                          width="250"
                                          class="border"
                                        >
                                          <tr>
                                            <td align="center">
                                              <h3>Service</h3>
                                              <p>${service}</p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>

                                  <!-- single thumbnail table -->
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    align="left"
                                    width="298"
                                    class="width100"
                                  >
                                    <tr>
                                      <td align="center">
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="1"
                                          align="center"
                                          width="250"
                                          class="border"
                                        >
                                          <tr>
                                            <td align="center">
                                              <h3>Platforms</h3>
                                              <p>${platforms}</p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>

                            <!-- 2 thumbnail table -->
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              align="center"
                              width="600 "
                              style="text-align: center"
                              class="width100"
                            >
                              <tr>
                                <td align="center">
                                  <!-- single thumbnail table -->
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    align="left"
                                    width="298"
                                    class="width100"
                                  >
                                    <tr>
                                      <td align="center">
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="1"
                                          align="center"
                                          width="250 "
                                          class="border"
                                        >
                                          <tr>
                                            <td align="center">
                                              <h3>Features</h3>
                                              <p>${features}</p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>

                                  <!-- single thumbnail table -->
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    align="left"
                                    width="298"
                                    class="width100"
                                  >
                                    <tr>
                                      <td align="center">
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="1"
                                          align="center"
                                          width="250 "
                                          class="border"
                                        >
                                          <tr>
                                            <td align="center">
                                              <h3>Custom Features</h3>
                                              <p>${customFeatures}</p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>

                            <!-- 2 thumbnail table -->
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              align="center"
                              width="600 "
                              style="text-align: center"
                              class="width100"
                            >
                              <tr>
                                <td align="center">
                                  <!-- single thumbnail table -->
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    align="left"
                                    width="298"
                                    class="width100"
                                  >
                                    <tr>
                                      <td align="center">
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="1"
                                          align="center"
                                          width="250 "
                                          class="border"
                                        >
                                          <tr>
                                            <td align="center">
                                              <h3>Users</h3>
                                              <p>${users}</p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>

                                  <!-- single thumbnail table -->
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    align="left"
                                    width="298"
                                    class="width100"
                                  >
                                    <tr>
                                      <td align="center">
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="1"
                                          align="center"
                                          width="250 "
                                          class="border"
                                        >
                                          <tr>
                                            <td align="center">
                                              <h2
                                                style="
                                                  color: #ffba60;
                                                  font-family: pacifico;
                                                "
                                              >
                                                Estimate
                                              </h2>
                                              <p
                                                style="
                                                  color: #ffba60;
                                                  font-family: pacifico;
                                                "
                                              >
                                                Rs.${total}
                                              </p>
                                            </td>
                                          </tr>
                                        </table>
                                        <!-- single thumbnail table -->
                                      </td>
                                    </tr>
                                  </table>
                                  <!-- 2 thumbnail table -->
                                </td>
                              </tr>
                            </table>


                    <!-- footer section -->
                      <table
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        align="center"
                        width="600 "
                        style="text-align: center; background-color: black; margin-top: 1em;"
                        class="width100"
                      >
                        <tr>
                          <td>
                            <p style="font-weight: 700; font-size:1.5em ;color: #0b72b9">@ Ace Development 2021</p>
                          <!-- footer section -->
                          </td>
                        </tr>
                      </table>
                      <!-- inner whole table -->
                        </td>
                        </tr>
                        </table>
                      <!-- encapsulating table of entire email template -->
                      </td>
                      </tr>
                      </table>

                  </body>
                  </html>
            `,
      };

      receiptMailOptions = {
        from: "Arc Development",
        to: email,
        subject: "Order Acknowledged",
        html: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Pacifico|Raleway:100,400,400i,700|Roboto:300,400,500,700&display=swap" />
            <title>Email Template</title>
            <!-- class for making it responsive -->
            <style>
              table p {
                color:white;
              }
              .border{
                border-color: #ffba6096;
                margin-top: 1em;
                font-family: Railway;
                font-size: 1.2em;
              }
              tr.spaceTopBottom>td {
                padding-top: 0.3em;
                padding-bottom: 0.3em;
              }
              .title{
                font-family: Railway;
                font-size: 1.8em;
              }
              @media only screen and (max-width: 600px) {
                .width100 {
                  width: 100%;
                  font-size: 0.98em;
                }
                .maxChars{
                  max-width: 7ch;
                }
              }
            </style>
          </head>
          <body style="font-family: Railway;">
            <!-- encapsulating table of entire email template -->
            <table
              cellpadding="0"
              cellspacing="0"
              border="0"
              align="center"
              width="100% "
              style="max-width: 600;"
            >
              <tr>
                <td>
                  <!-- inner whole table -->
                  <table
                    cellpadding="10"
                    cellspacing="0"
                    border="0"
                    align="center"
                    width="600 "
                    class="width100"
                    style="background-color: #0b72b9;max-width: 600;"
                  >
                    <tr>
                      <td>


                                        <!-- header section -->
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="0"
                                          align="center"
                                          width="600 "
                                          style="text-align: center; background-color: black"
                                          class="width100"
                                        >
                                          <tr>
                                            <td>
                                              <a href="https://ace-development.netlify.app" target="_blank" style=" text-decoration: none; color: black;">
                                                <p style="font-weight: 700; font-size:1.8em ;color: #0b72b9;">Ace Development</p>
                                              </a>
                                              <p style="color: #1885ce;">Design | Develop | Deploy</p>
                                            </td>
                                          </tr>
                                        </table>

                                        <!-- client section -->

                                          <table
                                            cellpadding="0"
                                            cellspacing="0"
                                            border="0"
                                            align="center"
                                            width="600"
                                            style="
                                              text-align: center;
                                              text-align: justify;
                                              color: white;
                                              margin-top: 1em;
                                              font-family: Railway;
                                              font-size: 1.1em;
                                            "
                                            class="width100"
                                          >
                                            <tr>
                                              <td align="center" class="maxChars">Client Details:</td>
                                              <td align="center" style="color: #ffba60">
                                                <table
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  border="0"
                                                  align="center"
                                                  style="text-align: center; color: white"
                                                  class="width100"
                                                >
                                                  <tr>
                                                    <td>${name}</td>
                                                  </tr>
                                                  <a href="mailto:${email}">
                                                  <tr class="spaceTopBottom">
                                                    <td
                                                      style="text-decoration: none; color:white"
                                                    >
                                                      ${email}
                                                    </td>
                                                    </tr>
                                                    </a>
                                                  <tr>
                                                    <td href="tel:${phone}">${phone}</td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                          </table>

                                      <!-- messages -->
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="0"
                                          align="center"
                                          width="600 "
                                          style="text-align: center; color: white;"
                                          class="width100"
                                        >
                                          <tr>
                                            <td>
                                              <h2 style="color: #ffba60; font-family: pacifico;">
                                                Message
                                              </h2>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center">
                                              <p
                                                style="
                                                  max-width: 58ch;
                                                  word-wrap: break-word;
                                                  font-family: Railway;
                                                  font-size: 1.1em;
                                                  text-justify: initial;
                                                  text-align: justify;
                                                  color:white;
                                                "
                                              >
                                                ${message}
                                              </p>
                                              <h4 style="
                                              max-width: 58ch;
                                              word-wrap: break-word;
                                              font-family: Railway;
                                              font-size: 1.1em;
                                              text-justify: initial;
                                              text-align: justify;
                                              color:white;">
                                              Thanks for placing your estimate request! We'll go over the details and get back to you as soon as possible.
                                              </h4>
                                            </td>
                                          </tr>
                                        </table>
                                         
                                 <!-- Order card section -->        
                                        <table
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        align="center"
                        width="600 "
                        style="text-align: center; color: white;"
                        class="width100"
                      >
                        <tr>
                          <td align="center">
                            <h2 style="color: #ffba60; font-family: pacifico">
                              Product Details
                            </h2>
                          </td>
                        </tr>
                      </table>

                      <table
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        align="center"
                        width="600"
                        class="width100"
                        style="text-align: center"
                      >
                        <tr>
                          <td align="center">
                            <!-- 2 thumbnail table -->
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              align="center"
                              width="600"
                              class="width100"
                              style="text-align: center"
                            >
                              <tr>
                                <td align="center">
                                  <!-- single thumbnail table -->
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    align="left"
                                    width="298"
                                    class="width100"
                                  >
                                    <tr>
                                      <td align="center">
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="1"
                                          align="center"
                                          width="250"
                                          class="border"
                                        >
                                          <tr>
                                            <td align="center">
                                              <h3>Service</h3>
                                              <p>${service}</p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>

                                  <!-- single thumbnail table -->
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    align="left"
                                    width="298"
                                    class="width100"
                                  >
                                    <tr>
                                      <td align="center">
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="1"
                                          align="center"
                                          width="250"
                                          class="border"
                                        >
                                          <tr>
                                            <td align="center">
                                              <h3>Platforms</h3>
                                              <p>${platforms}</p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>

                            <!-- 2 thumbnail table -->
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              align="center"
                              width="600 "
                              style="text-align: center"
                              class="width100"
                            >
                              <tr>
                                <td align="center">
                                  <!-- single thumbnail table -->
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    align="left"
                                    width="298"
                                    class="width100"
                                  >
                                    <tr>
                                      <td align="center">
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="1"
                                          align="center"
                                          width="250 "
                                          class="border"
                                        >
                                          <tr>
                                            <td align="center">
                                              <h3>Features</h3>
                                              <p>${features}</p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>

                                  <!-- single thumbnail table -->
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    align="left"
                                    width="298"
                                    class="width100"
                                  >
                                    <tr>
                                      <td align="center">
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="1"
                                          align="center"
                                          width="250 "
                                          class="border"
                                        >
                                          <tr>
                                            <td align="center">
                                              <h3>Custom Features</h3>
                                              <p>${customFeatures}</p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>

                            <!-- 2 thumbnail table -->
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              align="center"
                              width="600 "
                              style="text-align: center"
                              class="width100"
                            >
                              <tr>
                                <td align="center">
                                  <!-- single thumbnail table -->
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    align="left"
                                    width="298"
                                    class="width100"
                                  >
                                    <tr>
                                      <td align="center">
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="1"
                                          align="center"
                                          width="250 "
                                          class="border"
                                        >
                                          <tr>
                                            <td align="center">
                                              <h3>Users</h3>
                                              <p>${users}</p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>

                                  <!-- single thumbnail table -->
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    align="left"
                                    width="298"
                                    class="width100"
                                  >
                                    <tr>
                                      <td align="center">
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="1"
                                          align="center"
                                          width="250 "
                                          class="border"
                                        >
                                          <tr>
                                            <td align="center">
                                              <h2
                                                style="
                                                  color: #ffba60;
                                                  font-family: pacifico;
                                                "
                                              >
                                                Estimate
                                              </h2>
                                              <p
                                                style="
                                                  color: #ffba60;
                                                  font-family: pacifico;
                                                "
                                              >
                                                Rs.${total}
                                              </p>
                                            </td>
                                          </tr>
                                        </table>
                                        <!-- single thumbnail table -->
                                      </td>
                                    </tr>
                                  </table>
                                  <!-- 2 thumbnail table -->
                                </td>
                              </tr>
                            </table>


                    <!-- footer section -->
                      <table
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        align="center"
                        width="600 "
                        style="text-align: center; background-color: black; margin-top: 1em;"
                        class="width100"
                      >
                        <tr>
                          <td>
                            <p style="font-weight: 700; font-size:1.5em ;color: #0b72b9">@ Ace Development 2021</p>
                          <!-- footer section -->
                          </td>
                        </tr>
                      </table>
                      <!-- inner whole table -->
                        </td>
                        </tr>
                        </table>
                      <!-- encapsulating table of entire email template -->
                      </td>
                      </tr>
                      </table>

                  </body>
                  </html>`,
      };
    }

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        response = {
          ...response,
          statusCode: 500,
          body: JSON.stringify({
            requestId: context.awsRequestId,
            "aws lambda error": error.message,
          }),
        };
        callback(null, response);
        console.log(response);
      } else {
        response = {
          ...enableCORS,
          statusCode: 200,
          body: JSON.stringify({
            requestId: context.awsRequestId,
            message: "Total Estimate sent successfully",
            // event,
          }),
        };
        callback(null, response);
      }
      // sending receipt
      transporter.sendMail(receiptMailOptions);
    });
  } else {
    // When client just sends message

    mailOptions = {
      from: "Arc Development",
      to: "firoj.is.available@gmail.com",
      subject: " A Message from from your Client",
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Pacifico|Raleway:100,400,400i,700|Roboto:300,400,500,700&display=swap" />
          <title>Email Template</title>
          <!-- class for making it responsive -->
          <style>
            @import url("https://fonts.googleapis.com/css?family=Pacifico|Raleway:100,400,400i,700|Roboto:300,400,500,700&display=swap");
            table p {
              color:white;
            }
            .border{
              border-color: #ffba6096;
              margin-top: 1em;
              font-family: Railway;
              font-size: 1.2em;
            }
            tr.spaceTopBottom>td {
              padding-top: 0.3em;
              padding-bottom: 0.3em;
            }
            .title{
              font-family: Railway;
              font-size: 1.8em;
            }
            @media only screen and (max-width: 600px) {
              .width100 {
                width: 100%;
                font-size: 0.98em;
              }
              .maxChars{
                max-width: 7ch;
              }
            }
          </style>
        </head>
        <body style="font-family: Railway;">
          <!-- encapsulating table of entire email template -->
          <table
            cellpadding="0"
            cellspacing="0"
            border="0"
            align="center"
            width="100% "
            style="max-width: 600;"
          >
            <tr>
              <td>
                <!-- inner whole table -->
                <table
                  cellpadding="10"
                  cellspacing="0"
                  border="0"
                  align="center"
                  width="600 "
                  class="width100"
                  style="background-color: #0b72b9;max-width: 600;"
                >
                  <tr>
                    <td>


                                      <!-- header section -->
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        border="0"
                                        align="center"
                                        width="600 "
                                        style="text-align: center; background-color: black"
                                        class="width100"
                                      >
                                        <tr>
                                          <td>
                                            <a href="https://ace-development.netlify.app" target="_blank" style=" text-decoration: none; color: black;">
                                              <p style="font-weight: 700; font-size:1.8em ;color: #0b72b9;">Ace Development</p>
                                            </a>
                                            <p style="color: #1885ce;">Design | Develop | Deploy</p>
                                          </td>
                                        </tr>
                                      </table>

                                      <!-- client section -->

                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="0"
                                          align="center"
                                          width="600"
                                          style="
                                            text-align: center;
                                            text-align: justify;
                                            color: white;
                                            margin-top: 1em;
                                            font-family: Railway;
                                            font-size: 1.1em;
                                          "
                                          class="width100"
                                        >
                                          <tr>
                                            <td align="center" class="maxChars">Client Details:</td>
                                            <td align="center" style="color: #ffba60">
                                              <table
                                                cellpadding="0"
                                                cellspacing="0"
                                                border="0"
                                                align="center"
                                                style="text-align: center; color: white"
                                                class="width100"
                                              >
                                                <tr>
                                                  <td>${name}</td>
                                                </tr>
                                                <a href="mailto:${email}">
                                                <tr class="spaceTopBottom">
                                                  <td
                                                    style="text-decoration: none; color:white"
                                                  >
                                                    ${email}
                                                  </td>
                                                </tr>
                                                </a>
                                                <tr>
                                                  <td href="tel:${phone}">${phone}</td>
                                                </tr>
                                              </table>
                                            </td>
                                          </tr>
                                        </table>

                                    <!-- messages -->
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        border="0"
                                        align="center"
                                        width="600 "
                                        style="text-align: center; color: white;"
                                        class="width100"
                                      >
                                        <tr>
                                          <td>
                                            <h2 style="color: #ffba60; font-family: pacifico;">
                                              Message
                                            </h2>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center">
                                            <p
                                              style="
                                                max-width: 58ch;
                                                word-wrap: break-word;
                                                font-family: Railway;
                                                font-size: 1.1em;
                                                text-justify: initial;
                                                text-align: justify;
                                                color:white;
                                              "
                                            >
                                              ${message}
                                            </p>
                                          </td>
                                        </tr>
                                      </table>
                  <!-- footer section -->
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      align="center"
                      width="600 "
                      style="text-align: center; background-color: black; margin-top: 1em;"
                      class="width100"
                    >
                      <tr>
                        <td>
                          <p style="font-weight: 700; font-size:1.5em ;color: #0b72b9">@ Ace Development 2021</p>
                        <!-- footer section -->
                        </td>
                      </tr>
                    </table>
                    <!-- inner whole table -->
                      </td>
                      </tr>
                      </table>
                    <!-- encapsulating table of entire email template -->
                    </td>
                    </tr>
                    </table>

                </body>
                </html>
              `,
    };

    receiptMailOptions = {
      from: "Arc Development",
      to: email,
      subject: "We have received your Message.",
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Pacifico|Raleway:100,400,400i,700|Roboto:300,400,500,700&display=swap" />
            <title>Email Template</title>
            <!-- class for making it responsive -->
            <style>
              @import url("https://fonts.googleapis.com/css?family=Pacifico|Raleway:100,400,400i,700|Roboto:300,400,500,700&display=swap");
              table p {
                color:white;
              }
              .border{
                border-color: #ffba6096;
                margin-top: 1em;
                font-family: Railway;
                font-size: 1.2em;
              }
              tr.spaceTopBottom>td {
                padding-top: 0.3em;
                padding-bottom: 0.3em;
              }
              .title{
                font-family: Railway;
                font-size: 1.8em;
              }
              @media only screen and (max-width: 600px) {
                .width100 {
                  width: 100%;
                  font-size: 0.98em;
                }
                .maxChars{
                  max-width: 7ch;
                }
              }
            </style>
          </head>
          <body style="font-family: Railway;">
            <!-- encapsulating table of entire email template -->
            <table
              cellpadding="0"
              cellspacing="0"
              border="0"
              align="center"
              width="100% "
              style="max-width: 600;"
            >
              <tr>
                <td>
                  <!-- inner whole table -->
                  <table
                    cellpadding="10"
                    cellspacing="0"
                    border="0"
                    align="center"
                    width="600 "
                    class="width100"
                    style="background-color: #0b72b9;max-width: 600;"
                  >
                    <tr>
                      <td>
  
  
                                        <!-- header section -->
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="0"
                                          align="center"
                                          width="600 "
                                          style="text-align: center; background-color: black"
                                          class="width100"
                                        >
                                          <tr>
                                            <td>
                                              <a href="https://ace-development.netlify.app" target="_blank" style=" text-decoration: none; color: black;">
                                                <p style="font-weight: 700; font-size:1.8em ;color: #0b72b9;">Ace Development</p>
                                              </a>
                                              <p style="color: #1885ce;">Design | Develop | Deploy</p>
                                            </td>
                                          </tr>
                                        </table>
  
                                        <!-- client section -->
  
                                          <table
                                            cellpadding="0"
                                            cellspacing="0"
                                            border="0"
                                            align="center"
                                            width="600"
                                            style="
                                              text-align: center;
                                              text-align: justify;
                                              color: white;
                                              margin-top: 1em;
                                              font-family: Railway;
                                              font-size: 1.1em;
                                            "
                                            class="width100"
                                          >
                                            <tr>
                                              <td align="center" class="maxChars">Client Details:</td>
                                              <td align="center" style="color: #ffba60">
                                                <table
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  border="0"
                                                  align="center"
                                                  style="text-align: center; color: white"
                                                  class="width100"
                                                >
                                                  <tr>
                                                    <td>${name}</td>
                                                  </tr>
                                                  <a href="mailto:${email}">
                                                  <tr class="spaceTopBottom">
                                                    <td
                                                      style="text-decoration: none; color:white"
                                                    >
                                                      ${email}
                                                    </td>
                                                  </tr>
                                                  </a>
                                                  <tr>
                                                    <td href="tel:${phone}">${phone}</td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                          </table>
  
                                      <!-- messages -->
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="0"
                                          align="center"
                                          width="600 "
                                          style="text-align: center; color: white;"
                                          class="width100"
                                        >
                                          <tr>
                                            <td>
                                              <h2 style="color: #ffba60; font-family: pacifico;">
                                                Message
                                              </h2>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center">
                                              <p
                                                style="
                                                  max-width: 58ch;
                                                  word-wrap: break-word;
                                                  font-family: Railway;
                                                  font-size: 1.1em;
                                                  text-justify: initial;
                                                  text-align: justify;
                                                  color:white;
                                                "
                                              >
                                                ${message}
                                              </p>
                                              <h4 style="
                                              max-width: 58ch;
                                              word-wrap: break-word;
                                              font-family: Railway;
                                              font-size: 1.1em;
                                              text-justify: initial;
                                              text-align: justify;
                                              color:white;">
                                              Thanks for placing your estimate request! We'll go over the details and get back to you as soon as possible.
                                              </h4>
                                            </td>
                                          </tr>
                                        </table>

                    <!-- footer section -->
                      <table
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        align="center"
                        width="600 "
                        style="text-align: center; background-color: black; margin-top: 1em;"
                        class="width100"
                      >
                        <tr>
                          <td>
                            <p style="font-weight: 700; font-size:1.5em ;color: #0b72b9">@ Ace Development 2021</p>
                          <!-- footer section -->
                          </td>
                        </tr>
                      </table>
                      <!-- inner whole table -->
                        </td>
                        </tr>
                        </table>
                      <!-- encapsulating table of entire email template -->
                      </td>
                      </tr>
                      </table>
  
                  </body>
                  </html>
            `,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        response = {
          ...enableCORS,
          statusCode: 500,
          body: JSON.stringify({
            requestId: context.awsRequestId,
            "aws lambda error": error.message,
          }),
        };
        console.log(response);
        callback(null, response);
      } else {
        response = {
          ...enableCORS,
          statusCode: 200,
          body: JSON.stringify({
            requestId: context.awsRequestId,
            message: "Contact Info and Message sent successfully",
            // event,
          }),
        };
        callback(null, response);
      }

      //sending contact info recipt
      transporter.sendMail(receiptMailOptions);
    });
  }
};
