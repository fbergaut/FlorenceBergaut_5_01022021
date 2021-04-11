// Variable "oneOrder" : stockera le code html à afficher
let oneOrderHtml = "";

// Variable "list" : stock le html dy namique de la page cart.html
let list = document.querySelector(".productCartWrapper");

// Variable "price" : stockera le prix
let totalHtml = "";

// Variable "list" : stock le html dy namique de la page cart.html
let total = document.querySelector(".totalWrapper");

// Création d'une Class CartUI : gérer les taches de la vue panier.html

class CartUI {
  //---------------------Méthode : Affiche message d'erreur si couleur non sélectionnée

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector("#infoWrapper");
    const form = document.querySelector("#order-form");
    container.insertBefore(div, form);

    // Disparait au bout de 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  //---------------------Méthode : Affiche chaque commande du localStorage

  static displayOrders() {
    const orders = Store.getOrders();

    orders.forEach((order) => CartUI.addOrderToList(order));
  }

  //---------------------Méthode : Affiche les commandes

  static addOrderToList(order) {
    let nbProducts = JSON.parse(localStorage.getItem("orders")).length;

    oneOrderHtml += `<div class="productWrapper">
                      <div class="imgCartWrapper">
                          <a href="../products/product.html?id=${order.id}">
                            <img class="imgCart" src="${order.image}" alt="${order.productName}">
                          </a>
                      </div>
                      <div class="infoCartWrapper">
                          <div class="firstLineCart">
                              <div class="productName">
                                  <a class="productName_link" href="../products/product.html?id=${order.id}">
                                      <h3 class="productName_heading">${order.productName}</h3>
                                  </a>
                                  <p class="productName_color">Couleur: ${order.color}</p>
                              </div>
                              <div class="quantityWrapper">
                                  <label class="hidden" for="quantity">Quantité</label>
                                  <input class="quantityCart" type="number" value="${order.quantity}" id="quantityCart" min="1" max="10" onclick="changeCartPrice(event)">
                              </div>
                          </div>
                          <div class="secondtLineCart">
                              <div>
                                  <button type="button" class="deleteCartBtn" numProd=${order.numProd} onclick="removeAnOrder(event)">Supprimer</button>
                                  <span>|</span>
                                  <button type="button" class="moveCartBtn">Déplacer vers mes favoris</button>
                              </div>
                              <div class="cartPrice">
                                  <p><span id="priceInCart">${order.price}</span></p>
                              </div>
                          </div>
                      </div>
                  </div>
                  <hr class="strokeBlack">
                  `;

    list.innerHTML = oneOrderHtml;
  }

  //---------------------Méthode : Réinitialise les champs lorsque la commande est envoyée

  static clearFields() {
    document.querySelector(".productColor").value = "Choisir la couleur";
    document.querySelector(".quantity").value = "1";
  }

  //---------------------Méthode : Mise à jour prix d'une commande selon quantity

  static upDatePriceOrder(e) {
    const priceInCart = document.querySelector('#priceInCart');
    const quantityInCart = e.target.value;
    const orders = JSON.parse(localStorage.getItem("orders"));
    console.log(orders);

    orders.forEach((order, index) => {
      let unitPrice = parseInt(order.unitPrice);
      let newPrice = quantityInCart * unitPrice;
      console.log(index, unitPrice, newPrice, quantityInCart);
      priceInCart.textContent = newPrice + " €";
// Je ne sais pas comment mettre à jour le prix dans l'Order-----> marche pas      
      
    });
    localStorage.setItem("orders", JSON.stringify(orders));
    console.log(orders);
  }

  //---------------------Méthode : Calcul la somme totale

  static totalPrice() {
    const listOrder = JSON.parse(localStorage.getItem("orders"));
    let totalPrice = 0;
    listOrder.forEach((order) => {
      let price = parseInt(order.price);
      totalPrice += price;
    });
    totalHtml += `<div>
                      <h2 class="headingCart">Total</h2>
                  </div>
                  <div class="sous-total">
                      <p>Sous-total</p>
                      <p>${totalPrice} €</p>
                  </div>
                  <div class="delivery">
                      <p>Livraison</p>
                      <p>Gratuite</p>
                  </div>
                  <hr class="strokeBlack">
                  <div class="totalTva">
                      <p><strong>Total (TVA incluse)</strong></p>
                      <p id="totalPrice"><strong>${totalPrice} €</strong></p>
                  </div>`;

    total.innerHTML = totalHtml;
  }
}

// Création d'une Class Order : Représentera une commande

class Order {
  constructor(id, productName, image, price, color, quantity, unitPrice, numProd) {
    this.id = id;
    this.productName = productName;
    this.image = image;
    this.price = price;
    this.color = color;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.numProd = numProd;
  }
}

// Store Class : gérer le stockage de la commande

class Store {
  //---------------------Méthode : Récupère et stock les commandes dans localStorage en les transformant en un objet dans un tableau

  static getOrders() {
    let orders;
    if (localStorage.getItem("orders") === null) {
      orders = [];
    } else {
      orders = JSON.parse(localStorage.getItem("orders"));
    }

    return orders;
  }

  //---------------------Méthode : Ajout de commande dans le localStorage + Mise à jour de la commande si une commande du produit a déjà été passée

  static addOrder(userOrder) {
    const orders = Store.getOrders();
    let prodExist = false;
    // ici on controle si un type de teddy de la même couleur existe déjà--> si oui on met à jour la base
    orders.forEach((order, index) => {
      if (order.id === userOrder.id && order.color === userOrder.color) {
        orders[index].price =
          parseFloat(orders[index].price) + parseFloat(userOrder.price);
        orders[index].quantity =
          parseInt(orders[index].quantity) + parseInt(userOrder.quantity);
        localStorage.setItem("orders", JSON.stringify(orders));
        prodExist = true;
        return;
      }
    });

    if (!prodExist) {
      //alert('nouveau produit nouvelle couleur');
      orders.push(userOrder);
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }

  //---------------------Méthode : Supprimer une commande du localStorage de la clé Orders

  static removeOrder(numP) {
    const orders = Store.getOrders();

    orders.forEach((order, index) => {
      if (order.numProd == numP) {
        orders.splice(index, 1);
      }
    });

    localStorage.setItem("orders", JSON.stringify(orders));
  }

  //---------------------Méthode : Indique le nombre de commandes dans le panier

  static cartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers");
    if (productNumbers === null) {
      productNumbers = 0;
    }
    productNumbers = parseInt(productNumbers);
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(
      ".showNumberOfProductInCart"
    ).textContent = localStorage.getItem("cartNumbers");
  }

  //---------------------Méthode : Supprimer une commande du localStorage de la clé cartNumbers

  static removeCartNumbers() {}
}

// Afficher les commandes

if (list) {
  CartUI.displayOrders();

  // Supprimer les commandes de l'UI et du localStorage
  function removeAnOrder(e) {
    const numP = e.target.getAttribute("numProd");
    console.log(numP);
    Store.removeOrder(numP);
    window.location.reload();
  }
}

// Afficher le total à payer

CartUI.totalPrice();

// Mise à jour prix en fonction de la quantité
function changeCartPrice(e) {
  CartUI.upDatePriceOrder(e);
}

