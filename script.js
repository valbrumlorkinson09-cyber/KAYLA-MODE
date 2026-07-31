// KAYLA MODE - SCRIPT PRINCIPAL



function ouvriDetay(index){

    let produits = JSON.parse(localStorage.getItem("produits")) || [];

    let produit = produits[index];


    localStorage.setItem(
        "produitChoisi",
        JSON.stringify(produit)
    );


    window.location.href = "product.html";

}







function afficherProduits(){


    const productList = document.getElementById("productList");


    if(!productList){

        return;

    }



    let produits = JSON.parse(localStorage.getItem("produits")) || [];



    productList.innerHTML = "";





    if(produits.length === 0){


        productList.innerHTML = `

        <p>
        🛍️ Pa gen pwodwi pou kounya.
        </p>

        `;

        return;

    }





    produits.forEach(function(produit,index){



        productList.innerHTML += `


        <div class="product">


        <span class="tag">

        ${produit.tag || "Nouvo"}

        </span>




        <img src="${produit.image}" alt="${produit.nom}">





        <h3>

        ${produit.nom}

        </h3>





        <div class="stars">

        ★★★★★

        </div>





        <p>

        📂 ${produit.categorie || "Kategori"}

        </p>





        ${
        produit.ancienPrix 
        ? `<p class="old-price">${produit.ancienPrix}</p>`
        : ""
        }





        <p class="new-price">

        ${produit.prix}

        </p>






        <button onclick="ouvriDetay(${index})">

        👁️ Gade detay

        </button>





        </div>



        `;



    });



}









function searchProduct(){


    const searchBox = document.getElementById("searchBox");


    const rech = searchBox.value.toLowerCase();



    let produits = JSON.parse(localStorage.getItem("produits")) || [];



    const productList = document.getElementById("productList");



    productList.innerHTML = "";






    produits.filter(function(produit){



        return (

            produit.nom.toLowerCase().includes(rech)

        );



    }).forEach(function(produit,index){



        productList.innerHTML += `



        <div class="product">


        <img src="${produit.image}">


        <h3>

        ${produit.nom}

        </h3>


        <p>

        ${produit.prix}

        </p>




        <button onclick="ouvriDetay(${index})">

        👁️ Gade detay

        </button>



        </div>



        `;



    });



}






afficherProduits();
