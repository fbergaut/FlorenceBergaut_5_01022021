const postsList = document.querySelector('.posts-list');
const ajouterProduit = document.querySelector('.add-post-form');
const nameValue = document.getElementById('name-value');
const descriptionValue = document.getElementById('description-value');
const ajouterBtn = document.querySelector('.btn');

let output = '';

const afficherProduit = (products) => {
    products.forEach(product => {
      output += `
            <div class="card mt-4 col-md-6 bg-light">
                <div class="card-body" data-id=${product._id}>
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <a href="#" class="btn btn-primary" id="editer-produit">Editer</a>
                    <a href="#" class="btn btn-primary" id="supprimer-produit">Supprimer</a>
                </div>
            </div>    
        `;
    });
    postsList.innerHTML = output;
}

// Récupérer les produits

const url = "http://localhost:3000/api/teddies";

fetch(url)
  .then(response => response.json())
  .then(data => afficherProduit(data))

postsList.addEventListener('click', (e) => {
    e.preventDefault();
    let suppBtnActif = e.target.id == 'supprimer-produit';
    let editBtnActif = e.target.id == 'editer-produit';

    let id = e.target.parentElement.dataset.id;

    // Supprimer le produit

    if(suppBtnActif) {
        fetch(`${url}/${id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(() => location.reload());
        }

    if(editBtnActif) {
        const parent = e.target.parentElement;
        let nameContent = parent.querySelector('.card-title').textContent;
        let descriptionContent = parent.querySelector('.card-text').textContent;

        nameValue.value = nameContent;
        descriptionValue.value = descriptionContent;
    }    

    // Mettre à jour le produit

    ajouterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        fetch(`${url}/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nameValue.value,
            description: descriptionValue.value,
          })
        })
            .then(res => res.json())
            .then(() => location.reload())
    })

});


// Créer et insérer un nouveau produit

ajouterProduit.addEventListener('submit', (e) => {
    e.preventDefault();

    nameValue;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameValue.value,
        description: descriptionValue.value
      }),
    })
      .then(res => res.json())
      .then(data => {
          const dataArray = [];
          dataArray.push(data);
          ajouterProduit(dataArray);
      });

    // vider champs de saisi      
      nameValue.value = "";
      descriptionValue.value = "";

});
