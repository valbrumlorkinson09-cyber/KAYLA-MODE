// KAYLA MODE - Chaje pwodwi yo

function afficherProduits(){

    const productList = document.getElementById("productList");

    if(!productList){
        return;
    }


    let produits = JSON.parse(localStorage.getItem("produits")) || [];


    productList.innerHTML = "";


    produits.forEach(function(produit){


        productList.innerHTML += `

        <div class="product">

            <img src="${produit.image}" alt="${produit.nom}">

            <h3>${produit.nom}</h3>

            <div class="stars">
            ★★★★★
            </div>

            <p>${produit.prix}</p>


            <a href="https://wa.me/50955545291" class="buy">
            Achte
            </a>

        </div>

        `;


    });

}



afficherProduits();
