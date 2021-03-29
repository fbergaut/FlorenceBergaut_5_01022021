// On crée une variable "params" qui va nous permettre de stocker l'url des pages produits et on récupère l'_id dans la variable "id".
let params = new URL(document.location).searchParams;
let id = params.get("id");
console.log(id);

// On se connecte à l'API et on récupère tous les teddies de la base + l'_id de chaque teddy.
async function getTeddy() {
  let rep = await fetch("http://localhost:3000/api/teddies/" + id, {
    method: "GET",
  });
  let reponse = await rep.json();
  return reponse;
}

// On crée une variable "oneTeddy" qui stockera le code html à afficher
let oneTeddy = "";

// On crée une variable "oneBearProduct" qui va indiquer où le html dynamique viendra se placer dans la page product.html.
let oneBearProduct = document.querySelector(".productImg");

// On stock dans la variable "bears" les datas récupérées de l'API
let bears = getTeddy()
  // On crée une promesse avec en paramètre "teddy"
  .then((teddy) => {
    //On affiche les options de couleurs
    const colorsOption = teddy.colors.map((color) => {
      const optionProductColor = document.createElement("option");
      return (optionProductColor.innerHTML = `<option class="productColorOption">${color}</option>`);
    });
    console.log(colorsOption);

    // On associe à la variable "oneTeddy" le code html qui viendra s'afficher dynamiquement avec les datas de chaque teddy.
    oneTeddy += `<div class="row">
                        <div class="col-lg-6">
                          <div class="mainImg">
                            <img class="card-img-top" src="${
                              teddy.imageUrl
                            }" alt="${teddy.name}">
                          </div>
                        </div>
                        <div class="col-12 col-lg-6">
                          <div class="wrapperHeading">
                            <h1 class="heading">${teddy.name}</h1>
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
                          <p class="price">${teddy.price / 100} €</p>
                          <form id="order-form">
                            <div class="colorWrapper">
                              <select class="productColor">
                                <option class="productColorOption" selected="true">Choisir la couleur</option>
                                ${colorsOption}
                              </select>
                            </div>
                            <div class="wrapper">
                              <div class="wrapperQuantity">
                                <label class="hidden" for="quantity">Quantité</label>
                                  <input class="quantity" type="number" value="1" id="quantity" min="1" max="100">
                              </div>
                              <div>
                                <a href="../cart/cart.html?id=${teddy._id}" >
                                  <button class="btn btn-outline-pink btn-lg rounded-0 addCartBtn" type="submit">Ajouter au panier</button>
                                </a>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>`;

    // On insère le code html dynamique "oneTeddy" à l'endroit indiqué par "oneBearProduct".
    oneBearProduct.innerHTML = oneTeddy;

    // Event : choisir la couleur

    // Event : choisir la quantité

    // Event : Ajouter une commande
  });

  

  
