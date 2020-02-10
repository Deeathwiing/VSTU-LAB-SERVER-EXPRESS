const CronJob = require("cron").CronJob,
  user = require("../../init/models").User,
  userRep = require("../../repository/userRepository");

const job = new CronJob(
  "* * 23 1 * *",
  async () => {
    console.log("You will see this message every second");
    const users = await user.findAll({
      where: { deleteAccountRequest: true }
    });
    users.forEach((element, i, arr) => {
      const date = element.dataValues.updatedAt.toString();
      const difference = Date.parse(date) - Date.now();
      if (difference > 1000 * 60 * 60 * 24 * 30) {
        userRep.deleteUser(element.dataValues.id);
      }
    });
  },
  null,
  true,
  "America/Los_Angeles"
);

module.exports = job;
