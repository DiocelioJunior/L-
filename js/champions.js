// Executa este bloco de código quando o DOM está completamente carregado
document.addEventListener('DOMContentLoaded', () => {
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
      // Cria um objeto vazio para armazenar os dados dos campeões
      const allIds = {};
      // Seleciona o elemento HTML onde os campeões serão exibidos
      const champions = document.getElementById('list-champions');

      // Itera sobre cada campeão no objeto data e armazena no objeto allIds
      Object.keys(data.data).forEach(hero => {
        allIds[hero] = data.data[hero];
      });

      // Função para renderizar os campeões na página
      function renderChampions(filteredIds) {
        // Limpa o conteúdo atual do elemento champions
        champions.innerHTML = '';
        // Itera sobre os IDs filtrados dos campeões
        filteredIds.forEach(item => {
          // Obtém o objeto do campeão correspondente
          const champion = allIds[item];
          // Junta as tags do campeão em uma string
          const tags = champion.tags.join(', ');
          // Adiciona um novo div para cada campeão no elemento champions, incluindo as tags
          champions.innerHTML += `
            <div class="champion" data-champion="${item}">
              <div class="champion-info">
                <img src="https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${item}.png" alt="${item}">
              </div>
              <div class="tags">
                <h1>${item}</h1>
                <p>${tags}</p>
              </div>
            </div>`;
        });

        // Seleciona todos os elementos com a classe "champion"
        const listChampions = document.querySelectorAll(".champion");
        // Adiciona um event listener a cada elemento "champion"
        listChampions.forEach(list => {
          list.addEventListener("click", function () {
            // Obtém o nome do campeão a partir do atributo data-champion
            const championName = this.getAttribute('data-champion');
            // Obtém o objeto do campeão correspondente
            const championData = allIds[championName];
            // Armazena os dados do campeão no localStorage
            localStorage.setItem('selectedChampion', JSON.stringify(championData));
            
            window.location.href = './itens.html';
          });
        });
      }

      // Renderiza todos os campeões inicialmente
      renderChampions(Object.keys(allIds));

      // Seleciona o campo de input de pesquisa
      const searchChampions = document.getElementById("search");
      // Adiciona um event listener ao campo de input para o evento 'input'
      searchChampions.addEventListener("input", filterChampions);

      // Função para filtrar e renderizar os campeões com base no valor de pesquisa
      function filterChampions() {
        // Obtém o valor de pesquisa e converte para minúsculas
        const searchValue = searchChampions.value.toLowerCase();
        // Filtra os IDs dos campeões que contêm o valor de pesquisa
        const filteredIds = Object.keys(allIds).filter(championName => 
          championName.toLowerCase().includes(searchValue)
        );
        // Renderiza apenas os campeões filtrados
        renderChampions(filteredIds);
      }

      // Loga o objeto contendo todos os dados dos campeões no console
      console.log(allIds);
    })
    .catch(error => {
      // Lida com erros de rede ou de conversão para JSON
      console.error('Houve um problema com a solicitação fetch:', error);
    });
});
