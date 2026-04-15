// 1. Selecionamos todos os elementos necessários
const btnAbrir = document.getElementById('btn-menu');
const btnFechar = document.getElementById('btn-fechar');
const menuLateral = document.getElementById('menu-lateral');
const overlay = document.getElementById('overlay-menu');

// Pega os links do menu
const linkHome = document.getElementById('link-home');
const linkElenco = document.getElementById('link-elenco');

// Pega as telas de conteúdo
const telaHome = document.getElementById('tela-home');
const telaElenco = document.getElementById('tela-elenco');

// Pega os botões de seleção de time
const btnTimeB = document.getElementById('btn-time-b');
const btnTimeC = document.getElementById('btn-time-c');

// Pega as seções de cada time
const secaoTimeB = document.getElementById('elenco-time-b');
const secaoTimeC = document.getElementById('elenco-time-c');

// 2. Criamos a função que alterna o estado do menu
// Ela adiciona a classe se não existir, e remove se já existir
function toggleMenu() {
    menuLateral.classList.toggle('ativo');
    overlay.classList.toggle('ativo');
}

// 3. Atribuímos a função aos eventos de clique
// Abrir ao clicar no ícone ☰
btnAbrir.addEventListener('click', toggleMenu);

// Fechar ao clicar no X
btnFechar.addEventListener('click', toggleMenu);

// Fechar ao clicar no overlay (fundo escuro fora do menu)
overlay.addEventListener('click', toggleMenu);

// 4. Bônus: Fechar ao apertar a tecla "Esc"
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuLateral.classList.contains('ativo')) {
        toggleMenu();
    }
});

// 5. Gerenciar a navegação entre telas
function mudarTela (telaAtiva, telaInativa, linkAtivo, linkInativo) {
    // Esconde a tela inativa e mostra a ativa
    telaInativa.classList.add('oculto');
    telaAtiva.classList.remove('oculto');

    // Atualiza o estado dos links
    linkInativo.classList.remove('ativo');
    linkAtivo.classList.add('ativo');
}

// Evento para o link "Página Inicial"
linkHome.addEventListener('click', (event) => {
    event.preventDefault(); // Evita o comportamento padrão do link
    mudarTela(telaHome, telaElenco, linkHome, linkElenco);
});

// Evento para o link "Nosso Elenco"
linkElenco.addEventListener('click', (event) => {
    event.preventDefault(); // Evita o comportamento padrão do link
    mudarTela(telaElenco, telaHome, linkElenco, linkHome);
});

// 6. Gerenciar a navegação entre os times na seção "Nosso Elenco"
btnTimeB.addEventListener('click', function() {
    mudarTela(secaoTimeB, secaoTimeC, btnTimeB, btnTimeC);
});

btnTimeC.addEventListener('click', function() {
    mudarTela(secaoTimeC, secaoTimeB, btnTimeC, btnTimeB);
});