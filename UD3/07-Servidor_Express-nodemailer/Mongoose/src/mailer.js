import nodemailer from 'nodemailer';    

const transporter = nodemailer.createTransport({
    
    service: 'gmail', // Puedes usar otro servicio como Outlook, Yahoo, etc.
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    secure: true, // true para puerto 465
    port: 465,
    tls: {
        rejectUnauthorized: true, // Verificar certificados SSL
    }
   
});

export const enviarEmailActivacion = async (to, subject, htmlContent) => {

    console.log(subject);

    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html: htmlContent // También puedes usar `text` en lugar de `html
        });

        console.log('Correo enviado: ', info.messageId);
    } catch (error) {
        console.error('Error enviando correo:', error);
    }
}
