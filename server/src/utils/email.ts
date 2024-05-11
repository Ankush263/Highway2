import nodemailer, { TransportOptions } from 'nodemailer';
import { convert } from 'html-to-text';
import ejs from 'ejs';

export default class Email {
	to: string;
	firstName: string;
	url: string;
	from: any;

	constructor(user: any, url: string) {
		this.to = user.email;
		this.firstName = user.firstName;
		this.url = url;
		this.from = `${process.env.EMAIL_FROM}`;
	}

	newTransport() {
		if (process.env.NODE_ENV === 'production') {
			return nodemailer.createTransport({
				service: 'Gmail',
				host: 'smtp.gmail.com',
				port: 465,
				secure: true,
				auth: {
					user: `${process.env.GMAIL_USERNAME}`,
					pass: `${process.env.GMAIL_PASSWORD}`,
				},
			});
		}

		return nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
		} as TransportOptions);
	}

	async send(template: string, subject: string) {
		const html = await ejs.renderFile(`${__dirname}/../views/${template}.ejs`, {
			firstName: this.firstName,
			url: this.url,
			subject,
		});

		const mailOptions = {
			from: this.from,
			to: this.to,
			subject,
			html,
			text: convert(html),
		};

		await this.newTransport().sendMail(mailOptions);
	}

	async sendOTPEmail() {
		await this.send('OTPEmail', 'Email Varification');
	}

	async sendVarificationLink() {
		await this.send('VarificationEmail', 'Email Varification');
	}
}
