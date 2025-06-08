const blog = {
    usuario:[
        {
          username: 'beatriz',
        }
    ],
    postagens:[
       /* {
            id: Date.now(),
            owner: 'beatriz',
            content: 'meu primeiro post'
        }*/
    ],
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
                <span contenteditable>
                     ${dados.content}
                </span>
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
        const botaoDeDeletarClick = InfosdoEvento.target.classList.contains('botao-deletar');
        if(botaoDeDeletarClick){
            console.log('Clicou no botão de apagar',);
            const id = elementoAtual.parentNode.getAttribute('data-id');
            blog.apagarpostagem(id);
            elementoAtual.parentNode.remove();
            console.log(blog.postagens);
        }
})

document.querySelector('#lista-de-publicacoes').addEventListener('input', function (InfosdoEvento){
    console.log('houve uma edição');
    const elementoAtual = InfosdoEvento.target;
    const id = elementoAtual.parentNode.getAttribute('data-id');

    //console.log('ID: ', id);
    //console.log('Valor: ', elementoAtual.innerText);
    blog.edicaodapostagem(id, elementoAtual.innerText);
})

