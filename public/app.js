const toCurrency = (cost) => {
    return new Intl.NumberFormat("ru-RU", {
        currency: "rub",
        style: "currency",
    }).format(cost);
}

document.querySelectorAll(".cost").forEach(node => {
    node.textContent = new Intl.NumberFormat("ru-RU", {
        currency: "rub",
        style: "currency",
    }).format(node.textContent);
})

const $card = document.querySelector('#card');

if ($card) {
    $card.addEventListener('click', (event) => {
        if (event.target.classList.contains('js-remove')) {
            const id = event.target.dataset.id;
            console.log(id);

            fetch('/card/remove/' + id, {
                method: 'delete'
            })
            .then(res => res.json())
            .then(card => {
                if (card.courses.length) {
                  const html = card.courses.map(c => {
                    return `
                    <tr>
                      <td>${c.title}</td>
                      <td>${c.count}</td>
                      <td>
                        <button class="btn btm-small js-remove" data-id="${c.id}">Удалить</button>
                      </td>
                    </tr>
                    `
                  }).join('')
                  $card.querySelector('tbody').innerHTML = html
                  $card.querySelector('.cost').textContent = toCurrency(card.cost)
                } else {
                    $card.innerHTML = "<p>Корзина Пуста</p>"
                }
            })
        }
    })
}