let carrinho = [];
let total = 0;

// 1. CARREGAR DADOS AO ABRIR O SITE
window.onload = function() {
    const salvo = localStorage.getItem('carrinho_bia_anna');
    if (salvo) {
        carrinho = JSON.parse(salvo);
        // Recalcula o total baseado no que foi carregado
        total = carrinho.reduce((sum, item) => sum + item.preco, 0);
        atualizarInterface();
    }
};

// 2. SALVAR DADOS NO NAVEGADOR
function salvarNoNavegador() {
    localStorage.setItem('carrinho_bia_anna', JSON.stringify(carrinho));
}

function toggleMenu() {
    const nav = document.getElementById('nav-links');
    document.getElementById('cart-drawer').classList.remove('active');
    nav.classList.toggle('active');
}

function toggleCart() {
    const cart = document.getElementById('cart-drawer');
    document.getElementById('nav-links').classList.remove('active');
    cart.classList.toggle('active');
}

function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    total += preco;
    
    salvarNoNavegador(); // Salva a cada adição
    atualizarInterface();
}

function removerDoCarrinho(index) {
    total -= carrinho[index].preco;
    carrinho.splice(index, 1);
    
    salvarNoNavegador(); // Salva a cada remoção
    atualizarInterface();
}

function atualizarInterface() {
    document.getElementById('cart-count').innerText = carrinho.length;
    document.getElementById('cart-total').innerText = total.toFixed(2).replace('.', ',');
    
    const container = document.getElementById('cart-items');
    container.innerHTML = "";
    
    if (carrinho.length === 0) {
        container.innerHTML = '<p style="text-align:center; opacity:0.4; margin-top:40px;">Sua sacola está vazia 🌸</p>';
    } else {
        carrinho.forEach((item, index) => {
            container.innerHTML += `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; background:#2a2a2a; padding:12px; border-radius:10px; border: 1px solid #444;">
                    <div style="display:flex; flex-direction:column;">
                        <span style="font-size:0.9rem; color:white;">${item.nome}</span>
                        <span style="color:#FFC0CB; font-weight:600; font-size:0.8rem;">R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <button onclick="removerDoCarrinho(${index})" style="background:none; border:none; color:#ff4d4d; cursor:pointer; font-size:1.2rem; padding:5px;">🗑️</button>
                </div>`;
        });
    }
}

function enviarWhatsApp() {
    if (carrinho.length === 0) {
        alert("Adicione pelo menos um item à sacola!");
        return;
    }
    
    let mensagem = "🌸 *Novo Pedido - Bia & Anna* 🌸\n\n";
    carrinho.forEach(item => {
        mensagem += `• ${item.nome} - R$ ${item.preco.toFixed(2).replace('.', ',')}\n`;
    });
    mensagem += `\n💰 *Total: R$ ${total.toFixed(2).replace('.', ',')}*`;
    
    const numero = "557182423915";
    const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    
    window.open(link, '_blank');
}
