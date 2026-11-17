let senhaSecreta;
let tentativas = 0;
let jogoAtivo = true;

const numero = document.getElementById("numero");
const mensagem = document.getElementById("mensagem");
const contador = document.getElementById("tentativas");

const imagemFechado = document.getElementById("imagemCofre");
const imagemAberto = document.getElementById("imagemCofreAberto");

const overview = document.getElementById("overview");
const resultado = document.getElementById("resultado");

function iniciarJogo() {

    // Escolhe uma nova senha aleatória
    senhaSecreta = Math.floor(Math.random() * 50) + 1;

    tentativas = 0;
    jogoAtivo = true;

    numero.value = "";
    numero.disabled = false;

    mensagem.textContent = "Aguardando tentativa...";
    mensagem.classList.remove("alerta");

    contador.textContent = "Tentativas: 0/7";

    // Mostra o cofre fechado
    imagemFechado.style.display = "block";
    imagemAberto.style.display = "none";

    overview.style.display = "none";

    document.getElementById("tentar").disabled = false;
}

function tentarAbrir() {

    if (!jogoAtivo) return;

    const palpite = Number(numero.value);

    // Verifica se o número é válido
    if (
        numero.value === "" ||
        !Number.isInteger(palpite) ||
        palpite < 1 ||
        palpite > 50
    ) {
        mensagem.textContent = "Digite um número inteiro entre 1 e 50!";
        return;
    }

    tentativas++;

    let restantes = 7 - tentativas;

    contador.textContent = `Tentativas: ${tentativas}/7`;

    // Se acertar a senha
    if (palpite === senhaSecreta) {

        jogoAtivo = false;

        mensagem.textContent = "Cofre desbloqueado!";

        // Esconde o cofre fechado
        imagemFechado.style.display = "none";

        // Mostra o cofre aberto
        imagemAberto.style.display = "block";

        resultado.textContent =
            `Você descobriu a senha em ${tentativas} tentativa(s)!`;

        numero.disabled = true;
        document.getElementById("tentar").disabled = true;

        setTimeout(function() {
            overview.style.display = "flex";
        }, 3000);

        return;
    }

    // Dá dicas ao jogador
    if (palpite < senhaSecreta) {

        mensagem.textContent = "A senha é maior!";

    } else {

        mensagem.textContent = "A senha é menor!";

    }

    // Alerta quando restarem 2 tentativas
    if (restantes === 2) {

        mensagem.textContent += " ⚠️ Restam apenas 2 tentativas!";

        mensagem.classList.add("alerta");

    }

    // Acabaram as tentativas
    if (restantes === 0) {

        mensagem.textContent =
            `Fim de jogo! A senha era ${senhaSecreta}.`;

        jogoAtivo = false;

        numero.disabled = true;
        document.getElementById("tentar").disabled = true;

    }

    numero.value = "";
    numero.focus();
}

// Botão de tentar
document.getElementById("tentar")
    .addEventListener("click", tentarAbrir);

// Tecla Enter
numero.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        tentarAbrir();
    }

});

// Botão reiniciar
document.getElementById("reiniciar")
    .addEventListener("click", iniciarJogo);

// Jogar novamente
document.getElementById("jogarNovamente")
    .addEventListener("click", iniciarJogo);

// Começa o jogo
iniciarJogo();