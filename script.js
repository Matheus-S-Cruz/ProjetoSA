let atividades = [];

document.addEventListener("DOMContentLoaded", function () {
    carrega();
    let btnAddAtividade = document.getElementById("btnAddAtividade");
    let modalNovaAtividade = document.getElementById("modalNovaAtividade");
    let spanNovaAtidade = modalNovaAtividade.querySelector(".close");

    btnAddAtividade.onclick = function () {
        modalNovaAtividade.style.display = "block";
    };

    spanNovaAtidade.onclick = function () {
        modalNovaAtividade.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modalNovaAtividade) {
            modalNovaAtividade.style.display = "none";
        }
    };

    let botoes = document.querySelectorAll('.btn-info');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = function () {
            modal(this);
        };
    }
});

function identifica(materia) {
    for (let atividade of atividades) {
        if (atividade.materia === materia.id) {
            return atividade;
        }
    }
    return null;
}

// Função para exibir modal de informações do aluno
function modal(button) {
    let atividade = identifica(button);

    let modal = document.getElementById("myModal");

    if (!modal) {
        console.error("Elemento 'myModal' não encontrado no DOM");
        return;
    }

    let span = modal.querySelector(".close");
    if (!span) {
        console.error("Elemento 'close' não encontrado no DOM");
        return;
    }

    let materiaModal = modal.querySelector("#materiaModal");
    let nomeModal = modal.querySelector("#nomeModal");atividade
    let btnExcluirAtividade = modal.querySelector("#btnExcluirAtividade");

    if (!materiaModal || !nomeModal || !btnExcluirAtividade) {
        console.error("Elementos não encontrados no DOM");
        return;
    }

    materiaModal.innerHTML = atividade.materia;
    nomeModal.innerHTML = atividade.nome;

    btnExcluirAtividade.onclick = function () {
        excluirAtividade(atividade.nome);
        modal.style.display = "none";
    };

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    modal.style.display = "block";
}

function excluirAtividade(nome) {
    atividades = atividades.filter(atividade => atividade.nome !== nome);
    localStorage.setItem("atividades", JSON.stringify(atividades));
    carrega();
}

function carrega() {
    let tabela = document.getElementById("carros");
    atividades = JSON.parse(localStorage.getItem("atividades")) || [];

    tabela.innerHTML = "";

    for (let atividade of atividades) {
        let botaoid = `<td><button id='${atividade.materia}' class='btn-info'>Mais info</button></td>`;
        let linha = `<tr>
            <td>${atividade.materia}</td>
            <td>${atividade.nome}</td>
            ${botaoid}</tr>`;
        tabela.innerHTML += linha;
    }

    let botoes = document.querySelectorAll('.btn-info');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = function () {
            modal(this);
        };
    }
}

function adicionarAtividade() {
    let materia = document.getElementById("materia").value;
    let nome = document.getElementById("nome").value;

    if (atividadeExistente(nome)) {
        alert("Atividade já cadastrada. Insira uma atividade única.");
        return;
    }

    let novaAtividade = {
        materia: materia,
        nome: nome,
    };

    atividades = JSON.parse(localStorage.getItem("atividades")) || [];
    atividades.push(novaAtividade);

    localStorage.setItem("atividades", JSON.stringify(atividades));

    carrega();

    modalNovaAtividade.style.display = "none";
}

// Função para verificar se o aluno já existe
function atividadeExistente(nome) {
    return atividades.some(atividade => atividade.nome === nome);
}













let usuario = JSON.parse(localStorage.getItem("logado"));
if (usuario) {
    let atividades = JSON.parse(localStorage.getItem("atividadesUsuario"));
    if (atividades) {
        atividadesUsuario = atividades;
    }
}

const campoLogin = document.getElementById("login")
const campoSenha = document.getElementById("password")
const campoNovoLogin = document.getElementById("novoLogin")
const campoNovaSenha = document.getElementById("novaSenha")
const campoRepSenha = document.getElementById("repSenha")


function cadastra(){
    if (campoNovaSenha.value == campoRepSenha.value){
        const usuario = {
            login : campoNovoLogin.value,
            senha : campoNovaSenha.value
        }
        let bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"));
        if (bancoDeDados == null) {
            bancoDeDados = [];
        }
        bancoDeDados.push(usuario);
        localStorage.setItem("bancoDeDados", JSON.stringify(bancoDeDados));
        alert("Usuário Cadastrado com sucesso!");
    }
    else{
        alert("Você digitou duas senha diferentes!");
    }
}

function login(){  
    let login = campoLogin.value;
    let senha = campoSenha.value; 
    let mensagem = "Usuário ou senha incorreta!";
    let bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"));
    if (bancoDeDados == null) {
        mensagem = "Nenhum usuário cadastrado até o momento";
    } else {
        for (let usuario of bancoDeDados) {
            if (usuario.login == login && usuario.senha == senha) {        
                mensagem = "Usuário logado com sucesso!";
                localStorage.setItem("logado", JSON.stringify(usuario));
                window.location.href = "./home.html ";
                break;
            }  
        }
        alert(mensagem);
}   
}

document.getElementById("titulo").innerHTML = "Bem vindo, "+usuario.login+"!";