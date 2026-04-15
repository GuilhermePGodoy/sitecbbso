//  Selecionamos todos os elementos necessários
const btnAbrir = document.getElementById('btn-menu');
const btnFechar = document.getElementById('btn-fechar');
const menuLateral = document.getElementById('menu-lateral');
const overlay = document.getElementById('overlay-menu'); // Fundo escuro que aparece atrás do menu

function toggleMenu() {
    menuLateral.classList.toggle('ativo');
    overlay.classList.toggle('ativo');
}

//  Atribuímos a função aos eventos de clique
// Abrir ao clicar no ícone ☰
btnAbrir.addEventListener('click', toggleMenu);

// Fechar ao clicar no X
btnFechar.addEventListener('click', toggleMenu);

// Fechar ao clicar no overlay (fundo escuro fora do menu)
overlay.addEventListener('click', toggleMenu);

// Fechar ao apertar a tecla "Esc"
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuLateral.classList.contains('ativo')) {
        toggleMenu();
    }
});


// Mapeamento: id do link → id da tela correspondente
const navegacao = [
    { linkId: 'link-home', telaId: 'tela-home' },
    { linkId: 'link-elenco', telaId: 'tela-elenco' },
    { linkId: 'link-lista', telaId: 'tela-lista' },
    { linkId: 'link-inscricao', telaId: 'tela-inscricao' },
];

// Coleta todos os links e telas para operar genericamente
const todosLinks = navegacao.map(n => document.getElementById(n.linkId));
const todasTelas = navegacao.map(n => document.getElementById(n.telaId));

/**
 * Muda para a tela correspondente ao índice fornecido.
 * Esconde todas as telas, mostra só a selecionada.
 * Remove .ativo de todos os links, marca só o selecionado.
 */
function mudarTela(indice) {
    // Esconde todas as telas e desmarca todos os links
    todasTelas.forEach(tela => tela.classList.add('oculto'));
    todosLinks.forEach(link => link.classList.remove('ativo'));

    // Mostra a tela alvo e marca o link ativo
    todasTelas[indice].classList.remove('oculto');
    todosLinks[indice].classList.add('ativo');
}

// Registra o evento de clique em cada link do menu
todosLinks.forEach((link, indice) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        mudarTela(indice);
        // Fecha o menu lateral após a navegação
        if (menuLateral.classList.contains('ativo')) {
            toggleMenu();
        }
    });
});

// Clicar no logo do header volta para a página inicial
const linkBanner = document.getElementById('link-banner');
linkBanner.addEventListener('click', (event) => {
    event.preventDefault();
    mudarTela(0);
});


// Alternância entre Time B e Time C no Elenco
const times = [
    { btnId: 'btn-time-b', secaoId: 'elenco-time-b' },
    { btnId: 'btn-time-c', secaoId: 'elenco-time-c' },
];

const todosBtnsTime = times.map(t => document.getElementById(t.btnId));
const todasSecoes = times.map(t => document.getElementById(t.secaoId));

function alternarTime(indice) {
    todasSecoes.forEach(secao => secao.classList.add('oculto'));
    todosBtnsTime.forEach(btn => btn.classList.remove('ativo'));

    todasSecoes[indice].classList.remove('oculto');
    todosBtnsTime[indice].classList.add('ativo');
}

todosBtnsTime.forEach((btn, indice) => {
    btn.addEventListener('click', () => alternarTime(indice));
});


// Formulário de inscrição
const formInscricao = document.getElementById('form-inscricao');
if (formInscricao) {
    formInscricao.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Inscrição enviada com sucesso! (Nota: sem back-end, os dados não são salvos ainda.)');
        formInscricao.reset();
    });
}