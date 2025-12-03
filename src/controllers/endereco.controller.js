const Endereco = require('../models/Endereco')
const { criarEndereco, listarEnderecos,
    atualizarEndereco, atualizarEnderecoCompleto, apagarEndereco } = require('../services/endereco.service.js')

async function criar(req, res) {

    try {

        const dados = { ...req.body, idUsuario: req.user.id }
        const endereco = await criarEndereco(dados)

        return res.status(201).json({
            message: 'Endereço criado com sucesso',
            endereco
        })

    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}

async function listar(req, res) {
    try {
        const idUsuario = req.user.id
        const enderecos = await listarEnderecos(idUsuario)

        return res.status(200).json(enderecos)

    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}

// Atualizar parcialmente endereco (PATCH /endereco/)
async function atualizar(req, res) {
    try {
        const { id } = req.params
        const dados = req.body
        const idUsuario = req.user.id

        // Check ownership
        const endereco = await Endereco.findByPk(id)
        if (!endereco || endereco.idUsuario !== idUsuario) {
            return res.status(403).json({ erro: 'Acesso negado' })
        }

        const enderecoAtualizado = await atualizarEndereco(id, dados)

        return res.status(200).json({
            message: 'Endereço atualizado com sucesso',
            endereco: enderecoAtualizado
        })

    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }

}

// PUT - Atualização total
async function atualizarCompleto(req, res) {
    try {
        const { id } = req.params
        const dados = req.body
        const idUsuario = req.user.id

        // Check ownership
        const endereco = await Endereco.findByPk(id)
        if (!endereco || endereco.idUsuario !== idUsuario) {
            return res.status(403).json({ erro: 'Acesso negado' })
        }

        const enderecoAtualizado = await atualizarEnderecoCompleto(id, dados)

        return res.status(200).json({
            message: 'Endereço atualizado completamente com sucesso',
            endereco: enderecoAtualizado
        })

    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}

// DELETE - apagar
async function deletar(req, res) {
    try {
        const { id } = req.params
        const idUsuario = req.user.id

        // Check ownership
        const endereco = await Endereco.findByPk(id)
        if (!endereco || endereco.idUsuario !== idUsuario) {
            return res.status(403).json({ erro: 'Acesso negado' })
        }

        await apagarEndereco(id)

        return res.status(200).json({ message: 'Endereço apagado com sucesso' })

    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}


module.exports = { criar, listar, atualizar, 
    atualizarCompleto, deletar }