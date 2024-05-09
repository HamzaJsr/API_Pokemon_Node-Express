import { Op } from "sequelize";
import { Pokemon } from "../db/sequelize.js";
import auth from "../auth/auth.js";

export default (app) => {
  app.get("/api/pokemons", auth, (req, res) => {
    if (req.query.name) {
      const name = req.query.name;
      const limit = req.query.limit ? req.query.limit : 5;
      // if (name.length < 3) {
      //   const message =
      //     "Le terme de recherche doit contenir au moins 2 caracteres";
      //   return res.status(400).json({ message });
      // }
      //
      // methode identique a findAll qui accepte aussi une limite mais en plus
      //elle nous renvoi le nombre de resultat total dans son objet de reponse un objet contenant 2 propriete {count:X, rows:{pokeomon1,etc}}
      Pokemon.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
        limit: parseInt(limit),
        order: ["name"],
      }).then(({ count, rows }) => {
        const message = `Il y a ${count} ${
          count <= 1 ? "pokémon" : "pokémons"
        } qui ${
          count <= 1 ? "correspond" : "correspondent"
        } à la recherche ${name}`;
        res.json({ message, data: rows });
      });
    } else {
      Pokemon.findAll({ order: ["name"] }) // C'est toujours objet pour le parametre des fonction sequelize
        .then((pokemons) => {
          const message = "La liste des pokémons a bien été récupérée.";
          res.json({ message, data: pokemons });
        })
        .catch((error) => {
          const message =
            "La liste des pokémons n'a pas pu être recuperée. Réesayez dans quelques instants.";
          res.status(500).json({ message, data: error });
        });
    }
  });
};
