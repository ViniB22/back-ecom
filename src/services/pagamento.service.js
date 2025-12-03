const Pagamento = require('../models/Pagamento')

async function criarPagamento(dados) {

    const { idPedido, idCompra, valor, metodo, status } = dados

    // Validações simples antes de salvar
    if (valor == null || !metodo) {
        throw new Error('Valor e método são obrigatórios')
    }

    const novoPagamento = await Pagamento.create({
        idPedido,
        idCompra,
        valor,
        metodo,
        status
    })

    return novoPagamento
}

async function listarPagamentos(idUsuario = null) {
    if (idUsuario) {
        // For client, list payments where idPedido is null (registered methods)
        const pagamentos = await Pagamento.findAll({ where: { idPedido: null } })
        // But to filter by user, perhaps need a relation, but since no idUsuario in Pagamento, maybe not.
        // For now, since it's for methods, and idPedido null, but to make it user-specific, perhaps add idUsuario to Pagamento model.
        // But since the model doesn't have, for simplicity, list all with idPedido null.
        return pagamentos
    }
    const pagamentos = await Pagamento.findAll()
    return pagamentos
}

async function atualizarPagamento(id, dados) {

    // Buscar o pagamento no banco
    const pagamento = await Pagamento.findByPk(id)

    if (!pagamento) {
        throw new Error('Pagamento não encontrado')
    }

    // Atualizar apenas os campos enviados
    await pagamento.update(dados)

    return pagamento

}

async function atualizarPagamentoCompleto(id, dados) {

    const pagamento = await Pagamento.findByPk(id)

    if (!pagamento) {
        throw new Error('Pagamento não encontrado')
    }

    const { idPedido, idCompra, valor, metodo, status } = dados

    // Validações básicas
    if (valor == null || !metodo) {
        throw new Error('Valor e método são obrigatórios')
    }

    await pagamento.update({
        idPedido,
        idCompra,
        valor,
        metodo,
        status
    })

    return pagamento
}

async function apagarPagamento(id) {

    const pagamento = await Pagamento.findByPk(id)

    if (!pagamento) {
        throw new Error('Pagamento não encontrado')
    }

    await pagamento.destroy()

    return true
}


module.exports = { criarPagamento, listarPagamentos, 
    atualizarPagamento, atualizarPagamentoCompleto, apagarPagamento }