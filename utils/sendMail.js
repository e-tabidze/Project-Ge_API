const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            // host: process.env.HOST,
            host: "smtp.gmail.com",
            service: "gmail",
            port: 587,
            secure: true,
            auth: {
                user: "projectgegold@gmail.com",
                pass: "bmtedfdutdjhchnb",
            },
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
        });

        console.log("Email sent sucessfully");
    } catch (error) {
        console.log(error, "Email not sent");
    }
};

module.exports = sendEmail;