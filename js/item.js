// Executa este bloco de código quando o DOM está completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    // URL do arquivo JSON que contém os dados dos campeões
    const url = 'https://ddragon.leagueoflegends.com/cdn/14.10.1/data/en_US/item.json';

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
            const allItens = {};

            // Itera sobre cada herói no objeto data
            Object.keys(data.data).forEach(item => {
                // Armazena o ID do campeão no objeto allIds
                allItens[item] = data.data[item]
            });
            // Loga o objeto contendo todos os IDs dos campeões no console
            console.log(allItens["1001"]);

            // Função para ler um objeto do localStorage
            function readChampion() {
                const imageChampion = document.getElementById("champion-select");
                const storedChampion = localStorage.getItem('selectedChampion');
                const nameChampion = document.getElementById('champion-name')

                if (storedChampion) {
                    const championObject = JSON.parse(storedChampion);
                    const urlChampion = championObject.id

                    imageChampion.style.backgroundImage = `url(https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${urlChampion}_0.jpg)`
                    nameChampion.innerHTML = `
                    <h1>${urlChampion}</h1>
                    `
                    
                    console.log(championObject.stats)
                };
            };

            readChampion()

        })
        .catch(error => {
            // Lida com erros de rede ou de conversão para JSON
            console.error('Houve um problema com a solicitação fetch:', error);
        });
});
