const memberService = require("../service/memberService");

exports.createMember = async (request, response) => {
  response.send(await memberService.createMember(request));
};

exports.readMember = async (request, response) => {
  response.json(await memberService.readMember());
};

exports.updateMember = async (request, response) => {
  response.send(await memberService.updateMember(request));
};

exports.deleteMember = async (request, response) => {
  response.send(await memberService.deleteMember(request));
};
