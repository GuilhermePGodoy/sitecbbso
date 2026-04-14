// 1. Selecionamos todos os elementos necessários
const btnAbrir = document.getElementById('btn-menu');
const btnFechar = document.getElementById('btn-fechar');
const menuLateral = document.getElementById('menu-lateral');
const overlay = document.getElementById('overlay-menu');

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