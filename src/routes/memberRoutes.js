module.exports = (app) => {
  const memberControllers = require("../controllers/memberControllers");

  app.route("/members").get(memberControllers.readMember).post(memberControllers.createMember);
  app.route("/members/:account").put(memberControllers.updateMember).delete(memberControllers.deleteMember);
};
