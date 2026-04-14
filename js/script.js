// 1. Mapeamento dos elementos do DOM
const btnMenu = document.getElementById('btn-menu');
const btnFechar = document.getElementById('btn-fechar');
const menuLateral = document.getElementById('menu-lateral');

// 2. Evento para ABRIR o menu
btnMenu.addEventListener('click', () => {
    menuLateral.classList.add('ativo');
});

// 3. Evento para FECHAR o menu (clicando no X)
btnFechar.addEventListener('click', () => {
    menuLateral.classList.remove('ativo');
});

// 4. Melhoria de UX: Fechar o menu ao clicar fora dele
document.addEventListener('click', (event) => {
    const isMenuAberto = menuLateral.classList.contains('ativo');
    const cliqueForaDoMenu = !menuLateral.contains(event.target);
    const cliqueForaDoBotao = !btnMenu.contains(event.target);

    // Se o menu estiver aberto e o clique não for nele nem no botão que o abre
    if (isMenuAberto && cliqueForaDoMenu && cliqueForaDoBotao) {
        menuLateral.classList.remove('ativo');
    }
});