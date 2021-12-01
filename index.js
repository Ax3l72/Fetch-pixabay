function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toLowerCase()
    /*    ul = document.getElementById("myUL");
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        } */
}

function getFetch() {
    var input = document.getElementById("mySearch");
    const filtre = input.value.toLowerCase()
    console.log(filtre)
    fetch(`https://pixabay.com/api/?key=24591764-cd034cded2148b0ee5930661d&q=${filtre}&image_type=photo`)
        .then(function (response) {
            response.json()
                .then(function (pixdata) {
                    const datas = pixdata.hits
                    console.log(pixdata.hits[0].tags)
                    divClear()
                    pixData(datas)
                });

        }).catch(function (err) {
            console.log('error: ' + err);
        });

}
function divClear(){
    document.getElementById('app').innerHTML= ''
}

function pixData(data) {
    const container = document.createElement('div')
    container.className = "container"
    document.getElementById('app').appendChild(container)

    const row = document.createElement('div')
    row.className = "row"
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
        cardtxt.innerHTML = `De ${data[i].user}`

        card.appendChild(img)
        card.appendChild(cardbody)
        cardbody.appendChild(cardtxt)
    }
}