import Agendamento from '../models/agendamentoModel.js';

const criarAgendamento = async (req, res) => {
  try {
    let { cliente, funcionario, servico, data, status } = req.body;

    const agendamento = await Agendamento.create({ cliente, funcionario, servico, data, status });
    res.status(201).json({
        sucesso: true,
        mensagem: 'Agendamento criado com sucesso',
        dados: agendamento, 
    });
  } catch (error) {
    res.status(400).json({
        sucesso: false,
        mensagem: error.message,
    });
    }
};




export { criarAgendamento };  