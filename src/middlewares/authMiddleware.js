import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ mensagem: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.funcionarioId = decoded.id;
        req.userRole = decoded.role;

        next();

    } catch (error) {

        return res.status(401).json({ mensagem: "Token inválido" });

    }

};