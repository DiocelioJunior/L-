// Executa este bloco de código quando o DOM está completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar event listeners aos botões para redirecionar ao clicar
    document.getElementById('add-btn-build').addEventListener('click', function () {
        // Redireciona para 'champion.html' quando o botão "Build" é clicado
        window.location.href = './champion.html';
    });

    document.getElementById('add-btn-matchup').addEventListener('click', function () {
        // Redireciona para 'matchup.html' quando o botão "Matchup" é clicado
        window.location.href = './matchup.html';
    });
});
