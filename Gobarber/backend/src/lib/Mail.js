import nodemailer from "nodemailer";
import { resolve } from "path";
import exphbs from "express-handlebars";
import nodemailerhbs from "nodemailer-express-handlebars";
import mailConfig from "../config/mail";
import Mail from "nodemailer/lib/mailer";

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });

    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, "..", "app", "view", "email");

    this.transporter.use(
      "compile",
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, "layout"),
          partialsDir: resolve(viewPath, "partials"),
          default: "default",
          extname: ".hbs",
        }),
        viewPath,
        extName: ".hbs",
      })
    );
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
