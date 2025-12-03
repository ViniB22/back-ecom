const express = require('express')
const router = express.Router()

const { criar, listar, atualizar,
    atualizarCompleto, deletar } = require('../controllers/endereco.controller')

// Middlewares
const authMiddleware = require('../middlewares/auth.middleware')
const isAdminMiddleware = require('../middlewares/isAdmin.middleware')

// POST /endereco
router.post(
    '/',
    authMiddleware,      // precisa estar logado
    criar
)

// GET – Listar enderecos (qualquer usuário logado)
router.get(
'/',
authMiddleware,
listar
)

// Atualizar parcialmente endereco
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