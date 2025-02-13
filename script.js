
const Adicionar_Receita = document.getElementById("Adicionar_Receita");

function Abrirmodal(){
    document.getElementById("meuModal").style.display = "block";
    document.getElementById("Adicionar_Receita").style.display = "none";
}


function Fecharmodal(){
    document.getElementById("meuModal").style.display = "none";
    document.getElementById("Adicionar_Receita").style.display = "block";
}



const form = document.getElementById("FormReceita");
const listaReceitas = document.getElementById("ReceitasAdicionadas");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const Nome_Receita = document.getElementById("Receita_Nome").value;
    const Descrição_Receita = document.getElementById("Desc_Receita").value;
    const ReceitaItem = document.createElement("li");


    const ReceitaName = document.createElement("strong");
    ReceitaName.textContent = `Nome da Receita: ${Nome_Receita}`;

    const ReceitaDesc = document.createElement("p");
    ReceitaDesc.textContent = `Descrição: ${Descrição_Receita}`;


    form.reset(); 

    const listaReceitasFavoritos = document.getElementById("ReceitasFavoritadas");
    const botãoFavoritos = document.createElement("button");
    botãoFavoritos.classList.add = ("FavoritarReceita");
    botãoFavoritos.textContent = "☆";
    
    botãoFavoritos.addEventListener("click", () => {

        if(listaReceitas.contains(ReceitaItem)){
            listaReceitas.removeChild(ReceitaItem);
            listaReceitasFavoritos.appendChild(ReceitaItem);
        }else if(listaReceitasFavoritos.contains(ReceitaItem)){
            listaReceitasFavoritos.removeChild(ReceitaItem);
            listaReceitas.appendChild(ReceitaItem);
        }

    });

    const botãoExcluirReceita = document.createElement("button");
    botãoExcluirReceita.classList.add = "botãoExcluirReceita";
    botãoExcluirReceita.textContent = "X";
    
    botãoExcluirReceita.addEventListener("click", () => {

        if(listaReceitas.contains(ReceitaItem)){
            listaReceitas.removeChild(ReceitaItem);
        }else if(listaReceitasFavoritos.contains(ReceitaItem)){
            listaReceitasFavoritos.removeChild(ReceitaItem);
        }

    });

    listaReceitas.appendChild(ReceitaItem);
    ReceitaItem.appendChild(ReceitaName);
    ReceitaItem.appendChild(ReceitaDesc);
    ReceitaItem.appendChild(botãoFavoritos);
    ReceitaItem.appendChild(botãoExcluirReceita);

});


