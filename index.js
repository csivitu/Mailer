const fs = require("fs");
const dotenv = require("dotenv");
const mailgunJS = require("mailgun-js");

const emailList = "./test.txt";
const htmlTemplate = "./template.html";
const senderEmail = "outreach@csivit.com";
const emailSubject = "CSI CCS Recruitments for Freshers '22";
const emailTimeout = 1000;

dotenv.config();

const mailgun = mailgunJS({ apiKey: process.env.API_KEY, domain: process.env.DOMAIN });

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

    mailgun.messages().send(data, (error, body) => {
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
