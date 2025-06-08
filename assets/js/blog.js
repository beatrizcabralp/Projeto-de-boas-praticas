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
    criarpostagem(dados, html0nly = false) {
        if(!html0nly){
            blog.postagens.push({
                id: blog.postagens.length + 1,
                owner: dados.owner,
                content: dados.content
            })
        }
        

        const listaDePublicacoes = document.querySelector('#lista-de-publicacoes');
        listaDePublicacoes.insertAdjacentHTML('afterbegin', `<li id="publicacao">${dados.content}</li>`)
    }
}

const postagem = document.querySelector('form');
console.log(postagem);

blog.postagens.forEach(({owner, content}) => {
    blog.criarpostagem({owner: owner, content: content}, true);
})

postagem.addEventListener('submit', function criaPostController(InfosdoEvento) {
    InfosdoEvento.preventDefault();
    console.log('Estamos criando um post novo!')
    const criapost = document.querySelector('textarea[name="criapost"]');

    blog.criarpostagem({owner:'beatriz', content: criapost.value});
   
    criapost.value='';


})

