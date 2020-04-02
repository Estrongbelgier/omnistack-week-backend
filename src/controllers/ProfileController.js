const connection = require("../database/connection");

module.exports = {
  async index(request, reponse) {
    const ong_id = request.headers.authorization;

    const inscident = await connection("incidents")
      .where("ong_id", ong_id)
      .select("*");

    return reponse.json(inscident);
  }
};
