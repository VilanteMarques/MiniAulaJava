function abrirModal(){
    overlay.classList.add("active");
    criarTarefa.classList.add("active");
}
function fecharModal(){
    overlay.classList.remove("active");
    criarTarefa.classList.remove("active");
}
function buscarTarefa(){
    fetch("http://localhost:3000/tarefa")
    .then(res => res.json())
    .then(res => {
        inserirTarefa(res);

    });
} buscarTarefa();

function inserirTarefa(listaDeTarefa){
if(listaDeTarefa.length > 0){
    lista.innerHTML = "";
    listaDeTarefa.map(tarefa => {
        lista.innerHTML += ` 
        <li>
                    <h5>${tarefa.titulo}</h5>
                    <p>${tarefa.descricao}</p>
                    <div class="actions">
                            <box-icon name='trash'size="sm"onclick="deletarTarefa(${tarefa.id})"></box-icon>
                </div>
                </li>
                `;
    })
}
}

function novaTarefa(){
    event.preventDefault();
    let tarefa = {
        titulo: titulo.value,
        descricao: descricao.value
    }
   fetch("http://localhost:3000/tarefa",{
    method: "POST",
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify(tarefa)
   })
   .then(res => res.json())
   .then(res => {
    buscarTarefa();
    fecharModal();
   })
     

}

function deletarTarefa(id){
    fetch(`http://localhost:3000/tarefa/${id}`,{
        method:"DELETE",   
    })
    .then(res => res.json())
    .then(res => {
    alert("Tarefa Deletada com Sucesso!");
    buscarTarefa();
})
}

function pesquisarTarefa(){
    let lis = document.querySelectorAll("ul li");
        if(busca.value.length > 0){
        lis.forEach(li => {
            if(!li.children[0].innerText.includes(busca.value)){
                li.classList.add('oculto');
            }else{
                li.classList.remove('oculto');
            }

        })
    }else{
        lis.forEach(li =>{
            li.classList.remove('oculto');
        })
    }
}