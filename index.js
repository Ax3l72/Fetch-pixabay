function searchTag(e) {
    var input, filter,cards, div,i,txtValue, tet;
    input = document.getElementById('myTags')
    filter = input.value.toLowerCase()
    cards = document.getElementById('cards')
    div = cards.getElementsByTagName('div')

    for(i = 0; i < div.length; i++){
        tet = div[i].getElementsByTagName('p')[0]
        txtValue = tet.textContent || a.innerText
        if(txtValue.toLowerCase().indexOf(filter) > -1){
            div[i].style.display = ''
        }else{
                div[i].style.display = 'none'
            
        }
    }
}

function getFetch() {
    var lang = document.getElementById('lan')
    if(lang == undefined){var langs = "fr"}else{ var langs = lang.value}

    var input = document.getElementById("mySearch");
    if(input.value == ""){ var filtre = "sun" }else{ var filtre = input.value.toLowerCase()}
    fetch(`https://pixabay.com/api/?key=24591764-cd034cded2148b0ee5930661d&q=${filtre}&image_type=photo&per_page=50&lang=${langs}`)
        .then(function (response) {
            response.json()
                .then(function (pixdata) {
                    const datas = pixdata.hits
                    divClear()
                    pixData(datas)
                });

        }).catch(function (err) {
            console.log('error: ' + err);
        });

}
getFetch()

function divClear(){
    document.getElementById('app').innerHTML= ''
}

function pixData(data) {
    const container = document.createElement('div')
    container.className = "container"
    document.getElementById('app').appendChild(container)

    const row = document.createElement('div')
    row.className = "row"
    row.setAttribute('id', 'cards')
    container.appendChild(row)


    for (i = 0; i < data.length; i++) {
        const md4 = document.createElement('div')
        md4.className = "col-xs-12 col-xm-12 col-md-4 py-2"

        const card = document.createElement('div')
        card.className = "card"

        row.appendChild(md4)
        md4.appendChild(card)

        if (data[i].userImageURL == "") {
            var imglink = "https://fakeimg.pl/350x350/?text=Image"
        } else {
            var imglink = data[i].previewURL
        }
        const img = document.createElement('img')
        img.setAttribute('src', `${imglink}`)
        img.setAttribute("class", 'card-img-top')

        const cardbody = document.createElement('div')
        cardbody.setAttribute('class', "card-body")
        

        const cardtxt = document.createElement('p')
        cardtxt.setAttribute('class', "card-text")
        cardtxt.innerHTML = `De ${data[i].user} | Tags: ${data[i].tags}`

        card.appendChild(img)
        card.appendChild(cardbody)
        cardbody.appendChild(cardtxt)
    }
}