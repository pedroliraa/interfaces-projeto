export const verificarAdmin = (req, res, next) => {

    if (req.userRole !== "admin") {
        return res.status(403).json({
            mensagem: "Acesso permitido apenas para administradores"
        });
    }

    next();
};