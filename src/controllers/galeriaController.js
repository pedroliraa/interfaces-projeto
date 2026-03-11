import Galeria from '../models/Galeria.js';

class GaleriaController {
    async cadastrar(req, res) {
        try {

            if (!req.file) {
                return res.status(400).json({ error: "Por favor, envie uma imagem." });
            }

            const { filename } = req.file;
            const { titulo, descricao } = req.body;

            const novaImagem = await Galeria.create({
                imagemUrl: filename,
                titulo: titulo,
                descricao: descricao
            });
            return res.status(201).json(novaImagem);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: "Erro ao salvar imagem na Galeria." });
        }
    }

    async index(req, res) {
        const imagens = await Galeria.find();
        return res.json(imagens);
    }
}
