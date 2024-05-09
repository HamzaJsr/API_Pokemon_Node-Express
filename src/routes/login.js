import { User } from "../db/sequelize.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import privateKey from "../auth/private_key.js";

export default (app) => {
  app.post("/api/login", (req, res) => {
    User.findOne({ where: { username: req.body.username } }).then((user) => {
      if (!user) {
        const message = `L'utilisateur '${req.body.username}' n'existe pas`;
        return res.status(404).json({ message });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((isPasswordValidate) => {
          if (!isPasswordValidate) {
            const message = `Le mot de passe est incorrect`;
            return res.status(401).json({ message });
          }

          //JWT JSON WEB TOKEN
          const token = jwt.sign({ userId: user.id }, privateKey, {
            expiresIn: "24h",
          });

          const message = `L'utilisateur '${user.username}' a été connecté avec succés`;
          return res.json({ message, token });
        });
    });
  });
};
