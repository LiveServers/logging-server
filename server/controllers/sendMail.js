const nodeMailer = require("nodemailer");
require("dotenv").config();

const transporter = nodeMailer.createTransport({
    host:"smtp.gmail.com",
    auth:{
        user:process.env.LOGGING_EMAIL,
        pass:process.env.PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendEmail = async({
    application,
    filePath,
    request,
    time,
    errorMessage
})=>{
    const htmlMessage = `
        <div >
            <p>Hello Brian, we just wanted to alert you on an error that has occured in your <strong>${application}</strong> application.</p>
            <p>Below is the error message received from <strong>${request}</strong> request at time <strong>${time}</strong>.</p>
            <p>This is the error message:<strong>${errorMessage}</strong>.</p>
            <span>This is the file path to use:</span> <span><strong>${filePath}</strong>.</span>
        <div>
    `
    try{
    await transporter.sendMail({
        from:`${application} <${process.env.LOGGING_EMAIL}>`,
        to:process.env.MY_EMAIL,
        subject:`Error Notification From ${application}`,
        html:htmlMessage
    });
    }
    catch(e){
        throw new Error("Failed to send email");
    }
}

module.exports = sendEmail;