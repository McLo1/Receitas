const form = document.getElementById("FormReceita");
const Adicionar_Receita = document.getElementById("Adicionar_Receita");

const listaReceitas = document.getElementById("ReceitasAdicionadas");//Pegando a ul onde adicionaremos as receitas
const ReceitaItem = document.createElement("li"); //Criando a li que será inserida na Ul ReceitasAdicionadas 

function Abrirmodal(){
    document.getElementById("meuModal").style.display = "block";
    document.getElementById("Adicionar_Receita").style.display = "none";
}//Função para abrir o Modal e adicionar as informações da Receita

function Fecharmodal(){
    document.getElementById("meuModal").style.display = "none";
    document.getElementById("Adicionar_Receita").style.display = "block";
}//Função para fechar o Modal



//Logica para cadastro da receita - POST
form.addEventListener("submit", function (event) {
     event.preventDefault();

    const Nome_Receita = document.getElementById("Receita_Nome").value;//Transformando o input nome em uma variavel
    const Descrição_Receita = document.getElementById("Desc_Receita").value;//Transformando o input descrição em uma variavel

    const receita = {
        nome: Nome_Receita,
        descricao: Descrição_Receita
    } //Transorma as informações acima em um objeto

    fetch("http://localhost:8080/receitas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(receita) //Transofrma o Objeto receita em um JSOM
    })
    .then(function (respostas){
        return respostas.json();
    })
    .then(function () {
        buscarReceitas(); //Fazendo o GET para atualizar as informações ao deletar uma receita
        form.reset();
    })
    .catch(function(erro){
        console.log("Erro ao salvar receita", erro);
    }) //Retorna um erro caso não salve a receita
    
});


//Logica para buscar as receitas e exibi-las na tela - GET
function buscarReceitas() {
    fetch("http://localhost:8080/receitas")
    .then(function(resposta) {
        return resposta.json();
    })
    .then(function(receita) {

        listaReceitas.innerHTML = "";

        for(let i = 0; i < receita.length; i++){
            mostrarReceitasNaTela(receita[i])
        }
        
    }).catch(function(erro) {
        console.log("Erro ao buscar receita", erro);
    })
}

//Logica para excluir as receitas - DELETE
function ExcluirReceita(id){
    fetch(`http://localhost:8080/receitas/${id}`, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        
    })
    .then(function(resposta) {
        return resposta.json();
    })
    .then(function(data){
        console.log("Receita excluida com sucesso" + data);
        buscarReceitas(); //Fazendo o GET para atualizar as informações ao deletar uma receita
    })
    .catch(function (erro){
        console.log("Erro ao deletar usuario: " + erro);
    })
}


//Função DOM para adicionar a receita na tela ao fazer o GET
function mostrarReceitasNaTela(receita){

    const ReceitaName = document.createElement("strong");
    ReceitaName.textContent = `Nome da Receita: ${receita.nome}`;//Pegando o nome da receita e a recriando como strong

    const ReceitaDesc = document.createElement("p");
    ReceitaDesc.textContent = `Descrição da Receita: ${receita.descricao}`;//Pegando a descrição da receita e a recriando como paragrafo

    const botãoExcluirReceita = document.createElement("button");//Criando o botão para excluir as receitas já salvas
    botãoExcluirReceita.classList.add("botãoExcluirReceita");//Adicionando uma classe ao botão deletar para estilizar no CSS
    botãoExcluirReceita.textContent = "X";



    botãoExcluirReceita.addEventListener("click", () => {
        ExcluirReceita(receita.id);
    });//Adicionando Evento, ao clicar no botão a função "ExcluirReceita" que está na linha '112' será executada


//Adicionando itens a li ReceitaItem
ReceitaItem.appendChild(ReceitaName);
ReceitaItem.appendChild(ReceitaDesc);
ReceitaItem.appendChild(botãoExcluirReceita);
//ReceitaItem.appendChild(botãoFavoritos); ---- Criar logica para favoritar receita

//Adicionando a li ReceitaItem dentro da ul listaReceitas
listaReceitas.appendChild(ReceitaItem);

}


//Esse código recarrega as informações das receitas ao atualizar a página mantendo sempre atualizado
window.addEventListener("DOMContentLoaded", function() {
    buscarReceitas();
});



//-------------------------------------------------------------//-------------------------------------------------------------//-------------------------------------------------------------//



//Aqui abaixo está o código antigo, antes de implementar o backend
//Anteriormente com o DOM as receitas ficavam salvas no navegador e depois sumiam ao fechar a página ou recarrega-lá
//Com o Spring é possível salvar as receitas em um banco de dados e ficarem salvos, utilizando o H2 com JPA
//Próxima atualização adicionar um botão para editar uma receita utilizando PUT
//Próxima atualização, implementar o MySQL como banco de dados no lugar do H2 para que assim as informações fiquem verdadeiramente salvas




// const Adicionar_Receita = document.getElementById("Adicionar_Receita");

// function Abrirmodal(){
//     document.getElementById("meuModal").style.display = "block";
//     document.getElementById("Adicionar_Receita").style.display = "none";
// }


// function Fecharmodal(){
//     document.getElementById("meuModal").style.display = "none";
//     document.getElementById("Adicionar_Receita").style.display = "block";
// }



// const form = document.getElementById("FormReceita");
// const listaReceitas = document.getElementById("ReceitasAdicionadas");
// form.addEventListener("submit", function (event) {
//     event.preventDefault();
//     const Nome_Receita = document.getElementById("Receita_Nome").value;
//     const Descrição_Receita = document.getElementById("Desc_Receita").value;
//     const ReceitaItem = document.createElement("li");


//     const ReceitaName = document.createElement("strong");
//     ReceitaName.textContent = `Nome da Receita: ${Nome_Receita}`;

//     const ReceitaDesc = document.createElement("p");
//     ReceitaDesc.textContent = `Descrição: ${Descrição_Receita}`;


//     form.reset(); 

//     const listaReceitasFavoritos = document.getElementById("ReceitasFavoritadas");
//     const botãoFavoritos = document.createElement("button");
//     botãoFavoritos.classList.add("FavoritarReceita");
//     botãoFavoritos.textContent = "☆";
    
//     botãoFavoritos.addEventListener("click", () => {

//         if(listaReceitas.contains(ReceitaItem)){
//             listaReceitas.removeChild(ReceitaItem);
//             listaReceitasFavoritos.appendChild(ReceitaItem);
//         }else if(listaReceitasFavoritos.contains(ReceitaItem)){
//             listaReceitasFavoritos.removeChild(ReceitaItem);
//             listaReceitas.appendChild(ReceitaItem);
//         }

//     });

//     const botãoExcluirReceita = document.createElement("button");
//     botãoExcluirReceita.classList.add("botãoExcluirReceita");
//     botãoExcluirReceita.textContent = "X";
    
//     botãoExcluirReceita.addEventListener("click", () => {

//         if(listaReceitas.contains(ReceitaItem)){
//             listaReceitas.removeChild(ReceitaItem);
//         }else if(listaReceitasFavoritos.contains(ReceitaItem)){
//             listaReceitasFavoritos.removeChild(ReceitaItem);
//         }

//     });

//     listaReceitas.appendChild(ReceitaItem);
//     ReceitaItem.appendChild(ReceitaName);
//     ReceitaItem.appendChild(ReceitaDesc);
//     ReceitaItem.appendChild(botãoFavoritos);
//     ReceitaItem.appendChild(botãoExcluirReceita);

// });