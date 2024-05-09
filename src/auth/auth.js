import jwt from "jsonwebtoken";
import privateKey from "../auth/private_key.js";

export default (req, res, next) => {
  // on recupere le token (avec la partie Bearer) dans lentete  headers: "authorization": `Bearer <Token>`
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    const message =
      "Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.";
    return res.status(401).json({ message });
  }

  const token = req.headers.authorization.split(" ")[1]; // On extrait seulement le token de la partie Bearer
  // methode verify de jwt qui vas comparer le token recuperer et la private key
  const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
    if (error) {
      const message =
        "L'utilisateur n'est pas autorisé à acceder à cette ressources";
      return res.status(401).json({ message });
    }

    // Si il y à une propriete userId dans le body de la requete alors on verifie si l'id corespond à l'id dans le token (dans l'objet decodedToken)
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      const message = "L'identifiant de l'utilisateur est invalide";
      res.status(401).json({ message });
    } else {
      next();
    }
  });
};
