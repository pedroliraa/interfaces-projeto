import Comentario from "../models/comentarioModel.js";

export const listarComentarios = async (req, res) => {
  try {
    const comentarios = await Comentario.find()
      .populate("cliente", "nome")
      .sort({ criadoEm: -1 });
    res.status(200).json(comentarios);
  } catch (error) {
    res
      .status(500)
      .json({ mensagem: "Erro ao listar comentários", erro: error.message });
  }
};

export const criarComentario = async (req, res) => {
  try {
    const { clienteId, servico, comentario, avaliacao } = req.body;

    const novoComentario = await Comentario.create({
      cliente: clienteId,
      servico,
      comentario,
      avaliacao,
    });

    res
      .status(201)
      .json({
        mensagem: "Comentário criado com sucesso",
        comentario: novoComentario,
      });
  } catch (error) {
    res
      .status(500)
      .json({ mensagem: "Erro ao criar comentário", erro: error.message });
  }
};

export const deletarComentario = async (req, res) => {
  try {
    const comentario = await Comentario.findByIdAndDelete(req.params.id);
    if (!comentario) {
      return res.status(404).json({ mensagem: "Comentário não encontrado" });
    }
    res.status(200).json({ mensagem: "Comentário deletado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ mensagem: "Erro ao deletar comentário", erro: error.message });
  }
};

//teste commit
