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

    // URL do arquivo JSON que contém os dados dos campeões
    const url = 'https://ddragon.leagueoflegends.com/cdn/14.10.1/data/en_US/champion.json';

    // Usando fetch para buscar o arquivo JSON
    fetch(url)
        .then(response => {
            // Verifica se a resposta está OK (status 200-299)
            if (!response.ok) {
                // Se a resposta não estiver OK, lança um erro
                throw new Error('Erro na rede: ' + response.statusText);
            }
            // Converte a resposta para JSON
            return response.json();
        })
        .then(data => {
            // Cria um objeto vazio para armazenar os IDs dos campeões
            const allIds = {};
            const champions = document.getElementById('list-champions');

            // Itera sobre cada herói no objeto data
            Object.keys(data.data).forEach(hero => {
                // Armazena o ID do campeão no objeto allIds
                allIds[hero] = data.data[hero].id;
            });

            Object.keys(allIds).forEach((item) => {
                console.log("itens: " + item);
                champions.innerHTML = `<p>${item}</p>`;
            });

            // Loga o objeto contendo todos os IDs dos campeões no console
            console.log(allIds);
        })
        .catch(error => {
            // Lida com erros de rede ou de conversão para JSON
            console.error('Houve um problema com a solicitação fetch:', error);
        });
});
