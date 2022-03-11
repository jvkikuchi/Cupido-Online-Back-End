import handler from "./libs/handler-lib";
import nodemailer from "nodemailer";
import { responseLambda } from "./utils/responseLambda";

export const  sendEmail = handler(async (event, context) => {
  const { receiver, content } =
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

  const emailHTML = `
            <h3>Olá, voce acabou de receber uma mensagem do Cupido Online!</h3>
            <br>
            <p>Alguem está com um crush em voce!</p>
            <br>
            <h4>Aqui está a mensagem:</h4>
                ${content}         
            <br>
            <br>         
            <p>Email enviado automaticamente pelo serviço do Cupido Online<p>
            <p>Nao responda essa mensagem<p>
            
  `;

  const emailSent = await transporter.sendMail({
    from: "Cupido Online <desafiocupidobgc@gmail.com>",
    to: receiver,
    subject: "Alguem tem um crush em voce!",
    html: emailHTML,
  });

  return responseLambda(emailSent);
});