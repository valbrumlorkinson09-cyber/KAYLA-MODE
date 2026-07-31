// KAYLA MODE - SCRIPT PRINCIPAL


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







    produits.forEach(function(produit){



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






            <a href="https://wa.me/50955545291" class="buy">

            Achte

            </a>




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

            produit.nom.toLowerCase().includes(rech) ||

            produit.categorie.toLowerCase().includes(rech) ||

            produit.tag.toLowerCase().includes(rech)

        );



    }).forEach(function(produit){



        productList.innerHTML += `



        <div class="product">


        <span class="tag">

        ${produit.tag || "Nouvo"}

        </span>



        <img src="${produit.image}">



        <h3>

        ${produit.nom}

        </h3>



        <p>

        📂 ${produit.categorie}

        </p>




        <div class="stars">

        ★★★★★

        </div>




        ${
        produit.ancienPrix 
        ? `<p class="old-price">${produit.ancienPrix}</p>`
        : ""
        }



        <p class="new-price">

        ${produit.prix}

        </p>




        <a href="https://wa.me/50955545291" class="buy">

        Achte

        </a>




        </div>



        `;



    });



}






afficherProduits();
