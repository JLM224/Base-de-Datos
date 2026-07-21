const jwt = require("jsonwebtoken");

const auth = (roles = []) => {
  return (req, res, next) => {
    try {
      if (!process.env.JWT_SECRETA) {
        throw new Error("JWT_SECRETA no está definido");
      }

      const authHeader =
        req.headers.authorization ||
        req.headers.auth ||
        req.headers["x-access-token"];

      if (!authHeader) {
        return res.status(401).json({ msg: "Falta token" });
      }

      let token = authHeader;
      if (typeof token === "string" && token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRETA);

      req.user = decoded;

      if (roles.length) {
        const rolesPermitidos = Array.isArray(roles) ? roles : [roles];

        if (!rolesPermitidos.includes(decoded.rol)) {
          return res.status(403).json({ msg: "No autorizado" });
        }
      }
      next();
    } catch (error) {
      return res.status(401).json({
        msg: "Token inválido o expirado",
      })
    }
  }
}

module.exports = auth