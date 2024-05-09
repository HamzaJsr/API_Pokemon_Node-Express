import auth from "../auth/auth.js";
import { Pokemon } from "../db/sequelize.js";

export default (app) => {
  app.delete("/api/pokemons/:id", auth, (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        if (pokemon === null) {
          const message =
            "Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant";
          return res.status(404).json({ message });
        }
        return Pokemon.destroy({
          // On retourne la valeur/resultat de la methode .destroy afin de pouvoir utiliser l'erreur dans le .catch de la methode mere findByPk
          where: {
            id: req.params.id,
          },
        }).then((_) => {
          const message = `Le pokémon avec l'id ${pokemon.id} a bien été supprimé.`;
          res.json({ message, data: pokemon });
        });
      })
      .catch((error) => {
        const message =
          "Le pokémon n'a pas pu être supprimé. Réesayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
};
