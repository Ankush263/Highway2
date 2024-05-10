import nodemailer, { TransportOptions } from 'nodemailer';
import { convert } from 'html-to-text';
import ejs from 'ejs';
import { UserInterface } from 'models/user.model';

export default class Email {
	to: string;
	firstName: string;
	otp: string;
	from: any;

	constructor(user: UserInterface, otp: string) {
		this.to = user.email;
		this.firstName = user.firstName;
		this.otp = otp;
		this.from = `<${process.env.EMAIL_FROM}>`;
	}

	newTransport() {
		if (process.env.NODE_ENV === 'production') {
			return nodemailer.createTransport({
				service: 'SendGrid',
				auth: {
					user: process.env.SENDGRID_USERNAME,
					pass: process.env.SENDGRID_PASSWORD,
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
			otp: this.otp,
			subject,
		});

		const mailOptions = {
			from: this.from,
			to: JSON.stringify(this.to),
			subject,
			html,
			text: convert(html),
		};

		await this.newTransport().sendMail(mailOptions);
	}

	async sendOTPEmail() {
		await this.send('OTPEmail', 'Email Varification');
	}
}
