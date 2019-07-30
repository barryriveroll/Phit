const nodemailer = require("nodemailer");
const config = process.env ? null : require("../config.json");
module.exports = {
  submitReport: async function(req, res) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: process.env.REPORT_USER || config.flag,
        pass: process.env.REPORT_PASS || config.phitlosophy
      },
      name: "reallycoolname"
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `${req.body.username} <barrphitness@gmail.com>`, // sender address
      to: process.env.REPORT_USER || config.flag, // list of receivers
      subject: `Phit Report: ${req.body.reportCategory}`, // Subject line
      text: `Report for: ${req.body.reportedUser}. Reported User URL: ${
        req.body.reportedUserURL
      }. Report text: ${req.body.reportText}` // plain text body
    });

    console.log("Message sent: %s", info.messageId);
  }
};
