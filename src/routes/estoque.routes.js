const express = require('express')
const router = express.Router()

const { criar, listar, obterPorProduto, atualizar,
    atualizarCompleto, deletar } = require('../controllers/estoque.controller')

// Middlewares
const authMiddleware = require('../middlewares/auth.middleware')
const isAdminMiddleware = require('../middlewares/isAdmin.middleware')

// POST /estoque
router.post(
    '/',
    authMiddleware,      // precisa estar logado
    isAdminMiddleware,   // precisa ser admin
    criar
)

// GET – Listar estoques (qualquer usuário logado)
router.get(
'/',
authMiddleware,
listar
)

// GET /estoque/produto/:idProduto
router.get(
'/produto/:idProduto',
authMiddleware,
obterPorProduto
)

// Atualizar parcialmente estoque (ADMIN)
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