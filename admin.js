// =================================
// KAYLA MODE - ADMIN SYSTEM
// NOUVO VERSION
// PATI 1/3
// =================================


let imageProduit = "";
let editIndex = -1;


// ===============================
// LOGIN ADMIN
// ===============================

function loginAdmin(){

    let password = document.getElementById("adminPassword").value;


    if(password === "KAYLA2026"){

        localStorage.setItem(
            "adminLogin",
            "true"
        );


        document.getElementById("loginBox").style.display="none";

        document.getElementById("adminPanel").style.display="block";


        afficherDashboard();


    }else{

        alert("Modpas la pa bon ❌");

    }

}




function checkLogin(){

    if(localStorage.getItem("adminLogin") === "true"){

        document.getElementById("loginBox").style.display="none";

        document.getElementById("adminPanel").style.display="block";

    }

}





function logoutAdmin(){

    localStorage.removeItem("adminLogin");


    document.getElementById("loginBox").style.display="block";

    document.getElementById("adminPanel").style.display="none";

}






// ===============================
// CHARGE FOTO PWODWI
// ===============================


let photoInput = document.getElementById("photoProduit");

let preview = document.getElementById("previewPhoto");



if(photoInput){


photoInput.addEventListener("change",function(){


    let file = this.files[0];


    if(file){


        let reader = new FileReader();


        reader.onload=function(e){


            imageProduit = e.target.result;


            if(preview){

                preview.src=imageProduit;

            }


        };


        reader.readAsDataURL(file);


    }


});


}







// ===============================
// AJOUTE PWODWI
// ===============================


function ajouterProduit(){


    let nom = document.getElementById("nomProduit").value;

    let pri = document.getElementById("prixProduit").value;

    let ansyen = document.getElementById("ancienPrix").value;

    let kategori = document.getElementById("categorieProduit").value;

    let tag = document.getElementById("tagProduit").value;



    if(
        nom === "" ||
        pri === "" ||
        imageProduit === ""
    ){

        alert("Ranpli tout enfòmasyon yo ❌");

        return;

    }



    let produit = {

        nom: nom,

        prix: pri + " Gdes",

        ancienPrix: ansyen ? ansyen + " Gdes" : "",

        categorie: kategori,

        tag: tag,

        image: imageProduit

    };




    let produits = JSON.parse(
        localStorage.getItem("produits")
    ) || [];



    if(editIndex === -1){

        produits.push(produit);


    }else{


        produits[editIndex] = produit;

        editIndex = -1;

    }




    localStorage.setItem(
        "produits",
        JSON.stringify(produits)
    );



    alert("Pwodwi sove avèk siksè ✅");


    afficherProduits();


    netwayeForm();


              }
// =================================
// KAYLA MODE - ADMIN SYSTEM
// PATI 2/3
// PWODWI MANAGEMENT
// =================================



// ===============================
// NETWAYE FÒM
// ===============================

function netwayeForm(){

    document.getElementById("nomProduit").value="";

    document.getElementById("prixProduit").value="";

    document.getElementById("ancienPrix").value="";


    if(preview){

        preview.src="";

    }


    imageProduit="";

}





// ===============================
// AFFICHE PWODWI
// ===============================


function afficherProduits(){


    let liste = document.getElementById("listeProduits");


    if(!liste){

        return;

    }



    let produits = JSON.parse(
        localStorage.getItem("produits")
    ) || [];



    liste.innerHTML="";



    if(document.getElementById("totalProduits")){

        document.getElementById("totalProduits").innerHTML =
        produits.length;

    }




    if(produits.length === 0){


        liste.innerHTML = `
        <p>
        🛍️ Pa gen pwodwi.
        </p>
        `;


        return;

    }






    produits.forEach(function(produit,index){



        liste.innerHTML += `


        <div class="product-admin">


        <img src="${produit.image}" width="120">



        <h3>
        ${produit.tag || "Nouvo"} ${produit.nom}
        </h3>



        <p>
        ${produit.ancienPrix ? produit.ancienPrix+" ➜ " : ""}
        ${produit.prix}
        </p>



        <p>
        📂 ${produit.categorie}
        </p>



        <button onclick="modifierProduit(${index})">
        ✏️ Modifye
        </button>



        <button onclick="supprimerProduit(${index})">
        🗑️ Efase
        </button>



        </div>


        `;



    });


}








// ===============================
// MODIFYE PWODWI
// ===============================


