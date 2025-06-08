const blog = {
    usuario:[
        {
          username: 'beatriz',
        }
    ],
    postagens:[
        {
            id: 1,
            owner: 'beatriz',
            content: 'meu primeiro post'
        }
    ],
    lerpostagem(){
        blog.postagens.forEach(({owner, content}) => {
            blog.criarpostagem({owner: owner, content: content}, true);
        })
    },
    criarpostagem(dados, html0nly = false) {
        if(!html0nly){
            blog.postagens.push({
                id: blog.postagens.length + 1,
                owner: dados.owner,
                content: dados.content
            })
        }
        

        const listaDePublicacoes = document.querySelector('#lista-de-publicacoes');
        listaDePublicacoes.insertAdjacentHTML('afterbegin', `
            <li id="publicacao">
                ${dados.content}
                <button class="botao-deletar">deletar</button>
            </li>
        `)
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
        const botaoDeDeletarClick = InfosdoEvento.target.classList.contains('botao-deletar')
        if(botaoDeDeletarClick){
            console.log('Clicou no botão de apagar', );
            elementoAtual.parentNode.remove();
        }
    })

