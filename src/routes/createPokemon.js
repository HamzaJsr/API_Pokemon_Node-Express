import { UniqueConstraintError, ValidationErrorItem } from "sequelize";
import { Pokemon } from "../db/sequelize.js";
import auth from "../auth/auth.js";

export default (app) => {
  app.post("/api/pokemons", auth, (req, res) => {
    Pokemon.create(req.body)
      .then((pokemonDataCreated) => {
        const message = `Le pokémon ${pokemonDataCreated.name} a bien été crée`;
        res.json({ message, data: pokemonDataCreated });
      }) // on attrappe ici les erreur si c une erreur cote serveur.bdd on renvoie une 500 si c'est le user on renvoi un 400
      .catch((error) => {
        if (ValidationErrorItem) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message =
          "Le pokémon n'a pas pu être ajoutée. Réesayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
};
