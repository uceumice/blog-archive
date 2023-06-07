import { MailDataRequired } from "@sendgrid/mail";

export function send(data: MailDataRequired) {
    return { body: JSON.stringify(data) };
}