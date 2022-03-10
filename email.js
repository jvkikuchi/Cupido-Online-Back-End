import handler from "./libs/handler-lib";
import nodemailer from "nodemailer";

export const  sendMail = handler(async (event, context) => {
  const { email, content } =
    typeof event.body === "string" ? JSON.parse(event.body) : event.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "desafiocupidobgc@gmail.com",
      pass: "cupido123*",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailSent = await transporter.sendMail({
    subject: "Seu crush lhe enviou uma mensagem!",
    from: "Cupido Online",
    to: email,
    html: `
            <h3>Olá, voce acabou de receber uma mensagem do Cupido Online!</h3>
            <br>
            <br>
            <p>Alguem está com um crush em voce em!</p>
            <br>
            <br>
            <h4>Aqui está a mensagem</h4>
                ${content}         
            <br>
            <br>
            <br>
            <br>
            <br>         
            <p>Email enviado automaticamente pelo serviço do Cupido Online<p>
            <p>Nao responda essa mensagem<p>
            `,
  });
  return mailSent;
});