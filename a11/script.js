'use strict';

const cep = document.querySelector('#cep');

const showData = (data) => {
    for(const f in data){
        if(document.querySelector('#'+f)){
            document.querySelector('#'+f).value = data[f];
        }
    }
}

const searchCep = (e) => {
    let search = cep.value.replace('-', '');

    const option = {
        method: 'get',
        mode: 'cors',
        cache: 'default'
    }

    fetch(`https://viacep.com.br/ws/${search}/json/`)
    .then(res => {
        res.json()
        .then(data => {
            showData(data);
        });
    }).catch(e => {
        console.log(e.message);
    });
}

cep.addEventListener('blur', searchCep);