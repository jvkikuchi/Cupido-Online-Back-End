import handler from "../../libs/handler-lib";
import nodemailer from "nodemailer";
import { responseLambda } from "../../utils/responseLambda";

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
  <html>
  <head> 
    <link href="https://fonts.googleapis.com/css2?family=Sansita+Swashed&display=swap" rel="stylesheet"> 
    <link rel="preconnect" href="https://fonts.googleapis.com"> 
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> 
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fredoka:wght@300&display=swap" rel="stylesheet">
  </head> 
    <body style="color: black; background-color: white">
      <div style="padding: 30px; text-align: center;">
        <div style="
              background-color: white;
              border-radius: 20px;
              border-width: 3px;
              width: fit-content;
              
            ">
          <div style="
                background:linear-gradient(180deg, #ECC1C1 1%, #f1afaf 47%, #E57A7A 100%);
                padding: 10px;
                border-top-left-radius: 20px;
                border-top-right-radius: 20px;
                margin-top: 0;
                
              ">
            <span style="font-size: 30px; font-weight: bold;
              font-family:'Sansita Swashed';
              color: crimson;
            ">
              Cupido Online
            </span>
          </div>
          <center style="padding: 15px;">
            <p style="font-size: 18px;
              font-family: Fredoka, sans-serif;
              font-weight: bold;
            ">
               Olá, seu crush lhe enviou uma mensagem pelo Cupido Online!
            </p>
      
            <center style="
            background-color: whitesmoke;
            width: fit-content;
            text-align: left;
            padding: 10px;
            border-radius: 10px;
            max-width: 450px;
            word-break: break-word;
            font-family: Freadoka;
            font-size: 1.5rem;
            margin-top: 1em;
            ">${content}</center>
            <br />
            <br />
            <span style="font-size: 18px;  font-family: Fredoka, sans-serif;">
              Essa mensagem foi enviada pelo
              <strong>Cupido Online.</strong>
            </span>
            <br />
          </center>
        </div>
      </div>
    </body>
  </html>
  `;

  const emailSent = await transporter.sendMail({
    from: "Cupido Online <desafiocupidobgc@gmail.com>",
    to: receiver,
    subject: "Alguem tem um crush em voce!",
    html: emailHTML,
  });

  return responseLambda(emailSent);
});