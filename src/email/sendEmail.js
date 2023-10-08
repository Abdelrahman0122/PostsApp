import nodemailer from 'nodemailer';
import { emailTEmplate } from './emailTemplate.js';

export async function  sendEmail(data){

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: 'abdelrahman.elsayed0122@gmail.com',
          pass: 'hhmmxcxlonpmmiam'
        }
      });
      

        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"abdelrahman.elsayed0122@gmail.com', // sender address
          to: data.email, // list of receivers
          subject: "Looged in", // Subject line
          text: "Welcome User", // plain text body
          html: emailTEmplate(data.OTP), // html body
        });
      
        console.log("Message sent: %s", info.messageId);
    
      }
      
    
