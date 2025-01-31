import { MAILTRAP_API_URL, MAILTRAP_API_KEY } from '$env/static/private';

interface EmailProps {
	to: string;
	subject: string;
	html: string;
}

export async function sendEmail(props: EmailProps): Promise<boolean> {
	const emailData = {
		from: {
			email: 'no-reply@familymoney.store',
			name: 'Family Money'
		},
		to: [{ email: props.to }],
		subject: props.subject,
		html: props.html,
		category: 'Integration Test'
	};

	try {
		const response = await fetch(MAILTRAP_API_URL, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${MAILTRAP_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(emailData)
		});

		if (!response.ok) {
			console.error('Error sending email:', await response.text());
			return false;
		}

		return true;
	} catch (error) {
		console.error('Failed to send email:', error);
		return false;
	}
}
