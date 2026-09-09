// A URL da nossa API
const url = "http://localhost:3000/produtos";

/**
 * 1. BUSCAR PRODUTOS (GET)
 */
async function buscarProdutos() {
   
    try{
    const produtos = await fetch(url)

    const dados = await produtos.json();

    console.log("pokemon, temos que pegar eu sei... mas na verdade é produtos..." , dados);

dados.forEach( produto => {
    
    const card = `
    <div class="card">
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <p>R$ ${produto.preco}</p>
        <button id="deletar-${produto.id}" onclick="deletarProduto(${produto.id})">Deletar</button>
    </div>
    `
document.getElementById("lista-produtos").innerHTML += card;});
}



catch(erro) {
    console.log(erro);
}


}


/**
 * 2. SALVAR NOVO PRODUTO (POST)
 */
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", async function(evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const preco = document.getElementById("preco").value;

    try {
        const resposta = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, preco, descricao })
        });

        formulario.reset();
        buscarProdutos();

    } catch (erro) {
        console.error("Erro ao salvar produto:", erro);
    }
  window.location.reload();

});

// Executa a busca de produtos assim que a página abre
buscarProdutos();


async function deletarProduto(id) {
    try {
        const resposta = await fetch(`${url}/${id}`, {
            method: "DELETE"
        });
        buscarProdutos();
    } catch (erro) {
        console.error("Erro ao deletar produto:", erro);
    }
    alert("Produto deletado com sucesso!");
    window.location.reload();
}
