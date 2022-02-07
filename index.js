const fs = require("fs");
const dotenv = require("dotenv");

const emailList = "./test.txt";
const htmlTemplate = "./template.html";

dotenv.config();

function getEmails(fileName) {
    const emails = fs.readFileSync(fileName).toString().split('\n');
    return emails;
} 

function getHTMLTemplate(htmlTemplate) {
    const html = fs.readFileSync(htmlTemplate).toString();
    return html;
}

getEmails(emailList);
getHTMLTemplate(htmlTemplate);

