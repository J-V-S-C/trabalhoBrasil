const db = require('../db/db.config')

const buscarPedidos = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM pedidos";
        db.query(query, [], (err, results) => {
            if (err) return reject(err);
            resolve(results); 
        });
    });
};


const criarPedido = (dataCompra, valorTotal, usuarioId) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO pedidos (data_compra, valor_total, usuario_id) VALUES (?, ?, ?)';
        db.query(query, [dataCompra, valorTotal, usuarioId], (err, result) => {
          if (err) return reject(err);
          resolve(result.insertId); 
        });
        });
}

const inserirItensNoPedido = (pedidoId, itens ) => {
    return Promise.all(itens.map(item => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO pedidos_itens (pedido_id, item_id, quantidade, valor_venda) VALUES (?, ?, ?, ?)';
            db.query(query, [pedidoId, item.id, item.quantidade, item.preco], (err) => {
              if (err) return reject(err);
              resolve();})
        })
    }))
}

const atualizarStatusPedido = (pedidoId, novoStatus) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE pedidos SET status = ? WHERE id = ?';
        db.query(query, [novoStatus, pedidoId], (err, result) => {
            if (err) return reject(err);
            resolve();
        });
    });
};

const deletarPedido = (id) => {
    return new Promise((resolve, reject) => {
      const deletarItens = 'DELETE FROM pedidos_itens WHERE pedido_id = ?';
      const deletarPedido = 'DELETE FROM pedidos WHERE id = ?';
  
      db.query(deletarItens, [id], (err) => {
        if (err) return reject(err);
        db.query(deletarPedido, [id], (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    });
  };
  
  

module.exports = {
    buscarPedidos,
    criarPedido,
    inserirItensNoPedido,
    atualizarStatusPedido,
    deletarPedido
}