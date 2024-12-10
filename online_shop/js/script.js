
let data = [];
let categories = [];

const dataLoaded = (load) => {
    const loader = document.getElementById('_loader');
    loader.style.display = load ? "block" : "none";
}

const getData = (category) => {
    dataLoaded(true);
    const url = category
        ? `https://fakestoreapi.com/products/category/${category}`
        : 'https://fakestoreapi.com/products'

    fetch(url)
        .then(res => res.json())
        .then(json => {
            data = json;
            createList();
        })
        .catch(() => dataLoaded());
}

const getCategories = () => {
    fetch(`https://fakestoreapi.com/products/categories`)
        .then(res => res.json())
        .then(json => {
            categories = json;
            createFilter();
        })
}

//виклик функцій-----------------------------
getData();
getCategories();
//--------------------------------------------

const createFilter = () => {
    const cat = document.getElementById('categories');
    let value = '';

    categories.map((el, i) => {
        const div = document.createElement('div');
        div.classList.add('form-check');

        const input = document.createElement('input');
        input.classList.add('form-check-input');
        input.setAttribute('type', 'radio')
        input.setAttribute('value', el)
        input.setAttribute('id', i)
        input.setAttribute('name', 'cats')
        input.addEventListener('click', (e) => {

            if (value == e.target.value) {
                input.checked = false;
                getData();
                value = '';
            } else {
                value = e.target.value;
                getData(e.target.value);
            }
        })

        const label = document.createElement('label');
        label.classList.add('form-check-label');
        label.setAttribute('for', i)
        label.innerHTML = el;

        div.appendChild(input);
        div.appendChild(label);

        cat.appendChild(div)
    })
}

const createItem = (obj) => {
    const a = document.createElement('a');

    a.classList.add('item');
    a.setAttribute('href', `./pages/details.html?id=${obj.id}`);

    const title = document.createElement('div');
    title.innerHTML = obj.title;
    title.classList.add('title');

    const divImg = document.createElement('div');
    divImg.classList.add('image');

    const description = document.createElement('div');
    description.classList.add('description');
    description.innerHTML = obj.description;

    const img = document.createElement('img');
    img.setAttribute('src', obj.image);
    divImg.appendChild(img);

    const btn = document.createElement('button');
    btn.classList.add('btn', 'btn-primary');
    btn.innerHTML = "Buy";

    const btn1 = document.createElement('button');
    const i = document.createElement('i');
    i.classList.add('bi', 'bi-cart-plus');
    btn1.appendChild(i);
    btn1.classList.add('btn', 'btn-secondary');

    btn1.addEventListener('click', (e) => {
        e.preventDefault();
        addToCart(obj);
    })

    a.appendChild(title);
    a.appendChild(divImg);
    a.appendChild(description);
    a.appendChild(btn);
    a.appendChild(btn1);

    return a;
}

const updateCartCount = () => {
    const cartCount = document.getElementById('cartCount');
    const _items = JSON.parse(localStorage.getItem('items')) || []
    cartCount.innerHTML = _items.length;
}

const addToCart = (obj) => {
    const _items = JSON.parse(localStorage.getItem('items')) || []
    const hasObj = _items.find(x => x.id == obj.id);
    if (!hasObj) {
        _items.push(obj);
        localStorage.setItem("items", JSON.stringify(_items));
        updateCartCount();
    }
}

const createList = () => {
    const content = document.getElementById('con');
    content.innerHTML = '';
    for (let index = 0; index < data.length; index++) {
        // виклик функції яка повертає створений "а" елемент
        const _a = createItem(data[index]);
        // додаємо результат функції в div (content)
        content.appendChild(_a);
    }
    updateCartCount();
    dataLoaded();
}





