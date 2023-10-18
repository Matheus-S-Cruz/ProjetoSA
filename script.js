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


let listaMateria = [];
let listaAtividade = [];

function ver() {
    console.log(listaMateria);
    console.log(listaAtividade);
}

function adc(){
    let materia = document.getElementById("materia").value;
    let atividade = document.getElementById("atividade").value;
    var materiaMaiusc = materia.toUpperCase();
    var atividadeMaiusc = atividade.toUpperCase();
    if(listaMateria.includes(materiaMaiusc) == true){
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'A pessoa '+materia+' não foi encontrada na lista!'
          })
    }else{
    listaMateria.push(materiaMaiusc);
    listaAtividade.push(atividadeMaiusc);
    console.log(listaMateria);
    console.log(listaAtividade);
    Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'A pessoa '+materia+ ' foi adicionada!',
      })}
}

function rmv(){
    let materia = document.getElementById("materia").value;
    var materiaMaiusc = materia.toUpperCase();
    let pos = listaMateria.indexOf(materiaMaiusc);
    if(pos == -1){
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'A pessoa '+materia+' não foi encontrada na lista!'
          })
    }
    else{
        listaMateria.splice(pos, 1);
        listaAtividade.splice(pos, 1);
        Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'A pessoa '+materia+ ' foi removida!',
            
          })
          console.log(listaMateria);
          console.log(listaAtividade);
    }
    
}

let usuario = JSON.parse(localStorage.getItem("logado"));
document.getElementById("titulo").innerHTML = "Bem vindo, "+usuario.login+"!";