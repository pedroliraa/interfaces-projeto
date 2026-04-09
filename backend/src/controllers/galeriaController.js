import Galeria from "../models/galeriaModel.js";

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
        descricao: descricao,
      });
      return res.status(201).json(novaImagem);
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ error: "Erro ao salvar imagem na Galeria." });
    }
  }

  async index(req, res) {
    const imagens = await Galeria.find();
    return res.json(imagens);
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const imagemDeletada = await Galeria.findByIdAndDelete(id);

      if (!imagemDeletada) {
        return res.status(404).json({ error: "Imagem não encontrada." });
      }

      return res.json({ message: "Imagem removida com sucesso da galeria!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao deletar imagem." });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { titulo, descricao } = req.body;

      const fotoAtualizada = await Galeria.findByIdAndUpdate(
        id,
        { titulo, descricao },
        { new: true },
      );

      if (!fotoAtualizada) {
        return res.status(404).json({ message: "Foto não encontrada" });
      }

      return res.json(fotoAtualizada);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new GaleriaController();
