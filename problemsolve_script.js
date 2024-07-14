document.getElementById('itemForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const associateName = document.getElementById('associateName').value;
    const itemName = document.getElementById('itemName').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const picture = document.getElementById('picture').files[0];
    const itemDescription = document.getElementById('itemDescription').value;

    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <strong>${itemName}</strong> - ${date}
        <div class="card-details">
            <p><strong>Associate Name:</strong> ${associateName}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Description:</strong> ${itemDescription}</p>
            ${picture ? `<img src="${URL.createObjectURL(picture)}" alt="Item Picture" style="max-width: 100px;">` : ''}
            <button type="button" onclick="editCard(this)">Edit</button>
            <button type="button" onclick="deleteCard(this)">Delete</button>
        </div>
    `;
    card.addEventListener('click', function() {
        const details = this.querySelector('.card-details');
        details.style.display = details.style.display === 'none' || details.style.display === '' ? 'block' : 'none';
    });
    document.getElementById('cardsContainer').appendChild(card);
    document.getElementById('itemForm').reset();
});

function deleteCard(button) {
    const card = button.parentElement.parentElement;
    card.querySelector('button[onclick="editCard(this)"]').remove();
    card.querySelector('button[onclick="deleteCard(this)"]').remove();
    document.getElementById('deletedLog').appendChild(card.cloneNode(true));
    card.remove();
}

function editCard(button) {
    const card = button.parentElement.parentElement;
    const associateName = card.querySelector('.card-details p:nth-child(1)').textContent.split(': ')[1];
    const itemName = card.querySelector('strong').textContent;
    const date = card.querySelector('.card-details p:nth-child(2)').textContent.split(': ')[1];
    const time = card.querySelector('.card-details p:nth-child(3)').textContent.split(': ')[1];
    const itemDescription = card.querySelector('.card-details p:nth-child(4)').textContent.split(': ')[1];

    document.getElementById('associateName').value = associateName;
    document.getElementById('itemName').value = itemName;
    document.getElementById('date').value = date;
    document.getElementById('time').value = time;
    document.getElementById('itemDescription').value = itemDescription;

    if (card.querySelector('.card-details img')) {
        const picture = card.querySelector('.card-details img').src;
        fetch(picture)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], "picture.png", { type: "image/png" });
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                document.getElementById('picture').files = dataTransfer.files;
            });
    }

    card.remove();
}
