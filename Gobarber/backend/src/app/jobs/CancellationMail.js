import { format } from "date-fns";
import pt from "date-fns/locale/pt";
import Mail from "../../lib/Mail";

class CancellationMail {
  get key() {
    return "cancellationMail";
  }

  async handle({ data }) {
    const { appointment } = data;

    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: "Agendemento cancelado",
      template: "cancellation",
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(hourStat, "'dia' dd 'de' MMMM', ás' H:mm'h'", {
          locale: pt,
        }),
      },
    });
  }
}

export default new CancellationMail();
