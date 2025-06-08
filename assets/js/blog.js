console.log('Ola a todos!');

const postagem = document.querySelector('form');
console.log(postagem);


postagem.addEventListener('submit', function criaPostController(InfosdoEvento) {
    InfosdoEvento.preventDefault();
    console.log('Estamos criando um post novo!')
    const criapost = document.querySelector('textarea[name="criapost"]');
    const listaDePublicacoes = document.querySelector('#lista-de-publicacoes');

    listaDePublicacoes.insertAdjacentHTML('afterbegin', `<li id="publicacao">${criapost.value}</li>`)
    criapost.value='';


})

