const blog = {
    usuario:[
        {
          username: 'beatriz',
        }
    ],
    postagens:[],
    lerpostagem(){
        blog.postagens.forEach(({id, owner, content}) => {
            blog.criarpostagem({id, owner: owner, content: content}, true);
        })
    },
    criarpostagem(dados, html0nly = false) {
        const idinterno = Date.now();
        if(!html0nly){
            blog.postagens.push({
                id: dados.id || idinterno,
                owner: dados.owner,
                content: dados.content
            })
        }
        

        const listaDePublicacoes = document.querySelector('#lista-de-publicacoes');
        listaDePublicacoes.insertAdjacentHTML('afterbegin', `
            <li data-id="${idinterno}" id="publicacao">
                <span contenteditable="false" class="editar-publicacao">
                     ${dados.content}
                </span>
                <button class="botao-editar">editar</button>
                <button class="botao-deletar">deletar</button>
            </li>
        `)
    },
    apagarpostagem(id){
        const listadepostagematualizada = blog.postagens.filter((postagematual) => {
            return postagematual.id !== Number(id);
        })
        blog.postagens = listadepostagematualizada;
    },
    edicaodapostagem(id, novoConteudo){
        const postagemqueseraeditada = blog.postagens.find((postagens) => {
            return postagens.id === Number(id);
        });
        console.log(postagemqueseraeditada);
        postagemqueseraeditada.content = novoConteudo;
    }
}

const postagem = document.querySelector('form');
console.log(postagem);

blog.lerpostagem();

postagem.addEventListener('submit', function criaPostController(InfosdoEvento) {
    InfosdoEvento.preventDefault();
    console.log('Estamos criando um post novo!')
    const criapost = document.querySelector('textarea[name="criapost"]');

    blog.criarpostagem({owner:'beatriz', content: criapost.value});
   
    criapost.value='';

})

document.querySelector('#lista-de-publicacoes').addEventListener('click', function (InfosdoEvento) {
    console.log('houve um click');
    const elementoAtual = InfosdoEvento.target;
    const postagensId = elementoAtual.parentNode.getAttribute('data-id');
    const botaoDeDeletarClick = InfosdoEvento.target.classList.contains('botao-deletar');
    if(botaoDeDeletarClick){
        console.log('Clicou no botão de apagar',);
        const id = elementoAtual.parentNode.getAttribute('data-id');
        blog.apagarpostagem(id);
        elementoAtual.parentNode.remove();
        console.log(blog.postagens);
    }

    const botaoDeEditarClick = elementoAtual.classList.contains('botao-editar');
    if(botaoDeEditarClick){
        console.log('Clicou no botão de editar');
        const spanContent = elementoAtual.parentNode.querySelector('.editar-publicacao');

        if (spanContent.contentEditable === 'false' || spanContent.contentEditable === '') {
            // Habilita a edição
            spanContent.contentEditable = 'true';
            spanContent.focus(); 
            elementoAtual.textContent = 'salvar'; 
            elementoAtual.classList.add('salvar-ativo'); 
        } else {
            spanContent.contentEditable = 'false';
            blog.edicaodapostagem(postagensId, spanContent.innerText);
            elementoAtual.textContent = 'editar'; 
            elementoAtual.classList.remove('salvar-ativo'); 
            console.log('Postagem atualizada:', blog.postagens);
        }
    }
})

document.querySelector('#lista-de-publicacoes').addEventListener('input', function (InfosdoEvento){
    if (InfosdoEvento.target.classList.contains('editar-publicacao')) {
        console.log('houve uma edição (digitando)');
        const elementoAtual = InfosdoEvento.target;
        const id = elementoAtual.parentNode.getAttribute('data-id');
        blog.edicaodapostagem(id, elementoAtual.innerText);
    }
})

