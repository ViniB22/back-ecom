const express = require('express')
const router = express.Router()

const { criar, listar, listarPorPedido, atualizar,
    atualizarCompleto, deletar } = require('../controllers/itemPedido.controller')

// Middlewares
const authMiddleware = require('../middlewares/auth.middleware')
const isAdminMiddleware = require('../middlewares/isAdmin.middleware')

// POST /itemPedido
router.post(
    '/',
    authMiddleware,      // precisa estar logado
    criar
)

// GET – Listar itensPedido (qualquer usuário logado)
router.get(
'/',
authMiddleware,
listar
)

// GET /itemPedido/pedido/:idPedido
router.get(
'/pedido/:idPedido',
authMiddleware,
listarPorPedido
)

// Atualizar parcialmente itemPedido (ADMIN)
router.patch(
'/:id',
authMiddleware,
isAdminMiddleware,
atualizar
)

// PUT - completo
router.put(
    '/:id', 
    authMiddleware, 
    isAdminMiddleware, 
    atualizarCompleto
)

// DELETE
router.delete(
    '/:id',
    authMiddleware,
    isAdminMiddleware,
    deletar
)

module.exports = router