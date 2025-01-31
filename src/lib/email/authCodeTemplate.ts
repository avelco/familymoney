export function getVerificationEmailHtml(code: string): string {
	return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification Code</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            .header {
                background: #fcc0d6;
                color: #ffffff;
                padding: 15px;
                font-size: 24px;
                font-weight: bold;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
            }
            .code {
                font-size: 28px;
                font-weight: bold;
                color: #fcc0d6;
                background: #f4f4f4;
                display: inline-block;
                padding: 10px 20px;
                border-radius: 5px;
                margin: 20px 0;
            }
            .footer {
                margin-top: 20px;
                font-size: 12px;
                color: gray;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                Family Money Verification Code
            </div>
            <p>Holi,</p>
            <p>Usa el siguiente código para acceder:</p>
            <div class="code">${code}</div>
            <p>Este código expirará en 10 minutos.</p>
            <div class="footer">
                &copy; ${new Date().getFullYear()} Family Money | All rights reserved.
            
            </div>
        </div>
    </body>
    </html>
    `;
}
