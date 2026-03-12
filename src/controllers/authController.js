import Funcionario from "../models/funcionarioModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// login do funcionário
export const login = async (req, res) => {

    try {

        const { email, senha } = req.body;

        const funcionario = await Funcionario.findOne({ email });

        if (!funcionario) {
            return res.status(404).json({
                mensagem: "Funcionário não encontrado"
            });
        }

        const senhaValida = await bcrypt.compare(senha, funcionario.senha);

        if (!senhaValida) {
            return res.status(401).json({
                mensagem: "Senha inválida"
            });
        }

        const token = jwt.sign(
            {
                id: funcionario._id,
                role: funcionario.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            mensagem: "Login realizado com sucesso",
            token
        });

    } catch (error) {

        res.status(500).json({
            erro: error.message
        });

    }

};