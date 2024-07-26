//objeto de placar
const vida = {
    VidaMaquina: 3,
    VidaUsuario: 3,
};

// Variavel para alocar repsota do usuario
let RespostaUser;

//variaveis para vitoria da partida
let nomeUsuario = localStorage.getItem('nome');
let Tesoura = "Tesoura";
let Papel = "Papel";
let Pedra = "Pedra";
let vencedorMaquina = "Maquina Venceu";
let vencedorUsuario = `${nomeUsuario} Venceu`;
document.getElementById("hidden-end").classList.add("oculto");
document.getElementById("Nomeplacar").innerHTML = nomeUsuario;

//botoes na tela
let botao1 = document.getElementById("button1");
let botao2 = document.getElementById("button2");
let botao3 = document.getElementById("button3");
let botao4 = document.getElementById("mudar-nome");
let botaoRecarregar2 = document.getElementById("button-reload2");

//função a botôes
botao1.addEventListener("click", botaoClicado);
botao2.addEventListener("click", botaoClicado);
botao3.addEventListener("click", botaoClicado);
botao4.addEventListener("click", MudarNome);
botaoRecarregar2.addEventListener("click", function () {
    location.reload();
}, 3000);

//Perguntar o nome do usuario e armazenar
if (!nomeUsuario) {
    nomeUsuario = window.prompt("Qual é o seu nome?");
    localStorage.setItem('nome', nomeUsuario);
}


//função para iniciar e definir escolha do usuario
function botaoClicado(event) {
    RespostaUser = event.target.textContent; 
    console.log("Resposta do usuário: " + RespostaUser);
    vencedor(RespostaUser); 
    atualizarImagens(RespostaUser);
}


// função de escolha randomica 
function randomWord() {
    const palavras = ["Pedra", "Papel", "Tesoura"];
    const randomIndex = Math.floor(Math.random() * palavras.length);
    return palavras[randomIndex];
}

//função de mudar nome
function MudarNome(event) {
    let novoNome = window.prompt("Qual é o seu novo nome?");
    if (novoNome !== null) {
        nomeUsuario = novoNome;
        localStorage.setItem('nome', novoNome);
        document.getElementById('Nomeplacar').innerHTML = nomeUsuario;
        vencedorUsuario = `${nomeUsuario} Venceu`;
        vencedor(RespostaUser);
    }
}

//função para diminuir a vida no placar do perdedor
function diminuirVida(usuario) {
    if (usuario === "usuario") {
        vida.VidaUsuario--;
        document.getElementById("user-score").innerHTML = vida.VidaUsuario;
    } else if (usuario === "maquina") {
        vida.VidaMaquina--;
        document.getElementById("machine-score").innerHTML = vida.VidaMaquina;
    }
}

// para imprimir no console o placar
function exibirPlacar() {
    console.log(`Vida da Máquina: ${vida.VidaMaquina}`);
    console.log(`Vida do Usuário: ${vida.VidaUsuario}`);
}

//Função de definir o vencedor
function vencedor(Respostausuario) {
    let palavraAleatoria = randomWord();

    //Condição caso o usuario não tenha escolhido seu nick name
    if (RespostaUser == null) {
        console.log("esperando Escolha do(a) " + nomeUsuario);
        document.getElementById("result-text").innerHTML = `Esperando sua Opção de jogada, ${nomeUsuario}`;
        let SemResultadoUsuario = document.getElementById("imagens-result1");
        let SemResultadoMaquina = document.getElementById("imagens-result2");
        SemResultadoUsuario.src = "./Imagens/interrogas.png"
        SemResultadoMaquina.src = "./Imagens/interrogas.png"
    } else {
        //Condição de vitória dos Jogadores
        if (palavraAleatoria === Respostausuario) {
            console.log("Empate");
            document.getElementById("result-text").innerHTML = "Empate";
        } else if (palavraAleatoria === Tesoura && Respostausuario === Papel) {
            console.log(vencedorMaquina);
            document.getElementById("result-text").innerHTML = vencedorMaquina;
            diminuirVida("usuario");
        } else if (palavraAleatoria === Tesoura && Respostausuario === Pedra) {
            console.log(vencedorUsuario);
            document.getElementById("result-text").innerHTML = vencedorUsuario;
            diminuirVida("maquina");
        } else if (palavraAleatoria === Papel && Respostausuario === Tesoura) {
            console.log(vencedorUsuario);
            document.getElementById("result-text").innerHTML = vencedorUsuario;
            diminuirVida("maquina");
        } else if (palavraAleatoria === Papel && Respostausuario === Pedra) {
            console.log(vencedorMaquina);
            document.getElementById("result-text").innerHTML = vencedorMaquina;
            diminuirVida("usuario");
        } else if (palavraAleatoria === Pedra && Respostausuario === Papel) {
            console.log(vencedorUsuario);
            document.getElementById("result-text").innerHTML = vencedorUsuario;
            diminuirVida("maquina");
        } else if (palavraAleatoria === Pedra && Respostausuario === Tesoura) {
            console.log(vencedorMaquina);
            document.getElementById("result-text").innerHTML = vencedorMaquina;
            diminuirVida("usuario");
        }

        atualizarImagens(RespostaUser, palavraAleatoria);
        exibirPlacar();

        //função para mostrar tela final do vencedor ou ganhador
        if (vida.VidaUsuario == 0 || vida.VidaMaquina == 0) {
            document.getElementById("hidden-end").classList.remove("oculto");
            if (vida.VidaUsuario == 0) {
                document.getElementById("h1-end").innerHTML = `${nomeUsuario}, perdeu para a maquina`;
                let amassou = document.getElementById("imagem-final");
                amassou.src = "Imagens/Perdedor-Novo.png"
            } else if (vida.VidaMaquina == 0) {
                document.getElementById("h1-end").innerHTML = ` ${nomeUsuario}, Voce Ganhou`;
                let amassado = document.getElementById("imagem-final");
                amassado.src = "Imagens/Vencedor-Novo.jpg"
            }
        }
    }
}

//função para mostrar as escolhas atraves de imagens 
function atualizarImagens(respostaUsuario, palavraAleatoria) {
    const ImagensResult1 = document.getElementById("imagens-result1");
    const ImagensResult2 = document.getElementById("imagens-result2");

    switch (respostaUsuario) {
        case Pedra:
            ImagensResult1.src = "./Imagens/pedra.jfif";
            break;
        case Tesoura:
            ImagensResult1.src = "./Imagens/tesoura.jfif";
            break;
        case Papel:
            ImagensResult1.src = "Imagens//papel.jfif";
            break;
        default:
            break;
    }

    switch (palavraAleatoria) {
        case Pedra:
            ImagensResult2.src = "Imagens/pedra.jfif";
            break;
        case Tesoura:
            ImagensResult2.src = "Imagens/tesoura.jfif";
            break;
        case Papel:
            ImagensResult2.src = "Imagens/papel.jfif";
            break;
        default:
            break;
    }
}

vencedor(RespostaUser)
