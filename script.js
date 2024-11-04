/** Array */

// Define os valores iniciais dos itens
// Define os valores iniciais dos itens
let portion = localStorage.getItem("portion") ? parseInt(localStorage.getItem("portion")) : 5;
let gold = localStorage.getItem("gold") ? parseInt(localStorage.getItem("gold")) : 500;
localStorage.setItem("gold", gold);
let intesive = localStorage.getItem("intesive") ? parseInt(localStorage.getItem("intesive")) : 1;
let crystals = localStorage.getItem("crystals") ? parseInt(localStorage.getItem("crystals")) : 0;
localStorage.setItem("gold", gold);
localStorage.setItem("crystals", crystals);

// Variáveis para guardar os ganhos durante a sessão
let sessionCrystals = 0;
let sessionGold = 0;

// Adicione este código ao seu script

// Adicione este código ao seu script após a definição de variáveis e antes da classe Word

// Lidar com o botão "buy"
// Seleciona o elemento loserNav
const loserNav = document.querySelector(".loserPortions");
const closeFooter = document.querySelector("footer");

// Adiciona o evento de clique ao botão "buy"
document.querySelector(".buy").addEventListener("click", function() {
    // Verifica se o usuário tem gold suficiente
    if (gold >= 300) {
        // Reduz o gold em 300
        gold -= 300;
        // Recarrega as porções para 5
        portion = 5;
        
        // Oculta o loserNav
        loserNav.style.display = "none";
        closeFooter.style.borderRadius = "0";
        closeFooter.style.border = "none"
        
        // Atualiza o localStorage com os novos valores
        localStorage.setItem("gold", gold);
        localStorage.setItem("portion", portion);
        
        // Atualiza a exibição dos valores no DOM
        document.querySelector("#portion h3").innerHTML = portion; // Atualiza as porções
        document.querySelector("#gold h3").innerHTML = gold; // Atualiza o gold exibido
    } else {
        alert("Você não tem gold suficiente para recarregar as porções!"); // Mensagem de aviso
    }
});



const categorias = [
    {
        categoria: "Pronomes",
        palavras: [
            { palavra: "Eu", traducao: "I" },
            { palavra: "Você", traducao: "You" },
            { palavra: "Ele", traducao: "He" },
            { palavra: "Ela", traducao: "She" },
            { palavra: "Nós", traducao: "We" },
            { palavra: "Vocês", traducao: "You (plural)" },
            { palavra: "Eles", traducao: "They" },
            { palavra: "Este", traducao: "This" },
            { palavra: "Aquele", traducao: "That" },
            { palavra: "Algum", traducao: "Some" }
        ]
    },
    {
        categoria: "Verbos",
        palavras: [
            { palavra: "Comer", traducao: "Eat" },
            { palavra: "Beber", traducao: "Drink" },
            { palavra: "Ir", traducao: "Go" },
            { palavra: "Falar", traducao: "Speak" },
            { palavra: "Ver", traducao: "See" },
            { palavra: "Ouvir", traducao: "Hear" },
            { palavra: "Dormir", traducao: "Sleep" },
            { palavra: "Ler", traducao: "Read" },
            { palavra: "Escrever", traducao: "Write" },
            { palavra: "Andar", traducao: "Walk" }
        ]
    },
    {
        categoria: "Alimentos",
        palavras: [
            { palavra: "Maçã", traducao: "Apple" },
            { palavra: "Banana", traducao: "Banana" },
            { palavra: "Pão", traducao: "Bread" },
            { palavra: "Queijo", traducao: "Cheese" },
            { palavra: "Leite", traducao: "Milk" },
            { palavra: "Ovo", traducao: "Egg" },
            { palavra: "Arroz", traducao: "Rice" },
            { palavra: "Feijão", traducao: "Beans" },
            { palavra: "Carne", traducao: "Meat" },
            { palavra: "Peixe", traducao: "Fish" }
        ]
    }
];

/** selecionar a palavra do array */

class Word {
    constructor(categorias) {
        this.categorias = categorias;
        this.palavraAtual = null;
        this.opcoes = [];
    }

    selecionarPalavra() {
        // Seleciona uma categoria aleatória
        const categoria = this.categorias[Math.floor(Math.random() * this.categorias.length)];
        // Seleciona uma palavra aleatória da categoria
        this.palavraAtual = categoria.palavras[Math.floor(Math.random() * categoria.palavras.length)];
        
        // Prepara as opções
        this.prepararOpcoes();
    }

    prepararOpcoes() {
        this.opcoes = [];
        this.opcoes.push(this.palavraAtual.traducao);
        
        while (this.opcoes.length < 4) {
            const categoria = this.categorias[0];
            const palavraErrada = categoria.palavras[Math.floor(Math.random() * categoria.palavras.length)].traducao;

            // Evita duplicatas
            if (!this.opcoes.includes(palavraErrada)) {
                this.opcoes.push(palavraErrada);
            }
        }

        // Embaralha as opções
        this.opcoes = this.embaralhar(this.opcoes); // Chama a função de embaralhamento
    }

