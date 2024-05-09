import { UniqueConstraintError, ValidationErrorItem } from "sequelize";
import { Pokemon } from "../db/sequelize.js";
import auth from "../auth/auth.js";

export default (app) => {
  app.put("/api/pokemons/:id", auth, (req, res) => {
    // methde .update() n'as pas de valeur de retour exploitable pour faire un if directement ici
    // et on ne peut pas personalisé la reponse car pas de valeur de retour exploitable donc on rajoute la methode findByPk
    Pokemon.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then((_) => {
        return Pokemon.findByPk(req.params.id).then((pokemonUpdated) => {
          if (pokemonUpdated === null) {
            const message =
              "Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant";
            return res.status(404).json({ message });
          }
          // console.log(pokemonUpdated.toJSON());//toJSON() est une fonction de sequlize pour n'afficher que la partie interessante
          const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`;
          res.json({ message, data: pokemonUpdated });
        });
      })
      .catch((error) => {
        if (ValidationErrorItem) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message =
          "Le pokémon n'a pas pu être modifié. Réesayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
};
