import express from "express";
// import morgan from "morgan";
import favicon from "serve-favicon";
// import bodyParser from "body-parser"; Plus besoin car integrer à express
import * as sequelize from "./src/db/sequelize.js";
import findAllPokemons from "./src/routes/findAllPokemons.js";
import findPokemonByPk from "./src/routes/findPokemonByPk.js";
import createPokemon from "./src/routes/createPokemon.js";
import updatePokemon from "./src/routes/updatePokemon.js";
import deletePokemon from "./src/routes/deletePokemon.js";
import login from "./src/routes/login.js";
import cors from "cors";

export const app = express();
// On serveur ecoute sur le PORT specifier par Heroku quand il sera en production donc heroku vas creer la propriete PORT dans la variable
// d'environement env de process.env sinon elle y est pas c'est que on est en local et le port sera 3000
const port = process.env.PORT || 3000;

app //__dirname est devenue import.meta.dirname
  .use(favicon(import.meta.dirname + "/assets/apple-icon-144x144.png"))
  //.use(morgan("dev"))  Pour les infos sur les requete faite a l'api avec le navigateur
  .use(express.json()) //Rendre les requete en format JSON (rendre les body du format string au format object javascript exploitable)
  .use(cors())
  .use(express.static("public")); // Servir fichier statique juste pour tester rien a voir avec le reste de l'api

sequelize.initDb();

app.get("/", (req, res) => {
  res.json("Hello Hiroku 🎉");
});

// Ici nous ajouterons nos futurs points de terminaisons.
findAllPokemons(app);
findPokemonByPk(app);
createPokemon(app);
updatePokemon(app);
deletePokemon(app);
login(app);

// On ajoute la gestion de l'erreur 404 normalement c'est avec en parametre err, req, res, next mais l'erreur 404 n'etant pas une erreur elle ne prend pas
// de parametre err
// de plus vue que l'on a besoin uniquement de la propriete res on peut destructuring en mettant {res} uniquement
app.use(({ res }) => {
  const message = "Imposible de trouver la ressource, essayez une autre URL";
  res.status(404).json({ message });
});

app.listen(port, () =>
  console.log(`Notre app Node est démarrée sur http:localhost:${port}`)
);
