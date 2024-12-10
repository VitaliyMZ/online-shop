const createList = () => {
    const tbody = document.getElementById('tbody');
    const _items = JSON.parse(localStorage.getItem('items')) || []

    for (let index = 0; index < _items.length; index++) {
        const _tr = createItem(_items[index], index);
        tbody.appendChild(_tr);
    }
}

const createItem = (obj, index) => {
    const tr = document.createElement('tr');

    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    const td5 = document.createElement('td');
    const td6 = document.createElement('td');

    td1.innerHTML = index + 1;
    td2.classList.add("text-center");

    const div1 = document.createElement("div");
    div1.innerHTML = obj.title;

    const img = document.createElement("img");
    img.setAttribute('src', obj.image);

    td3.innerHTML = obj.description;
    td4.innerHTML = obj.price;

    const div2 = document.createElement("div");
    const div3 = document.createElement("div");
    div2.classList.add('count-group');
    div3.classList.add('count');
    div3.innerHTML = 1;

    const button1 = document.createElement("button");
    const button2 = document.createElement("button");
    button1.classList.add("btn", "btn-primary");
    button2.classList.add("btn", "btn-primary");
    button1.innerHTML = "-";
    button2.innerHTML = "+";

    button1.addEventListener('click', () => {
        if (+div3.innerHTML > 1) {
            div3.innerHTML = +div3.textContent - 1;
            td6.innerHTML = (obj.price * +div3.textContent).toFixed(2);
        }
    })
    button2.addEventListener('click', () => {
        div3.innerHTML = +div3.textContent + 1;
        td6.innerHTML = (obj.price * +div3.textContent).toFixed(2);
    })

    div2.appendChild(button1);
    div2.appendChild(div3);
    div2.appendChild(button2);

    td2.appendChild(div1);
    td2.appendChild(img);
    td5.appendChild(div2);

    td6.innerHTML = obj.price;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);

    return tr;
}

createList();









