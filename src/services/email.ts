import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host : 'smtp.gmail.com',
    port : 587,
    auth : {
        user : 'unparcheadm@gmail.com', 
        pass : 'iecnfzzqflvevlsf'
    }
})