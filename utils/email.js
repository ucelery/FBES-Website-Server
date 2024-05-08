const config = require("../config.json");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: config["email_address"],
        pass: process.env.NODEMAILER_APP_PASS,
    },
});

const sendEmail = async (to, title, html) => {
    const info = await transporter.sendMail({
        from: 'FBES - Main <maddison53@ethereal.email>', // sender address
        to: to,
        subject: `Announcement - ${title}`,
        html: html,
    });

    return info;
}

module.exports = { sendEmail }