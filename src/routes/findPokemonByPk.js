import auth from "../auth/auth.js";
import { Pokemon } from "../db/sequelize.js";

export default (app) => {
  app.get("/api/pokemons/:id", auth, (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        if (pokemon === null) {
          return res.json("Aucun pokémon ne correspond à cet identifiant ");
        }
        const message = `Le pokémon ${pokemon.name} à bien été recuperé`;
        res.json({ message, data: pokemon });
      })
      .catch((error) => {
        const message =
          "Le pokémon n'a pas pu être recuperée. Réesayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
};
