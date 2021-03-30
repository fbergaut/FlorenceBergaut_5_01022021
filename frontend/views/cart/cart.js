// // On crée une variable "params" qui va nous permettre de stocker l'url des pages produits et on récupère l'_id dans la variable "id".
// let params = new URL(document.location).searchParams;
// let id = params.get("id");
// console.log(id);

// // On se connecte à l'API et on récupère tous les teddies de la base + l'_id de chaque teddy.
// async function getTeddy() {
//   let rep = await fetch("http://localhost:3000/api/teddies/" + id, {
//     method: "GET",
//   });
//   let reponse = await rep.json();
//   return reponse;
// }

// getTeddy()
// .then(teddy => {
//     console.log(teddy);
//     // const order = new Order(teddy._id, teddy.colors, teddy.quantity, teddy.price);
// }) 

// On crée une variable "oneOrder" qui stockera le code html à afficher
let oneOrder = "";

// Création d'une Class Order : Représentera une commande

    class Order {
      constructor(id, name, image, color, quantity, price) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.color = color;
        this.quantity = quantity;
        this.price = price;
      }
    }

// Création d'une Class UI : gérer les taches de l'UI

class UI {
  static displayOrder() {
    // const orders = Store.getOrders();

    const StoredOrders = [
      {
        id: "21568746823",
        name: "Zoe",
        image: "http://localhost:3000/images/teddy_1.jpg",
        color: "black",
        quantity: "1",
        price: "30",
      },
      {
        id: "56894123486",
        name: "Edouard",
        image: "http://localhost:3000/images/teddy_2.jpg",
        color: "blue",
        quantity: "1",
        price: "19",
      },
    ];
    
    const orders = StoredOrders;

    orders.forEach((order) => UI.addOrderToList(order));
  }

  static addOrderToList(order) {
    const list = document.querySelector(".productCartWrapper");

    oneOrder += `<div class="productWrapper">
                    <div class="imgCartWrapper">
                        <a href="#">
                            <img class="imgCart" src="${order.image}" alt="${order.name}">
                        </a>
                    </div>
                    <div class="infoCartWrapper">
                        <div class="firstLineCart">
                            <div class="productName">
                                <a class="productName_link" href="#">
                                    <h3 class="productName_heading">${order.name}</h3>
                                </a>
                                <p class="productName_color">Couleur: ${order.color}</p>
                            </div>
                            <div class="quantityWrapper">
                                <select class="productQuantityCart" aria-label="Default select example">
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
                                <button type="button" class="deleteCartBtn">Supprimer</button>
                                <span>|</span>
                                <button type="button" class="moveCartBtn">Déplacer vers mes favoris</button>
                            </div>
                            <div class="cartPrice">
                                <p>${order.price} €</p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="strokeBlack">`;
    list.innerHTML = oneOrder;
  }

  static deleteOrder(el) {
    if (el.classList.contains("deleteCartBtn")) {
      el.parentElement.parentElement.parentElement.parentElement.remove();
    }
  }
}

UI.displayOrder();

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

      static removeOrder(id) {
        const orders = Store.getOrders();

        orders.forEach((order, index) => {
          if (order.id === id) {
            order.splice(index, 1);
          }
        });

        localStorage.setItem("orders", JSON.stringify(orders));
      }
    }


// Event: Afficher les commandes
    document.addEventListener('DOMContentLoaded', UI.displayOrders);

// Event: Supprimer une commande
    document.querySelector(".productWrapper").addEventListener('click', (e) => {
        UI.deleteOrder(e.target);
    });



