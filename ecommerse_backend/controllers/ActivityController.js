// controllers/userActivityController.js
const UserActivity = require("../models/ActivityModel");

const logLogin = async (req, res) => {
  const { userId, sessionId, ipAddress, userAgent } = req.body;

  try {
    const activity = await UserActivity.create({
      userId,
      sessionId,
      ipAddress,
      userAgent,
      loginAt: new Date(),
    });
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ error: "Failed to log login activity" });
  }
};

const logLogout = async (req, res) => {
  const { sessionId } = req.body;

  try {
    const updated = await UserActivity.findOneAndUpdate(
      { sessionId },
      { logoutAt: new Date() },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to log logout activity" });
  }
};

const logPageVisit = async (req, res) => {
  const { sessionId, page, enteredAt, exitedAt } = req.body;

  try {
    const duration =
      (new Date(exitedAt).getTime() - new Date(enteredAt).getTime()) / 1000;

    const updated = await UserActivity.findOneAndUpdate(
      { sessionId },
      {
        $push: {
          activities: {
            page,
            enteredAt,
            exitedAt,
            durationInSeconds: duration,
          },
        },
      },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to log page activity" });
  }
};

module.exports = {
  logLogin,
  logLogout,
  logPageVisit,
};
