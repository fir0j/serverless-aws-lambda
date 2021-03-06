const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

var transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    auth: { user: process.env.user, pass: process.env.pass },
  })
);

function getHtmlDocument(name, email, phone, message) {
  return `
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Pacifico|Raleway:100,400,400i,700|Roboto:300,400,500,700&display=swap"
          />
          <title>Email Template</title>
          <!-- class for making it responsive -->
          <style>
            @import url("https://fonts.googleapis.com/css?family=Pacifico|Raleway:100,400,400i,700|Roboto:300,400,500,700&display=swap");
            table p {
              color: white;
            }
            .border {
              border-color: #ffba6096;
              margin-top: 1em;
              font-family: Railway;
              font-size: 1.2em;
            }
            tr.spaceTopBottom > td {
              padding-top: 0.3em;
              padding-bottom: 0.3em;
            }
            .title {
              font-family: Railway;
              font-size: 1.8em;
            }
            @media only screen and (max-width: 600px) {
              .width100 {
                width: 100%;
                font-size: 0.98em;
              }
              .maxChars {
                max-width: 7ch;
              }
            }
          </style>
        </head>
        <body style="font-family: Railway">
          <!-- encapsulating table of entire email template -->
          <table
            cellpadding="0"
            cellspacing="0"
            border="0"
            align="center"
            width="100% "
            style="max-width: 600"
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
                  style="
                    background-color: black;
                    max-width: 600;
                    margin: 0 auto 0 auto;
                    border-radius: 5px;
                  "
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
                        style="
                          text-align: center;
                          background-color: rgb(45, 46, 46);
                          border-radius: 10px;
                        "
                        class="width100"
                      >
                        <tr>
                          <td>
                            <a
                              href="https://fir0j.netlify.app/"
                              target="_blank"
                              style="text-decoration: none; color: black"
                            >
                              <p
                                style="
                                  font-weight: 700;
                                  font-size: 1.8em;
                                  color: #ffba60;
                                "
                              >
                                Er. Firoj Siddiki
                              </p>
                            </a>
                            <p style="color: #ffba60">Design | Develop | Deploy</p>
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
                          <td align="center" class="maxChars">Contact Details:</td>
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
                              <a href="mailto:firoj.is.available@gmail.com">
                                <tr class="spaceTopBottom">
                                  <td style="text-decoration: none; color: white">
                                    ${email}
                                  </td>
                                </tr>
                              </a>
                              <tr>
                                <td href=''>${phone}</td>
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
                        style="text-align: center; color: white"
                        class="width100"
                      >
                        <tr>
                          <td>
                            <h2 style="color: #ffba60; font-family: pacifico">
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
                        style="
                          text-align: center;
                          background-color: rgb(45, 46, 46);
                          margin-top: 1em;
                          border-radius: 10px;
                        "
                        class="width100"
                      >
                        <tr>
                          <td>
                            <p
                              style="
                                font-weight: 700;
                                font-size: 1.5em;
                                color: #ffba60;
                              "
                            >
                              @Firoj's Portfolio 2021
                            </p>
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

    `;
}

// make access-control-allow-credentials:false if testing with http in development
var enableCORS = {
  headers: {
    "Access-Control-Allow-Origin": "https://fir0j.netlify.app", // Required for CORS support to work
    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
  },
};

exports.emailServiceForMyPorfolio = async function (event, context, callback) {
  const { name, email, phone, message } = event.queryStringParameters;
  // invoking the function locally using the following data as "sls invoke local --function emailServiceForMyPorfolio"
  // const name = "Ram";
  // const email = "recruiter@gmail.com";
  // const phone = "9847064013";
  // const message = "I would love to work with you.";

  if (name && email && phone && message) {
    let mailOptions;
    let receiverEmail = "firoj.is.available@gmail.com";
    let recruiterEmail = email;

    // sending message to myself
    mailOptions = {
      from: "Firoj's Portfolio",
      to: receiverEmail,
      subject: "Message From Recruiter",
      html: `${getHtmlDocument(name, email, phone, message)}`,
    };
    const info = await transporter.sendMail(mailOptions);

    if (info) {
      let response = {
        ...enableCORS,
        statusCode: 200,
        body: JSON.stringify({
          requestId: context.awsRequestId,
          message: `Email sent successfully to ${email}`,
          // info: info,
          // event:envent,
        }),
      };

      response.config = undefined;
      callback(null, response);
    } else {
      let response = {
        ...enableCORS,
        statusCode: 500,
        body: JSON.stringify({
          requestId: context.awsRequestId,
          "aws lambda error": info.message,
          // error: info,
        }),
      };
      console.log(`Email to ${email} Failed. The response was`, response);
      callback(null, response);
    }

    // finally sending receipt to the recruiter as well
    mailOptions = {
      from: "Firoj's Portfolio",
      to: recruiterEmail,
      subject: "Acknowledgement",
      html: `${getHtmlDocument(
        name,
        email,
        phone,
        `Thank you ${name} for choosing me. I will be contacting you shortly.`
      )}`,
    };

    await transporter.sendMail(mailOptions);
  }
};
