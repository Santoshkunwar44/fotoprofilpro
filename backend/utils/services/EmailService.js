const nodemailer = require("nodemailer");

class EmailService {

    async Mail({ subject, text, html, email }) {



        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            
            auth: {
                pass: process.env.SMTP_PW,
                user: process.env.APP_EMAIL
            },
        }); 

        try {

            let info = await transporter.sendMail({
                from: process.env.APP_EMAIL,
                to: email,
                subject,
                text,
                html,
            });

            console.log("Message sent: %s", info.messageId);
            return info.messageId;

        } catch (error) {
            return error.message;
        }
    }


    async sendImageReadyEmail(email,username,messageId){


      const html =   this.generateEmailHTML({
            heading:`Good News ${username}  your image is ready !   `,
            desc:`Image variation of  your below image is ready . Click the button below to view it .`,
            url:`${process.env.FRONTEND_URL}/assets/${messageId}`
        })

        this.Mail({ subject:"Image Variation has been  generated.",text:"Image Generated",html,email})

    }
  

    generateEmailHTML({ heading, desc ,url}){
        return `<div>
          <img src="https://scontent.fbwa1-1.fna.fbcdn.net/v/t1.15752-9/355506452_1719214261860430_8775324037174535074_n.png?_nc_cat=110&cb=99be929b-3346023f&ccb=1-7&_nc_sid=ae9488&_nc_ohc=iFSoEqPfHS0AX9415yo&_nc_ht=scontent.fbwa1-1.fna&oh=03_AdSoRgEYa60rcPjtgIumS2xNts2eV7Y2p7StORAUGLF-3w&oe=64B8DAA1" width="200px" style="border-radius:4px"/> <br/>
           <h1 style="color:#0e0b3d" > ${heading} </h1> </br>
           <h3 style="color:#0e0b3d"> ${desc} </h3> </br>  <br/> <a style="background:#686de0;height:40px; text-decoration:none;  padding:8px ; cursor:pointer;letter-spacing:1px; border-radius:4px;text-align:center;color:white;" href=${url}> GET IMAGES </a> </br> <br> <br>  </div>`
    }


    
   

}

module.exports = new EmailService()