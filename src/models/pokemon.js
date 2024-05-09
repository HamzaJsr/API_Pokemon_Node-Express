const validTypes = [
  "Plante",
  "Poison",
  "Feu",
  "Eau",
  "Insecte",
  "Vol",
  "Normal",
  "Electrik",
  "Fée",
];
export default (sequelize, DataTypes) => {
  // sequelize.define("nom de table", {atributs de la tables id, name...}, {options})
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        //les validateur/contrainte sont logiquement appeler que pour les phases de creation et modification
        unique: { msg: "Ce pokemon est deja présent" },
        validate: {
          isAlpha: {
            msg: "Uniquement des lettres pour le nom de pokémon.",
          },
          notNull: true,
          notEmpty: true,
          len: [3, 25],
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Uniquement des nombres entier pour les points de vie.",
          },
          notNull: { msg: "Les points de vie est une donnée obligatoire." },
          min: {
            args: [0],
            msg: "Les points de vie doivent être superieur ou egal à 0",
          },
          max: {
            args: [1000],
            msg: "Les points de vie ne peuvent êtres de plus de 1000 ",
          },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Uniquement des nombres entier pour les points d'attaque.",
          },
          notNull: { msg: "Les points d'attaques est une donnée obligatoire." },
          min: {
            args: [0],
            msg: "Les points de vie ne peut être negatif",
          },
          max: {
            args: [100],
            msg: "Les points de vie ne peuvent êtres de plus de 1000 ",
          },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: "Il font une URL valide pour l'image" },
          notNull: { msg: "L'URL de l'image est une donnée obligatoire." },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("types").split(","); //passer de "chaine de caractere" ==> vers un [Tableau],  (DB ==> User)
        },
        set(value) {
          this.setDataValue("types", value.join()); //passer d'un [Tableau]  ==> vers "chaine de caractere", [User ==> En memoire objet Sequelize ==> Validation/ou non ==> DB]
        },

        validate: {
          //value viens du setter qui recupere la value et la stock en memoire dans objet Sequelize pour proceder a la validation avec les validateur suivant
          // vue que la value a été .join dans le setter donc on la .split() pour traiter sous forme array
          isTypesValide(value) {
            if (!value) {
              throw new Error("Un pokemon doit avoir au moins un types");
            }
            if (value.split(",").length > 3) {
              throw new Error(
                "Un pokémon ne peut pas avoir plus de trois types"
              );
            }
            value.split(",").forEach((type) => {
              if (!validTypes.includes(type)) {
                throw new Error(
                  `Le type d'un pokémon doit appartenir à la liste suivante ${validTypes}`
                );
              }
            });
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
