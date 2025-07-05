const produtos = [
  { nome: "AGUA", preco: 3.00 },  
  { nome: "BOLO", preco: 5.00 },
  { nome: "COCADA", preco: 4.00 },
  { nome: "PRATINHO", preco: 10.00 },
  { nome: "SUCO 200 ml", preco: 4.00 },
  { nome: "REFRI LATA", preco: 4.00 }, 
  { nome: "MUGUNZÁ", preco: 5.00 },
  { nome: "PIPOCA GOURM", preco: 6.00 }
  
];

const container = document.getElementById('box-container');
const produtosList = document.getElementById('produtos-list');
const totalGeral = document.getElementById('total-geral');
const finalizarBtn = document.getElementById('finalizar-btn');

const carrinho = {};

produtos.sort((a, b) => {
  if (a.nome < b.nome) return -1;
  if (a.nome > b.nome) return 1;
  return 0;
});


produtos.forEach(produto => {
  const box = document.createElement('div');
  box.classList.add('box');
  box.textContent = produto.nome;

  box.addEventListener('click', () => {
    if (!carrinho[produto.nome]) {
      carrinho[produto.nome] = { quantidade: 0, preco: produto.preco };
    }
    carrinho[produto.nome].quantidade += 1;
    atualizarLista();
  });

  container.appendChild(box);
});

function atualizarLista() {
  produtosList.innerHTML = '';
  let total = 0;

  Object.keys(carrinho).forEach(nome => {
    const item = carrinho[nome];
    const subtotal = item.quantidade * item.preco;
    total += subtotal;

    const li = document.createElement('li');

const btnSubtrair = document.createElement('button');
btnSubtrair.textContent = '-';
btnSubtrair.style.marginRight = '10px';
btnSubtrair.addEventListener('click', () => {
  item.quantidade -= 1;
  if (item.quantidade <= 0) {
    delete carrinho[nome];
  }
  atualizarLista();
});

li.appendChild(btnSubtrair);

// Criar o <strong> para a quantidade
const quantidadeStrong = document.createElement('strong');
quantidadeStrong.textContent = `${item.quantidade}`;

// Adicionar os elementos ao li
li.appendChild(quantidadeStrong);
li.appendChild(document.createTextNode(`. ${nome} . x . R$ ${item.preco.toFixed(2)} = R$ ${subtotal.toFixed(2)}`));

produtosList.appendChild(li);
  });

  // total geral que aparece no final da página
totalGeral.textContent = `Total Geral: R$ ${total.toFixed(2)}`;


let boxTotal = document.getElementById('box-total');
if (!boxTotal) {
  boxTotal = document.createElement('div');
  boxTotal.id = 'box-total';
  finalizarBtn.parentNode.appendChild(boxTotal);
}
// total que aparece na caixa branca
 boxTotal.textContent = `Total:\nR$ ${total.toFixed(2)}`;

}

finalizarBtn.addEventListener('click', () => {
  const total = Object.keys(carrinho).reduce((acc, nome) => {
    return acc + carrinho[nome].quantidade * carrinho[nome].preco;
  }, 0);
  
  document.getElementById('modal-total').textContent = `Total: R$ ${total.toFixed(2)}`;
  document.getElementById('valor-pago').value = '';
  document.getElementById('modal-troco').textContent = '';
  document.getElementById('modal-confirmacao').style.display = 'block';

  document.getElementById('calcular-btn').onclick = () => {
    const valorPago = parseFloat(document.getElementById('valor-pago').value);
    if (isNaN(valorPago)) {
      document.getElementById('modal-troco').textContent = 'Digite um valor válido.';
      return;
    }
    const troco = valorPago - total;
    if (troco < 0) {
      document.getElementById('modal-troco').textContent = `Valor insuficiente. Falta R$ ${Math.abs(troco).toFixed(2)}`;
    } else {
      document.getElementById('modal-troco').textContent = `Troco: R$ ${troco.toFixed(2)}`;
    }
  };

  document.getElementById('confirmar-btn').onclick = () => {
    document.getElementById('modal-confirmacao').style.display = 'none';
    location.reload();
  };

  document.getElementById('cancelar-btn').onclick = () => {
    document.getElementById('modal-confirmacao').style.display = 'none';
  };
});





