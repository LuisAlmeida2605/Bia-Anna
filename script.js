let carrinho = [];
let total = 0;

// Funções para abrir/fechar as gavetas
function toggleMenu() {
    const nav = document.getElementById('nav-links');
    // Se o carrinho estiver aberto, fecha-o antes
    document.getElementById('cart-drawer').classList.remove('active');
    nav.classList.toggle('active');
}

function toggleCart() {
    const cart = document.getElementById('cart-drawer');
    // Se o menu estiver aberto, fecha-o antes
    document.getElementById('nav-links').classList.remove('active');
    cart.classList.toggle('active');
}

// Lógica do Carrinho
function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    total += preco;
    
    // Feedback visual rápido
    atualizarInterface();
    alert("✨ " + nome + " adicionado à sacola!");
}

function atualizarInterface() {
    // Atualiza contador e total
    document.getElementById('cart-count').innerText = carrinho.length;
    document.getElementById('cart-total').innerText = total.toFixed(2).replace('.', ',');
    
    // Lista os itens dentro da gaveta
    const container = document.getElementById('cart-items');
    container.innerHTML = "";
    
    if (carrinho.length === 0) {
        container.innerHTML = '<p style="text-align:center; opacity:0.5; margin-top:20px;">Sua sacola está vazia</p>';
    } else {
        carrinho.forEach((item, index) => {
            container.innerHTML += `
                <div style="display:flex; justify-content:space-between; margin-bottom:15px; background:#252525; padding:10px; border-radius:8px;">
                    <span>${item.nome}</span>
                    <span style="color:#F8C8DC;">R$ ${item.preco.toFixed(2)}</span>
                </div>`;
        });
    }
}

// Envio para WhatsApp
function enviarWhatsApp() {
    if (carrinho.length === 0) {
        alert("Adicione pelo menos um item à sacola!");
        return;
    }
    
    let mensagem = "🌸 *Novo Pedido - Bia & Anna* 🌸\n\n";
    carrinho.forEach(item => {
        mensagem += `• ${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
    });
    mensagem += `\n💰 *Total: R$ ${total.toFixed(2)}*`;
    
    const numero = "557182423915";
    const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    
    window.open(link, '_blank');
}
