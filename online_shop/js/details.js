const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
let data = {}

const dataLoaded = (load) => {
    document.getElementById('_loader').style.display = load ? "block" : "none";
}

const getData = () => {
    dataLoaded(true)
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(json => {
            data = json;
            createDetails();
        })
}

getData()

const createDetails = () => {
    document.getElementById('title').innerHTML = data.title;
    document.getElementById('description').innerHTML = data.description;
    document.getElementById('img').setAttribute('src', `${data.image}`);
    document.getElementById('price').innerHTML = `Price: ${data.price} $`;

    dataLoaded();
}