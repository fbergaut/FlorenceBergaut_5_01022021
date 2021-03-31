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

    // On associe à la variable "oneTeddy" le code html qui viendra s'afficher dynamiquement avec les datas de chaque teddy.
    oneTeddy += `<div class="row">
                        <div class="col-lg-6">
                          <div class="mainImg">
                            <img id="image" class="card-img-top" src="${
                              teddy.imageUrl
                            }" alt="${teddy.name}">
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
                          <p class="price">${teddy.price / 100} €</p>
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
                                  <input class="quantity" type="number" value="1" id="quantity" min="1" max="100">
                              </div>
                              <div>
                                <a href="../cart/cart.html?id=${teddy._id}" >
                                  <input type="submit" value="Ajouter au panier" class="btn btn-outline-pink btn-lg rounded-0 addCartBtn" id="sendForm">
                                </a>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>`;

    // On insère le code html dynamique "oneTeddy" à l'endroit indiqué par "oneBearProduct".
    oneBearProduct.innerHTML = oneTeddy;

    // Création d'une Class Order : Représentera une commande

    class Order {
      constructor(id, productName, image, price, color, quantity) {
        this.id = id;
        this.productName = productName;
        this.image = image;
        this.price = price;
        this.color = color;
        this.quantity = quantity;
      }
    }

    // Création d'une Class UI : gérer les taches de l'UI

    class UI {
      static showAlert(message, className) {
        const div = document.createElement("div");
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector("#infoWrapper");
        const form = document.querySelector("#order-form");
        container.insertBefore(div, form);

        // Vanish in 3 seconds
        setTimeout(() => document.querySelector(".alert").remove(), 3000);
      }

      static showNumberOfProductInCart() {
        const divNumberofProduct = document.createElement("div");
        divNumberofProduct.className = "showNumberOfProductInCart";
        divNumberofProduct.appendChild(document.createTextNode());
        const li = document.querySelector("#cart");
        li.after(divNumberofProduct);
      }

      static clearFields() {
        document.querySelector(".productColor").value = "Choisir la couleur";
        document.querySelector(".quantity").value = "1";
      }
    }

    // Store Class : gérer le stockage de la commande

    class Store {
      static getOrders() {
        let orders;
        if (localStorage.getItem("orders") === null) {
          orders = [];
        } else {
          orders = JSON.parse(localStorage.getItem("orders"));
        }

        return orders;
      }

      static addOrder(order) {
        const orders = Store.getOrders();
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));
      }

      static cartNumbers() {
        let productNumbers = localStorage.getItem("cartNumbers");
        productNumbers = parseInt(productNumbers);
        if (productNumbers) {
          localStorage.setItem("cartNumbers", productNumbers + 1);
          document.querySelector(".cartNumber span").textContent = productNumbers + 1;
        } else {
          localStorage.setItem("cartNumbers", 1);
          document.querySelector(".cartNumber span").textContent = 1;
        }
      }
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
        UI.showAlert("Veuillez choisir une couleur", "danger");
      } else {
        // Créer des instances de Order
        const order = new Order(id, productName, image, price, color, quantity);

        console.log(order);

        // Ajouter une commande au Store

        Store.addOrder(order);

        // Vider les champs du formulaire

        UI.clearFields();
      }
    });

    // Event: Ajouter le nombre de commandes qui se trouve dans le panier
    document.querySelector("#sendForm").addEventListener("click", (e) => {
      Store.cartNumbers();
    });
  });