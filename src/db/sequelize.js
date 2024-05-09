import { Sequelize, DataTypes } from "sequelize";
import PokemonModel from "../models/pokemon.js";
import UserModel from "../models/user.js";
import pokemonsData from "./mock-pokemon.js";
import bcrypt from "bcrypt"; //encrypté les mdp
let pokemons = pokemonsData;
let sequelize;
// Connexion ORM base de données
// Ici on rentre les identifiants obtenue de la part de JAWSDB de la part de Heroku pour utulise la bdd de production si la variable NODE_ENV est sur Prod
if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(
    "viidybx7fxpg0pus", // Nom de la base de données
    "r1dff0l3wmmo2k67", //Identifiant permettant d'acceder a la base de données par defaut c'est root
    "z1c1ogr41bhhxkby", //Mot de passe permettant d'acceder a la base de données par defaut chaine de caractere vide
    {
      host: "iu51mf0q32fkhfpl.cbetxkdyhwsb.us-east-1.rds.amazonaws.com", //indique ou ce trouve la bdd sur la machine
      dialect: "mariadb", //Nom du driver que nous utilisons pour permettre a sequelize de d'interagir avec la bdd
      dialectOptions: {
        timezone: "Etc/GMT-2",
      },
      logging: true, // Permette d'eviter l'affichage d'avertissement dans la console
    }
  );
} else {
  sequelize = new Sequelize(
    "pokedex", // Nom de la base de données
    "root", //Identifiant permettant d'acceder a la base de données par defaut c'est root
    "", //Mot de passe permettant d'acceder a la base de données par defaut chaine de caractere vide
    {
      host: "localhost", //indique ou ce trouve la bdd sur la machine
      dialect: "mariadb", //Nom du driver que nous utilisons pour permettre a sequelize de d'interagir avec la bdd
      dialectOptions: {
        timezone: "Etc/GMT-2",
      },
      logging: false, // Permette d'eviter l'affichage d'avertissement dans la console
    }
  );
}

//Instanciation de la fonction define pour crée la table/model
export const Pokemon = PokemonModel(sequelize, DataTypes);
export const User = UserModel(sequelize, DataTypes);

// Integration et synchronisation de tout nos model (sequelize* sinon si c'est seulement un model on met le nom de const qui instancie ici Pokemon.sync)
// {force:true} ca supprime toute les table avant de synchro on laisse comme ca pendant le dev puis on enlevera
export const initDb = () => {
  // .sync({ force: true }) force true pour le mode developement car on ecrase les donnée a chaque demarage
  return sequelize
    .sync()
    .then((_) => {
      console.log(`La base de données Pokedex a bien été synchronisée`);
      // Creation d'une ligne dans la table Pokemons (creation d'un pokemon)
      pokemons.map((pokemon) => {
        Pokemon.create({
          name: pokemon.name,
          hp: pokemon.hp,
          cp: pokemon.cp,
          picture: pokemon.picture,
          types: pokemon.types,
        }).then((pokemonsDataCreated) =>
          console.log(pokemonsDataCreated.toJSON())
        );
      });
      //encrypté le mdp afin que la version sauvegardé en bdd soit encrypté
      bcrypt.hash("pikachu", 10).then((hash) => {
        User.create({
          username: "pikachu",
          password: hash,
        }).then((user) => console.log(user.toJSON()));
      });
    })
    .catch((error) => console.log(`${error}`));
};
