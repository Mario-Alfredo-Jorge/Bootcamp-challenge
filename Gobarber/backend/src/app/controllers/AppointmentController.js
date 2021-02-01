import User from "../models/User";
import File from "../models/File";
import * as yup from "yup";
import { isBefore, startOfHour, parseISO, format, subHours } from "date-fns";
import Appointment from "../models/Appointment";
import notification from "../schemas/notification";
import pt from "date-fns/locale/pt";
// import Queue from "../../lib/Queue";
// import CancellationMail from "../jobs/CancellationMail";

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const appointments = await Appointment.findAll({
      where: { provider_id: req.userId, canceled_at: null },
      order: ["date"],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ["id", "date", "past", "cancelable"],
      include: [
        {
          model: User,
          as: "provider",
          attributes: ["id", "name"],
          include: [
            {
              model: File,
              as: "avatar",
              attributes: ["id", "path", "url"],
            },
          ],
        },
      ],
    });
    return res.json(appointments);
  }

  async store(req, res) {
    const schema = yup.object().shape({
      provider_id: yup.number().required(),
      date: yup.date().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(401).json({ error: "Validation fiels" });

    const { provider_id, date } = req.body;

    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider)
      return res
        .status(401)
        .json({ error: "you can only create appointments with providers" });

    //check  req.userId == provider_id

    if (req.userId == provider_id)
      return res
        .status(401)
        .json({ error: "you cannot create appointment with yourself" });

    //Check past dates
    const hourStat = startOfHour(parseISO(date));

    if (isBefore(hourStat, new Date())) {
      return res.status(400).json({ error: "Past dates are not permitted" });
    }

    /**
     *  check if provider is avalible
     */

    const isValible = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStat,
      },
    });

    if (isValible) {
      return res
        .status(400)
        .json({ error: "appointment date is not avalible" });
    }
    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    /* 
      Notify provider
    */

    const user = await User.findByPk(req.userId);
    const formattedDate = format(hourStat, "'dia' dd 'de' MMMM', ás' H:mm'h'", {
      locale: pt,
    });
    await notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}`,
      user: provider_id,
    });
    return res.json(appointment);
  }

  async delete(req, res) {
    const { id } = req.params;

    const appointment = await Appointment.findByPk(id, {
      include: [
        {
          model: User,
          as: "provider",
          attributes: ["name", "email"],
        },
        {
          model: User,
          as: "user",
          attributes: ["name"],
        },
      ],
    });

    if (appointment.user_id != req.userId)
      return res.status(401).json({
        error: "you do not have permission to cancel this appointment",
      });

    const dateWithSub = subHours(appointment.date, 2);

    if (isBefore(dateWithSub, new Date()))
      return res
        .status(401)
        .json({ error: "you can only cancel appointments 2 hours in advence" });

    appointment.canceled_at = new Date();

    await appointment.save();

    console.log(appointment.provider.name, appointment.provider.email);
    /*SEND EMAIL TO PROVIDER*/

    // Queue(CancellationMail);
    return res.json(appointment);
  }
}

export default new AppointmentController();
