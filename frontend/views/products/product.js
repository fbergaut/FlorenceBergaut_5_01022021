// Variable "id" : stock l'url des pages produits + leur id
let id = App.getIdByUrl();
console.log(id);

// Variable "oneTeddy" : stockera le code html à afficher
let oneTeddy = "";

// Variable "oneBearProduct" : stock le html dynamique de la page product.html.
let oneBearProduct = document.querySelector(".productImg");

// Variable "price" : stockera le prix d'un produit teddy
// let price = 0;


// On se connecte à l'API et on récupère un teddy par son id

let bear = App.getProduct("http://localhost:3000/api/teddies/" + id)
  // On crée une promesse avec en paramètre "teddy"
  .then((teddy) => {
    // On affiche les options de couleurs
    const colorsOption = teddy.colors.map((color) => {
      const optionProductColor = document.createElement("option");
      return (optionProductColor.innerHTML = `<option class="productColorOption">${color}</option>`);
    });

    price = teddy.price / 100;

    // On associe à la variable "oneTeddy" le code html qui viendra s'afficher dynamiquement avec les datas de chaque teddy.
    oneTeddy += `<div class="row">
                        <div class="col-lg-6">
                          <div class="mainImg">
                            <img id="image" class="card-img-top" src="${teddy.imageUrl}" alt="${teddy.name}">
                          </div>
                        </div>
                        <div class="col-12 col-lg-6" id="infoWrapper">
                          <div class="wrapperHeading">
                            <h1 class="heading name">${teddy.name}</h1>
                              <a class="heartBtn">
                                <i class="fas fa-heart" aria-hidden="true"></i>
                              </a>
                            </div>
                          <div class="text">${teddy.description}</div>
                          <div class="reviewWrapper">
                            <i class="fas fa-star reviewBtn" aria-hidden="true"></i>
                            <i class="fas fa-star reviewBtn" aria-hidden="true"></i>
                            <i class="fas fa-star reviewBtn" aria-hidden="true"></i>
                            <i class="fas fa-star reviewBtn" aria-hidden="true"></i>
                            <i class="fas fa-star reviewBtn" aria-hidden="true"></i>
                          </div>
                          <p class="price"><span id="teddyprice">${price}</span> €</p>
                         <form method="post" id="order-form">
                            <div class="colorWrapper">
                              <select class="productColor">
                                <option class="productColorOption" selected="true">Choisir la couleur</option>
                                ${colorsOption}
                              </select>
                            </div>
                            <div class="wrapper">
                              <div class="wrapperQuantity">
                                <label class="hidden" for="quantity">Quantité</label>
                                  <input class="quantity" type="number" value="1" id="quantity" min="1" max="10" onchange="changePrice(event)">
                              </div>
                              <div>
                                <input type="submit" value="Ajouter au panier" id="sendForm" class="btn btn-outline-pink btn-lg rounded-0 addCartBtn">
                              </div>
                            </div>
                        </form>
                        </div>
                      </div>`;

    // On insère le code html dynamique "oneTeddy" à l'endroit indiqué par "oneBearProduct".
    oneBearProduct.innerHTML = oneTeddy;
  });

    function changePrice(e){
      App.upDatePrice(e,teddyprice);
    }
    
    // Event: Ajouter une commande
    document.querySelector(".row").addEventListener("submit", (e) => {
      // Prevent actual submit
        e.preventDefault();
          // Récupérer les valeurs du teddy et de son <form>
      const productName = document.querySelector(".name").textContent;
      const image = document.getElementById("image").src;
      const price = document.querySelector(".price").textContent;
      const color = document.querySelector(".productColor").value;
      const quantity = document.querySelector(".quantity").value;

      // Valider le champs choix de couleur
      if (color === "Choisir la couleur") {
        CartUI.showAlert('Veuillez choisir une couleur', 'danger')
      } else {
        // Créer des instances de Order

        let num = 1;
        const items = JSON.parse(localStorage.getItem("orders"));
        if (items === null) {
          num = 1;
        } else {
          num = items[items.length - 1].numProd + 1;
        }

        const order = new Order(
          id,
          productName,
          image,
          price,
          color,
          quantity,
          num
        );

        console.log(order);

        // Ajouter une commande au Store

        Store.addOrder(order);

        // Vider les champs du formulaire

        CartUI.clearFields();

        // Afficher nombre de commandes dans le cart

        Store.cartNumbers();

        //  console.log("aller vers le panier");
        //  window.location.assign(window.location.origin + '/frontend/views/cart/cart.html');
      }});




