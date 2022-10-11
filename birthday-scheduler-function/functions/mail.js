const nodemailer = require("nodemailer");

module.exports = function(data) {
    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            password: process.env.EMAIL_PASSWORD
        }
    });

    return transport.sendMail({
        to: data.email,
        from: 'noreply@gmail.com',
        html: `
        <div style='background: red;'>
            Happy Birthday ${ data.name },
            You've got a birthday wish from ${ data.sender }
        </div>`
    });
};