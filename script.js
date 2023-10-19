let atividadesUsuario = {};

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

function adicionarAtividade() {
    let usuario = JSON.parse(localStorage.getItem("logado"));
    if (usuario) {
        let materia = document.getElementById("materia").value;
        let atividade = document.getElementById("atividade").value;

        if (!atividadesUsuario[usuario.login]) {
            atividadesUsuario[usuario.login] = [];
        }

        atividadesUsuario[usuario.login].push({ materia, atividade });
        localStorage.setItem("atividadesUsuario", JSON.stringify(atividadesUsuario));

        console.log(atividadesUsuario);
    } else {
        console.log("Usuário não está logado.");
    }
}

localStorage.setItem("logado", JSON.stringify(usuario));

function exibirAtividades() {
    let usuario = JSON.parse(localStorage.getItem("logado"));
    if (usuario) {
        let atividades = JSON.parse(localStorage.getItem("atividadesUsuario"));
        if (atividades) {
            atividadesUsuario = atividades;
        }
    
        let atividadesDoUsuario = atividadesUsuario[usuario.login] || [];

        let resultadoDiv = document.getElementById("resultadoAtividades");

        // Cria uma string para exibir as atividades
        let atividadesHTML = "<h2>Atividades do Usuário:</h2><ul>";
        atividadesDoUsuario.forEach((atividade, index) => {
            atividadesHTML += `<li>${atividade.materia}: ${atividade.atividade} <button onclick="removerAtividade(${index})">Remover</button></li>`;
        });
        atividadesHTML += "</ul>";

        // Atualiza o conteúdo da div com a lista de atividades
        resultadoDiv.innerHTML = atividadesHTML;
    } else {
        resultadoDiv.innerHTML = "Usuário não está logado.";
    }
}

function removerAtividade(index) {
    let usuario = JSON.parse(localStorage.getItem("logado"));
    if (usuario) {
        if (atividadesUsuario[usuario.login]) {
            if (index >= 0 && index < atividadesUsuario[usuario.login].length) {
                atividadesUsuario[usuario.login].splice(index, 1);
                localStorage.setItem("atividadesUsuario", JSON.stringify(atividadesUsuario));

                console.log("Atividade removida com sucesso.");
            } else {
                console.log("Índice de atividade inválido.");
            }
        } else {
            console.log("Nenhuma atividade encontrada para o usuário.");
        }
    } else {
        console.log("Usuário não está logado.");
    }
}