    embaralhar(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Troca elementos
        }
        return array;
    }

    exibir() {
        // Seleciona elementos do DOM
        document.querySelector(".word").textContent = this.palavraAtual.palavra;
        const buttons = document.querySelectorAll(".option");

        // Atribui as traduções aos botões
        buttons.forEach((button, index) => {
            button.textContent = this.opcoes[index];
            button.onclick = () => this.verificarResposta(this.opcoes[index]);
        });
        
        // Exibe o valor atual de porções
        document.querySelector("#portion h3").innerHTML = portion; // Atualiza o DOM

        // Esconde as mensagens de feedback ao exibir nova palavra
        this.esconderMensagens();
    }

    verificarResposta(resposta) {
        const respostaCorreta = this.palavraAtual.traducao;
        const correctNav = document.querySelector(".correct");
        const errorNav = document.querySelector(".error");
        const footer = document.getElementById("footer-quiz");
        const progressBar = document.getElementById("progress-bar");
    
        // Obtenha o valor atual da barra de progresso
        let progressoAtual = parseInt(progressBar.style.width) || 0;
    
        if (resposta === respostaCorreta) {
            // Atualiza a barra de progresso
            progressoAtual += 20;
            if (progressoAtual > 100) progressoAtual = 100;
            progressBar.style.width = progressoAtual + "%";
    
            // Atualiza recompensas de acerto
            sessionCrystals += 3;
            sessionGold += 5;
            crystals += 3;
            gold += 5;
    
            // Salva os valores atualizados no localStorage
            localStorage.setItem("gold", gold);
            localStorage.setItem("crystals", crystals);
    
            // Verifica se a barra de progresso chegou a 100%
            if (progressoAtual === 100) {
                // Exibe a div de recompensas e oculta o correctNav
                const recompensasContent = document.querySelector(".recopenses-content");
                const crystalsDisplay = document.querySelector(".crystails h2");
                const goldDisplay = document.querySelector(".gold h2");
    
                // Define o texto de recompensas
                crystalsDisplay.textContent = `+${sessionCrystals}`;
                goldDisplay.textContent = `+${sessionGold}`;
    
                recompensasContent.style.display = "flex"; // Exibe a div de recompensas
                correctNav.style.display = "none"; // Oculta a mensagem de acerto
                footer.style.backgroundColor = "#ffffff"; // Define a cor do footer ao concluir
            } else {
                // Exibe a mensagem de acerto normalmente
                correctNav.style.display = "block";
                footer.style.backgroundColor = "#b19cd9"; // Cor de fundo para acertos normais
            }
    
            // Esconde a mensagem de erro
            errorNav.style.display = "none";
            footer.style.color = "#ffffff";
    
        } else {
            // Exibe mensagem de erro e reduz portion se necessário
            correctNav.style.display = "none";
            errorNav.style.display = "block";
            errorNav.querySelector('h5').textContent = `A resposta correta é: ${respostaCorreta}`;
            footer.style.backgroundColor = "#d3494973"; // Cor de fundo para erros
            footer.style.color = "#000000";
    
            if (portion > 0) {
                portion--;
                localStorage.setItem("portion", portion);
                document.querySelector("#portion h3").innerHTML = portion;
                if (portion === 0) {
                    const loserNav = document.querySelector(".loserPortions");
                    loserNav.style.display = "contents";
                    footer.style.borderTop = "2px solid #afafaf";
                    footer.style.borderRadius = "30px 30px 0 0";
                    errorNav.style.display = "none";
                    footer.style.backgroundColor = "#fff";
                }
            }
        }
    }
    
    


    
    
    esconderMensagens() {
        const correctNav = document.querySelector(".correct");
        const errorNav = document.querySelector(".error");
        correctNav.style.display = "none"; // Esconde a mensagem de acerto
        errorNav.style.display = "none"; // Esconde a mensagem de erro
    }

    proximaPergunta() {
        this.selecionarPalavra();
        this.exibir();
    }
}

/** Comprar portions */



// Usando a classe Word
document.addEventListener("DOMContentLoaded", function () {
    const wordGame = new Word(categorias);
    wordGame.selecionarPalavra();
    wordGame.exibir();

    // Lida com o botão "Próxima"
    const nextButtons = document.querySelectorAll(".next");
    nextButtons.forEach(button => {
        button.onclick = () => {
            const footer = document.getElementById("footer-quiz");
            footer.style.backgroundColor = "#fff"; // Reseta o fundo do footer para branco
            wordGame.proximaPergunta();
        };
    });
});


/* ----- Leave Quiz -----*/

document.getElementById("leave").addEventListener("click", function() {
    window.location.href = "index.html";
});
