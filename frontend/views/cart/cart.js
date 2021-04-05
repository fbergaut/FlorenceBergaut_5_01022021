let oneOrder='';

let list = document.querySelector(".productCartWrapper");

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

      // Vanish in 3 seconds
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

      oneOrder += `<div class="productWrapper">
                      <div class="imgCartWrapper">
                          <a href="#">
                              <img class="imgCart" src="${order.image}" alt="${order.productName}">
                          </a>
                      </div>
                      <div class="infoCartWrapper">
                          <div class="firstLineCart">
                              <div class="productName">
                                  <a class="productName_link" href="#">
                                      <h3 class="productName_heading">${order.productName}</h3>
                                  </a>
                                  <p class="productName_color">Couleur: ${order.color}</p>
                              </div>
                              <div class="quantityWrapper">
                                  <select class="productQuantityCart" aria-label="Default select example" >
                                      <option class="productQuantityOption" value="1" selected>${order.quantity}</option>
                                      <option class="productQuantityOption" value="2">2</option>
                                      <option class="productQuantityOption" value="3">3</option>
                                      <option class="productQuantityOption" value="4">4</option>
                                      <option class="productQuantityOption" value="5">5</option>
                                      <option class="productQuantityOption" value="6">6</option>
                                  </select>
                              </div>
                          </div>
                          <div class="secondtLineCart">
                              <div>
                                  <button type="button" class="deleteCartBtn" numProd=${order.numProd} onclick="removeAnOrder(event)">Supprimer</button>
                                  <span>|</span>
                                  <button type="button" class="moveCartBtn">Déplacer vers mes favoris</button>
                              </div>
                              <div class="cartPrice">
                                  <p>${order.price}</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  <hr class="strokeBlack">`;

      list.innerHTML = oneOrder;
    }

    //---------------------Méthode : Réinitialise les champs lorsque la commande est envoyée

    static clearFields() {
      document.querySelector(".productColor").value = "Choisir la couleur";
      document.querySelector(".quantity").value = "1";
    }
  }


   // Création d'une Class Order : Représentera une commande

   class Order {
    
    constructor(id, productName, image, price, color, quantity,numProd) {
      this.id = id;
      this.productName = productName;
      this.image = image;
      this.price = price;
      this.color = color;
      this.quantity = quantity;
      this.numProd = numProd;
    }
  }


// Store Class : gérer le stockage de la commande

class Store {
  //---------------------Méthode : Récupère et stock les commandes dans localStorage en les transformant en un objet

  static getOrders() {
    let orders;
    if (localStorage.getItem("orders") === null) {
      orders = [];
    } else {
      orders = JSON.parse(localStorage.getItem("orders"));
    }

    return orders;
  }

  //---------------------Méthode : On met à jour la commande si une commande du produit a déjà été passée

  static addOrder(userOrder) {
    const orders = Store.getOrders();
    let prodExist = false;
    // ici je voudrais faire plus compliquer mais c'est pas obligatoire
    // tu peux commenter si tu veux
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

  //---------------------Méthode : Supprimer une commande du localStorage

  static removeOrder(numP) {
    const orders = Store.getOrders();

    orders.forEach((order, index) => {
      if (order.numProd == numP) {
        orders.splice(index, 1);
      }
    });

    localStorage.setItem("orders", JSON.stringify(orders));
  }

  //---------------------Méthode : Indique le nombre de commande dans le panier

  static cartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers");
    console.log(productNumbers);
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
      localStorage.setItem("cartNumbers", productNumbers + 1);
      document.querySelector(".cartNumber span").textContent =
        productNumbers + 1;
    } else {
      localStorage.setItem("cartNumbers", 1);
      document.querySelector(".cartNumber span").textContent = 1;
    }
  }
}


if(list){
   
  CartUI.displayOrders();

  function removeAnOrder(e){
    const numP = e.target.getAttribute('numProd');
    console.log(numP);
    Store.removeOrder(numP);
    window.location.reload();
  }
 
}