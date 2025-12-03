const express = require('express')
const router = express.Router()

const { criar, listar, atualizar,
    atualizarCompleto, deletar } = require('../controllers/pagamento.controller')

// Middlewares
const authMiddleware = require('../middlewares/auth.middleware')

// POST /pagamento
router.post(
    '/',
    authMiddleware,      // precisa estar logado
    criar
)

// GET – Listar pagamentos (qualquer usuário logado)
router.get(
'/',
authMiddleware,
listar
)

// Atualizar parcialmente pagamento
router.patch(
    '/:id',
    authMiddleware,
    atualizar
)

// PUT - completo
router.put(
    '/:id',
    authMiddleware,
    atualizarCompleto
)

// DELETE
router.delete(
    '/:id',
    authMiddleware,
    deletar
)

module.exports = router