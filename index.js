const fs = require("fs");
const dotenv = require("dotenv");
const mailgunJS = require("mailgun.js");
const formData = require("form-data");

const emailList = "./test.txt";
const htmlTemplate = "./template.html";
const senderEmail = "outreach@csivit.com";
const emailSubject = "CSI CCS Recruitments for Freshers '22";
const emailTimeout = 1000;

dotenv.config();

//const mailgun = mailgunJS({ apiKey: process.env.API_KEY, domain: process.env.DOMAIN });
const mailgun = new mailgunJS(formData);
const mg = mailgun.client({
    username: "api",
    key: process.env.API_KEY,
    url: process.env.MAILGUN_HOST,
});
//const senderEmail = "sender_email";
//const domain = "email_domain";

function getEmails(fileName) {
    const emails = fs.readFileSync(fileName).toString().split('\n');
    return emails;
}

function getHTMLTemplate(htmlTemplate) {
    const html = fs.readFileSync(htmlTemplate).toString();
    return html;
}

function sendMail(senderEmail, receiverEmail, emailSubject, htmlTemplate) {
    const data = {
        from: senderEmail,
        to: receiverEmail,
        subject: emailSubject,
        html: htmlTemplate,
    };

    mg.messages.create(process.env.DOMAIN, data, (error, body) => {
        if (error) console.log(error)
        else console.log(body);
    });
}

function wait() {
    return new Promise((resolve) => {
        setTimeout(resolve, emailTimeout);
    });
}

async function sendEmails() {
    const emails = getEmails(emailList);
    const html = getHTMLTemplate(htmlTemplate);
    for (const email of emails) {
        sendMail(senderEmail, email, emailSubject, html);
        await wait();
    }
}

sendEmails();
