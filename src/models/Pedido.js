const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Pedido = db.define('pedido',{
    codPedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios', 
            key: 'codUsuario'  
        }
    },
    idEndereco: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'enderecos', 
            key: 'codEndereco'  
        }
    },
    dataPedido: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'PENDENTE_PAGAMENTO'
    },
    valorSubtotal: {
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false,
        defaultValue: 0.00
    },
    valorFrete: {
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false,
        defaultValue: 0.00
    },
    valorTotal: {
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false,
        defaultValue: 0.00
    },
    metodoPagamento: {
    type: DataTypes.STRING(50),
    allowNull: true
}
},{
    timestamps: true,
    tableName: 'pedidos'
})

module.exports = Pedido