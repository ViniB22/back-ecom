const { criarPedido, listarPedidos, listarPedidosPorUsuario, obterPedido,
    atualizarPedido, atualizarPedidoCompleto, apagarPedido } = require('../services/pedido.service.js')

async function criar(req, res) {

    try {

        const pedido = await criarPedido(req.body)

        return res.status(201).json({
            message: 'Pedido criado com sucesso',
            pedido
        })

    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}

async function listar(req, res) {
    try {
        const pedidos = await listarPedidos()

        return res.status(200).json(pedidos)

    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}

async function listarPorUsuario(req, res) {
    try {
        const { idUsuario } = req.params
        const pedidos = await listarPedidosPorUsuario(idUsuario)

        return res.status(200).json(pedidos)

    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}

async function obter(req, res) {
    try {
        const { id } = req.params
        const pedido = await obterPedido(parseInt(id))

        if (!pedido) {
            return res.status(404).json({ erro: 'Pedido não encontrado' })
        }

        return res.status(200).json(pedido)

    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}

// Atualizar parcialmente pedido (PATCH /pedido/)
async function atualizar(req, res) {
    try {
        const { id } = req.params
        const dados = req.body

        const pedidoAtualizado = await atualizarPedido(id, dados)

        return res.status(200).json({
            message: 'Pedido atualizado com sucesso',
            pedido: pedidoAtualizado
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

        const pedidoAtualizado = await atualizarPedidoCompleto(id, dados)

        return res.status(200).json({
            message: 'Pedido atualizado completamente com sucesso',
            pedido: pedidoAtualizado
        })

    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}

// DELETE - apagar
async function deletar(req, res) {
    try {
        const { id } = req.params

        await apagarPedido(id)

        return res.status(200).json({ message: 'Pedido apagado com sucesso' })

    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}


module.exports = { criar, listar, listarPorUsuario, obter, atualizar,
    atualizarCompleto, deletar }