const connection = require("../database/connection");

module.exports = {
  async index(request, reponse) {
    const { page = 1 } = request.query; // Paginação

    const [count] = await connection("incidents").count(); // Contagem de casos

    const incidents = await connection("incidents") // Listagem de casos por paginação
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "incidents.*",
        "ongs.nome",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf"
      ]);

    reponse.header("X-Total-Count", count["count(*)"]);

    return reponse.json(incidents);
  },

  async create(request, reponse) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id
    });
    return reponse.json(id);
  },

  async delete(request, reponse) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection("incidents")
      .where("id", id)
      .select("ong_id")
      .first();

    if (incident.ong_id !== ong_id) {
      return reponse.status(401).json({ erro: "Operation not permited" });
    }
    await connection("incidents")
      .where("id", id)
      .delete();
    return reponse.status(204).send();
  }
};
// INCIDENT Controller
