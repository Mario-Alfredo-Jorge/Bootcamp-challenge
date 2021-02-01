import Notification from "../schemas/notification";
import User from "../models/User";

class NotificationController {
  async index(req, res) {
    const checkUser = await User.findOne({
      wherre: { id: req.userId, provider: true },
    });

    if (!checkUser) {
      return res
        .status(401)
        .json({ error: "Only users providers can load notifications" });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: "desc" })
      .limit(20);
    return res.json(notifications);
  }

  async update(req, res) {
    const { id } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    return res.json(notification);
  }
}

export default new NotificationController();