function modifierProduit(index){


    let produits = JSON.parse(
        localStorage.getItem("produits")
    ) || [];



    let produit = produits[index];



    document.getElementById("nomProduit").value =
    produit.nom;



    document.getElementById("prixProduit").value =
    produit.prix.replace(" Gdes","");



    document.getElementById("ancienPrix").value =
    produit.ancienPrix
    ?
    produit.ancienPrix.replace(" Gdes","")
    :
    "";



    document.getElementById("categorieProduit").value =
    produit.categorie;



    document.getElementById("tagProduit").value =
    produit.tag;



    imageProduit = produit.image;



    if(preview){

        preview.src = produit.image;

    }



    editIndex = index;


}








// ===============================
// EFASE PWODWI
// ===============================


function supprimerProduit(index){


    let produits = JSON.parse(
        localStorage.getItem("produits")
    ) || [];



    if(confirm("Efase pwodwi sa?")){


        produits.splice(index,1);



        localStorage.setItem(
            "produits",
            JSON.stringify(produits)
        );



        afficherProduits();


    }


}








// ===============================
// RECHÈCH PWODWI
// ===============================


function rechercherProduit(){


    let rech =
    document.getElementById("searchAdmin").value.toLowerCase();



    let produits = JSON.parse(
        localStorage.getItem("produits")
    ) || [];



    let rezilta = produits.filter(function(item){


        return item.nom.toLowerCase().includes(rech);


    });




    let liste = document.getElementById("listeProduits");



    liste.innerHTML="";




    rezilta.forEach(function(produit){



        liste.innerHTML += `


        <div class="product-admin">


        <img src="${produit.image}" width="120">


        <h3>
        ${produit.nom}
        </h3>


        <p>
        ${produit.prix}
        </p>


        </div>


        `;


    });



    }
// =================================
// KAYLA MODE - ADMIN SYSTEM
// PATI 3/3
// KÒMANN + DASHBOARD + START
// =================================



// ===============================
// AFFICHE KÒMANN
// ===============================

function afficherKommann(){


    let liste = document.getElementById("listeKommann");


    if(!liste){

        return;

    }



    let kommann = JSON.parse(
        localStorage.getItem("kommann")
    ) || [];



    liste.innerHTML="";



    if(document.getElementById("totalKommann")){

        document.getElementById("totalKommann").innerHTML =
        kommann.length;

    }




    if(kommann.length === 0){


        liste.innerHTML = `
        <p>
        📦 Pa gen kòmann.
        </p>
        `;


        return;

    }





    kommann.forEach(function(item,index){


        liste.innerHTML += `


        <div class="product-admin">


        <h3>
        🛍️ ${item.produit}
        </h3>



        <p>
        💰 ${item.pri}
        </p>



        <p>
        📦 Kantite: ${item.kantite}
        </p>



        <p>
        👤 ${item.non || "Pa bay"}
        </p>



        <p>
        📞 ${item.telephone || "Pa bay"}
        </p>



        <p>
        📍 ${item.adresse || "Pa bay"}
        </p>



        <p>
        💳 ${item.peman || "Pa bay"}
        </p>



        <h3>
        📌 ${item.status || "An atant"}
        </h3>




        <button onclick="livreKomann(${index})">
        ✅ Livre
        </button>



        <button onclick="efaseKomann(${index})">
        🗑️ Efase
        </button>



        </div>


        `;


    });



}







// ===============================
// LIVRE KÒMANN
// ===============================


function livreKomann(index){


    let kommann = JSON.parse(
        localStorage.getItem("kommann")
    ) || [];



    kommann[index].status = "Livre ✅";



    localStorage.setItem(
        "kommann",
        JSON.stringify(kommann)
    );



    afficherKommann();


}







// ===============================
// EFASE KÒMANN
// ===============================


function efaseKomann(index){


    let kommann = JSON.parse(
        localStorage.getItem("kommann")
    ) || [];



    kommann.splice(index,1);



    localStorage.setItem(
        "kommann",
        JSON.stringify(kommann)
    );



    afficherKommann();


}







// ===============================
// DASHBOARD
// ===============================


function afficherDashboard(){


    let produits = JSON.parse(
        localStorage.getItem("produits")
    ) || [];



    let kommann = JSON.parse(
        localStorage.getItem("kommann")
    ) || [];



    let total = 0;

    let kliyan = [];



   
