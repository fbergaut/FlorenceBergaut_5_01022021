const postsList = document.querySelector(".posts-list");
const ajouterProduit = document.querySelector(".add-post-form");
const nameValue = document.getElementById("name-value");
const descriptionValue = document.getElementById("description-value");
const ajouterBtn = document.querySelector(".btn");
const nameProduct = document.querySelector('.card-title');
const description = document.querySelector(".card-text");

// Créer un nouveau produit et l'insérer dans un tableau

const productsArray = [];
function showProducts (products) {
    let output = "";
    products.map((product, index) => {
        output += `
            <div class="card mt-4 col-md-6 bg-light">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <a href="#" class="btn btn-primary" id="editer-produit" onclick="modifyProduct(${index})">Editer</a>
                    <a href="#" class="btn btn-primary" id="supprimer-produit" onclick="deleteProduct(${index})">Supprimer</a>
                </div>
            </div>`;
    });
    postsList.innerHTML = output;
    // console.log(output);
}


// Ajouter un produit

ajouterProduit.addEventListener("submit", (e) => {
    e.preventDefault();

    let product = {
      name: nameValue.value,
      description: descriptionValue.value
    };

    productsArray.push(product);
    showProducts(productsArray);

    // vider champs de saisi
    nameValue.value = "";
    descriptionValue.value = "";
});

// Supprimer le produit

function deleteProduct(index) {
    productsArray.splice(index, 1);
    showProducts(productsArray);
}

// Modifier le produit

function modifyProduct(index) {
    productsArray.splice(index, 0,);
    console.log(productsArray);

    let nameContent = document.querySelector(".card-title").textContent;
    let descriptionContent = document.querySelector(".card-text").textContent;

    nameValue.value = nameContent;
    descriptionValue.value = descriptionContent;

    showProducts(productsArray);
}



// ajouterBtn.addEventListener("click", (e) => {
//      e.preventDefault();
// });


// Editer ou Supprimer les produits


// postsList.addEventListener("click", (e) => {
//     e.preventDefault();
//     let suppBtnActif = e.target.id == "supprimer-produit";
//     let editBtnActif = e.target.id == "editer-produit";

//   // Supprimer le produit

//   if (suppBtnActif) {
//     const node = document.querySelector(".card");
//     if (node.parentNode) {
//       node.parentNode.removeChild(node);
//     }
//   }

//   // Editer le produit

//   if (editBtnActif) {
//     const parent = e.target.parentElement;
//     let nameContent = parent.querySelector(".card-title").textContent;
//     let descriptionContent = parent.querySelector(".card-text").textContent;

//     nameValue.value = nameContent;
//     descriptionValue.value = descriptionContent;
//   }

//   // Mettre à jour le produit

//   ajouterBtn.addEventListener("click", (e) => {
// //     e.preventDefault();
// //     // fetch(`${url}/${id}`, {
// //     //   method: "PATCH",
// //     //   headers: {
// //     //     "Content-Type": "application/json",
// //     //   },
// //     //   body: JSON.stringify({
// //     //     name: nameValue.value,
// //     //     description: descriptionValue.value,
// //     //   }),
// //     // })
// //     //   .then((res) => res.json())
// //     //   .then(() => location.reload());

//     nameProduct.textContent = nameValue.value;
//     description.textContent = descriptionValue.value;

//   });
// });


