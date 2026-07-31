// KAYLA MODE - ADMIN SYSTEM


let imageProduit = "";

let editIndex = -1;



// LOGIN

function loginAdmin(){

    const password = document.getElementById("adminPassword").value;


    if(password === "KAYLA2026"){

        localStorage.setItem("adminLogin","true");

        document.getElementById("loginBox").style.display="none";

        document.getElementById("adminPanel").style.display="block";

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








// PHOTO PRODUIT


const photoProduit = document.getElementById("photoProduit");

const previewPhoto = document.getElementById("previewPhoto");



if(photoProduit){

photoProduit.addEventListener("change",function(){

    const file=this.files[0];


    if(file){

        imageProduit = URL.createObjectURL(file);

        previewPhoto.src=imageProduit;

    }

});

}









// AJOUTE / MODIFYE PRODUIT


function ajouterProduit(){


const nom = document.getElementById("nomProduit").value;

const prix = document.getElementById("prixProduit").value;

const ancienPrix = document.getElementById("ancienPrix").value;

const categorie = document.getElementById("categorieProduit").value;

const tag = document.getElementById("tagProduit").value;




if(nom==="" || prix==="" || imageProduit===""){

alert("Ranpli tout enfòmasyon yo ❌");

return;

}





let produit = {


nom:nom,

prix:prix+" Gdes",

ancienPrix:ancienPrix ? ancienPrix+" Gdes" : "",

categorie:categorie,

tag:tag,

image:imageProduit


};





let produits = JSON.parse(localStorage.getItem("produits")) || [];




if(editIndex === -1){

    produits.push(produit);

}else{

    produits[editIndex]=produit;

    editIndex=-1;

}





localStorage.setItem(
"produits",
JSON.stringify(produits)
);



afficherProduits();



netwayeForm();

}









function netwayeForm(){


document.getElementById("nomProduit").value="";

document.getElementById("prixProduit").value="";

document.getElementById("ancienPrix").value="";

previewPhoto.src="";

imageProduit="";

}









// AFFICHAGE PRODUITS


function afficherProduits(){


const liste=document.getElementById("listeProduits");


if(!liste){

return;

}



let produits = JSON.parse(localStorage.getItem("produits")) || [];



if(document.getElementById("totalProduits")){

document.getElementById("totalProduits").innerHTML=produits.length;

}



liste.innerHTML="<h2>🛍️ Pwodwi yo</h2>";




produits.forEach(function(produit,index){



liste.innerHTML += `


<div class="product-admin">


<img src="${produit.image}" width="120">


<h3>${produit.tag} ${produit.nom}</h3>


<p>

${produit.ancienPrix ? produit.ancienPrix+" ➜ " : ""}

${produit.prix}

</p>


<p>📂 ${produit.categorie}</p>




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









function modifierProduit(index){


let produits = JSON.parse(localStorage.getItem("produits")) || [];


let produit = produits[index];



document.getElementById("nomProduit").value=produit.nom;

document.getElementById("prixProduit").value=produit.prix.replace(" Gdes","");

document.getElementById("ancienPrix").value=produit.ancienPrix.replace(" Gdes","");

document.getElementById("categorieProduit").value=produit.categorie;

document.getElementById("tagProduit").value=produit.tag;



imageProduit=produit.image;

previewPhoto.src=produit.image;



editIndex=index;


}








function supprimerProduit(index){


let produits = JSON.parse(localStorage.getItem("produits")) || [];


produits.splice(index,1);



localStorage.setItem(
"produits",
JSON.stringify(produits)
);



afficherProduits();


}









// CHERCHE PRODUIT


function rechercherProduit(){


let rech=document.getElementById("searchAdmin").value.toLowerCase();


let produits=JSON.parse(localStorage.getItem("produits")) || [];



let rezilta = produits.filter(function(p){


return p.nom.toLowerCase().includes(rech);


});



const liste=document.getElementById("listeProduits");


liste.innerHTML="<h2>🔍 Rezilta</h2>";



rezilta.forEach(function(p){


liste.innerHTML += `


<div class="product-admin">


<h3>${p.nom}</h3>

<p>${p.prix}</p>


</div>


`;


});


}









// SYSTEM KÒMANN


function afficherKomann(){


const liste=document.getElementById("listeKomann");


if(!liste){

return;

}



let komann = JSON.parse(localStorage.getItem("komann")) || [];



if(document.getElementById("totalKomann")){

document.getElementById("totalKomann").innerHTML=komann.length;

}




liste.innerHTML="<h2>📦 Kòmann kliyan yo</h2>";



if(komann.length===0){

liste.innerHTML += "<p>Pa gen kòmann.</p>";

return;

}




komann.forEach(function(k,index){


liste.innerHTML += `


<div class="product-admin">


<h3>🛍️ ${k.produit}</h3>


<p>💰 ${k.pri}</p>

<p>
📍 Adrès: ${item.adresse || "Pa bay"}
</p>


<p>
💳 Peman: ${item.peman || "Pa chwazi"}
</p>
<p>📦 Kantite: ${k.kantite}</p>


<p>👤 ${k.kliyan}</p>


<p>📞 ${k.telefon}</p>


<p>📅 ${k.dat}</p>



<button onclick="efaseKomann(${index})">

🗑️ Efase

</button>



</div>


`;


});


}







function efaseKomann(index){


let komann = JSON.parse(localStorage.getItem("komann")) || [];


komann.splice(index,1);



localStorage.setItem(
"komann",
JSON.stringify(komann)
);



afficherKomann();


}







checkLogin();

afficherProduits();

afficherKomann();
afficherKommann();
afficherDashboard();
// ===============================
// DASHBOARD STATISTIK
// ===============================


function afficherDashboard(){


    let produits = JSON.parse(

        localStorage.getItem("produits")

    ) || [];



    let kommann = JSON.parse(

        localStorage.getItem("kommann")

    ) || [];





    let totalProduits = document.getElementById("totalProduits");

    let totalKommann = document.getElementById("totalKommann");

    let totalVant = document.getElementById("totalVant");

    let totalKliyan = document.getElementById("totalKliyan");





    if(totalProduits){

        totalProduits.innerHTML = produits.length;

    }





    if(totalKommann){

        totalKommann.innerHTML = kommann.length;

    }





    let lajan = 0;



    kommann.forEach(function(item){



        let pri = parseInt(

            item.pri.replace(/\D/g,'')

        );



        let kantite = Number(item.kantite);



        lajan += pri * kantite;



    });





    if(totalVant){

        totalVant.innerHTML = lajan + " Gdes";

    }






    let kliyan = [];



    kommann.forEach(function(item){


        if(!kliyan.includes(item.telefòn)){


            kliyan.push(item.telefòn);


        }


    });





    if(totalKliyan){


        totalKliyan.innerHTML = kliyan.length;


    }



        }
