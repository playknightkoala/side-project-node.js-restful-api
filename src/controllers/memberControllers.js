const memberService = require("../service/memberService");

exports.readMember = async (request, response) => {
    response.json(await memberService.queryMember());
}

exports.login = async (request, response) => {
    response.json(await memberService.login(request));
}

exports.createMember = (request, response) => {
    response.send(memberService.createMember(request.body));
}