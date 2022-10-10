module.exports = (app) => {
  const memberControllers = require("../controllers/memberControllers");

  app.route("/members").get(memberControllers.readAllMember).post(memberControllers.createMember);
  app
    .route("/members/:account")
    .post(memberControllers.readMember)
    .put(memberControllers.updateMember)
    .delete(memberControllers.deleteMember);
};
