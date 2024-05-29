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
                const nameChampion = document.getElementById('champion-name');
                const statsChampion = document.getElementById("stats-1");
                const statsChampion2 = document.getElementById("stats-2");
                const levelChampion = document.getElementById("levelSelect")

                if (storedChampion) {
                    const championObject = JSON.parse(storedChampion);
                    const urlChampion = championObject.id;
                    var levelSelectValue = 1;
                
                    levelChampion.addEventListener('change', selectLevel);

                    imageChampion.style.backgroundImage = `url(https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${urlChampion}_0.jpg)`
                
                    function selectLevel() {
                        levelSelectValue = levelChampion.value
                        updateStats();
                    }
                
                    function updateStats() {
                        const hpValue = championObject.stats.hp + (championObject.stats.hpperlevel * (levelSelectValue - 1)); // Ajusta o cálculo de acordo com o nível
                        const hpRegenValue = championObject.stats.hpregen + (championObject.stats.hpregenperlevel * (levelSelectValue - 1));
                        const mpValue = championObject.stats.mp + (championObject.stats.mpperlevel * (levelSelectValue - 1));
                        const mpRegenValue = championObject.stats.mpregen + (championObject.stats.mpregenperlevel * (levelSelectValue - 1));
                        const armorValue = championObject.stats.armor + (championObject.stats.armorperlevel * (levelSelectValue - 1));
                        const attackDamageValue = championObject.stats.attackdamage + (championObject.stats.attackdamageperlevel * (levelSelectValue - 1));
                        const spellBlockValue = championObject.stats.spellblock + (championObject.stats.spellblockperlevel * (levelSelectValue - 1));
                        const critValue = championObject.stats.crit + (championObject.stats.critperlevel * (levelSelectValue - 1));
                        const moveSpeedValue = championObject.stats.movespeed;
                        const attackRangeValue = championObject.stats.attackrange;
                
                        statsChampion.innerHTML = `
                            <div class="stats-value">
                                <div class="stats-icon">
                                    <img src="">
                                </div>
                                <div class="value">
                                    <p>Health</p>
                                    <h1>${hpValue}</h1>
                                </div>
                            </div>
                            <div class="stats-value hp-regen">
                                <div class="stats-icon">
                                    <img src="">
                                </div>
                                <div class="value">
                                    <p>Health Regen.</p>
                                    <h1>${hpRegenValue}</h1>
                                </div>
                            </div>
                            <div class="stats-value mp">
                                <div class="stats-icon">
                                    <img src="">
                                </div>
                                <div class="value">
                                    <p>Mana</p>
                                    <h1>${mpValue}</h1>
                                </div>
                            </div>
                            <div class="stats-value mp-regen">
                                <div class="stats-icon">
                                    <img src="">
                                </div>
                                <div class="value">
                                    <p>Mana Regen.</p>
                                    <h1>${mpRegenValue}</h1>
                                </div>
                            </div>
                            <div class="stats-value armor">
                                <div class="stats-icon">
                                    <img src="">
                                </div>
                                <div class="value">
                                    <p>Armor</p>
                                    <h1>${armorValue}</h1>
                                </div>
                            </div>
                        `;
                
                        statsChampion2.innerHTML = `
                            <div class="stats-value attack-damage">
                                <div class="stats-icon">
                                    <img src="">
                                </div>
                                <div class="value">
                                    <p>Attack Damage</p>
                                    <h1>${attackDamageValue}</h1>
                                </div>
                            </div>
                            <div class="stats-value spell-block">
                                <div class="stats-icon">
                                    <img src="">
                                </div>
                                <div class="value">
                                    <p>Magic Resist.</p>
                                    <h1>${spellBlockValue}</h1>
                                </div>
                            </div>
                            <div class="stats-value crit">
                                <div class="stats-icon">
                                    <img src="">
                                </div>
                                <div class="value">
                                    <p>Crit. Damage</p>
                                    <h1>${critValue}</h1>
                                </div>
                            </div>
                            <div class="stats-value move-speed">
                                <div class="stats-icon">
                                    <img src="">
                                </div>
                                <div class="value">
                                    <p>Move Speed</p>
                                    <h1>${moveSpeedValue}</h1>
                                </div>
                            </div>
                            <div class="stats-value attack-range">
                                <div class="stats-icon">
                                    <img src="">
                                </div>
                                <div class="value">
                                    <p>Attack Range</p>
                                    <h1>${attackRangeValue}</h1>
                                </div>
                            </div>
                        `;
                    }
                
                    // Inicializa as estatísticas no carregamento da página
                    updateStats();
                }
                
            };

            readChampion()

        })
        .catch(error => {
            // Lida com erros de rede ou de conversão para JSON
            console.error('Houve um problema com a solicitação fetch:', error);
        });
});
