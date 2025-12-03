const usuarioService = require('../services/usuario.service')

async function cadastrar(req, res) {
    try {
        const dados = req.body

        const resultado = await usuarioService.cadastrar(dados)

        return res.status(201).json({
            message: 'Usuário cadastrado com sucesso'})

    } catch (err) {
        console.error('Erro no controller de cadastro:', err)

        return res.status(500).json({message: 'Erro ao cadastrar usuário', err})
    }
}

module.exports = { cadastrar }
