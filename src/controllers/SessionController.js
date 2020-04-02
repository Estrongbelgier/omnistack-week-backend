const connection = require("../database/connection");

module.exports = {
  async index(request, reponse) {
    const { id } = request.body;

    const ong = await connection("ongs")
      .where("id", id)
      .select("nome")
      .first();

    if (!ong) {
      return reponse.status(400).json({ error: "Ong does not exists!" });
    }

    return reponse.json(ong);
  }
};
