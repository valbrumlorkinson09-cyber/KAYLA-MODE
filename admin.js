// =================================
// KAYLA MODE ADMIN
// APPWRITE VERSION
// PATI 1/3
// =================================


// ================================
// APPWRITE CONFIG
// ================================


const {
    Client,
    Databases,
    Storage,
    ID,
    Query
} = Appwrite;



const client = new Client();


client
.setEndpoint(
"https://fra.cloud.appwrite.io/v1"
)
.setProject(
"6a7128570039e2aca907"
);



const databases = new Databases(client);

const storage = new Storage(client);




// ================================
// DATABASE INFO
// ================================


const DATABASE_ID =
"6a7128c7002e61a9b790";


const TABLE_ID =
"6a738074001c390f0373";


const BUCKET_ID =
"6a717118002542ff6ac8";




// ================================
// VARIABLES
// ================================


let imageProduit = "";

let fileImage = null;

let editID = null;





// ================================
// LOGIN ADMIN
// ================================


function loginAdmin(){


let password =
document.getElementById(
"adminPassword"
).value;



if(password === "KAYLA2026"){


localStorage.setItem(
"adminLogin",
"true"
);



document.getElementById(
"loginBox"
).style.display="none";



document.getElementById(
"adminPanel"
).style.display="block";



afficherDashboard();



}else{


alert(
"Modpas la pa bon ❌"
);


}



}





function checkLogin(){


if(
localStorage.getItem(
"adminLogin"
)==="true"
){


document.getElementById(
"loginBox"
).style.display="none";


document.getElementById(
"adminPanel"
).style.display="block";


}



}






function logoutAdmin(){


localStorage.removeItem(
"adminLogin"
);



document.getElementById(
"loginBox"
).style.display="block";



document.getElementById(
"adminPanel"
).style.display="none";



}






// ================================
// PHOTO UPLOAD
// ================================


let photoInput =
document.getElementById(
"photoProduit"
);


let preview =
document.getElementById(
"previewPhoto"
);





if(photoInput){


photoInput.addEventListener(
"change",
function(){



fileImage =
this.files[0];



if(fileImage){


let reader =
new FileReader();



reader.onload =
function(e){


imageProduit =
e.target.result;



if(preview){

preview.src =
imageProduit;

}


}



reader.readAsDataURL(
fileImage
);



}



}

);



}
// =================================
// PATI 2/3
// AJOUTE + AFFICHE PWODWI APPWRITE
// =================================


// ================================
// AJOUTE PWODWI
// ================================


async function ajouterProduit(){


let nom =
document.getElementById(
"nomProduit"
).value;



let pri =
document.getElementById(
"prixProduit"
).value;



let stock =
document.getElementById(
"stockProduit"
).value;



let ansyen =
document.getElementById(
"ancienPrix"
).value;



let kategori =
document.getElementById(
"categorieProduit"
).value;



let tag =
document.getElementById(
"tagProduit"
).value;




if(
nom === "" ||
pri === "" ||
!fileImage
){


alert(
"Ranpli tout enfòmasyon yo ❌"
);


return;


}




try{



// UPLOAD FOTO APPWRITE


let upload =
await storage.createFile(

BUCKET_ID,

ID.unique(),

fileImage

);




let imageURL =
storage.getFileView(

BUCKET_ID,

upload.$id

);






// SAVE PWODWI DATABASE


await databases.createDocument(

DATABASE_ID,

TABLE_ID,

ID.unique(),

{


name:
nom,


price:
Number(pri),


stock:
Number(stock)||0,


image:
imageURL.href,


ancienPrix:
ansyen,


categorie:
kategori,


tag:
tag



}



);





alert(
"Pwodwi ajoute avèk siksè ✅"
);



netwayeForm();



afficherProduits();



}catch(error){



console.log(error);


alert(
"Erè pandan ajoute pwodwi ❌"
);



}



}







// ================================
// NETWAYE FORM
// ================================


function netwayeForm(){



document.getElementById(
"nomProduit"
).value="";



document.getElementById(
"prixProduit"
).value="";



document.getElementById(
"stockProduit"
).value="";



document.getElementById(
"ancienPrix"
).value="";




if(preview){

preview.src="";

}



fileImage=null;

imageProduit="";



}






// ================================
// AFFICHE PWODWI
// ================================


async function afficherProduits(){



let liste =
document.getElementById(
"listeProduits"
);



if(!liste){

return;

}




liste.innerHTML =
"⏳ Chajman pwodwi...";




try{



let result =
await databases.listDocuments(

DATABASE_ID,

TABLE_ID

);





liste.innerHTML="";






if(
result.documents.length === 0
){


liste.innerHTML =
"<p>🛍️ Pa gen pwodwi.</p>";

return;


}






document.getElementById(
"totalProduits"
).innerHTML =
result.total;







result.documents.forEach(
function(produit){



liste.innerHTML += `



<div class="product-admin">



<img 
src="${produit.image}"
width="120"
>



<h3>

${produit.tag || "Nouvo"}
${produit.name}

</h3>



<p>
💰 ${produit.price} Gdes
</p>



<p>
📂 ${produit.categorie}
</p>



<p>
📦 Stock: ${produit.stock}
</p>




<button onclick="supprimerProduit('${produit.$id}')">

🗑️ Efase

</button>



</div>



`;



});





}catch(error){



console.log(error);


liste.innerHTML =
"❌ Erè chajman pwodwi";


}



    }
// =================================
// PATI 3/3
// EFASE + DASHBOARD + START
// =================================


// ================================
// EFASE PWODWI
// ================================


async function supprimerProduit(id){


if(
confirm("Efase pwodwi sa?") 
){


try{


await databases.deleteDocument(

DATABASE_ID,

TABLE_ID,

id

);



alert(
"Pwodwi efase ✅"
);



afficherProduits();



}catch(error){



console.log(error);


alert(
"Erè pandan efase ❌"
);



}



}



}







// ================================
// RECHÈCH PWODWI
// ================================


async function rechercherProduit(){


let rech =
document.getElementById(
"searchAdmin"
).value.toLowerCase();




let liste =
document.getElementById(
"listeProduits"
);




try{


let result =
await databases.listDocuments(

DATABASE_ID,

TABLE_ID,

[

Query.search(
"name",
rech
)

]

);





liste.innerHTML="";





result.documents.forEach(
function(produit){



liste.innerHTML += `


<div class="product-admin">


<img 
src="${produit.image}"
width="120"
>


<h3>
${produit.name}
</h3>


<p>
💰 ${produit.price} Gdes
</p>



</div>



`;



});



}catch(error){


console.log(error);



}



}







// ================================
// DASHBOARD
// ================================


async function afficherDashboard(){



try{



let produits =
await databases.listDocuments(

DATABASE_ID,

TABLE_ID

);




if(
document.getElementById(
"totalProduits"
)
){


document.getElementById(
"totalProduits"
).innerHTML =
produits.total;


}




}catch(error){


console.log(error);



}



}








// ================================
// DEMARAJ ADMIN
// ================================


document.addEventListener(

"DOMContentLoaded",

function(){



checkLogin();



afficherProduits();



afficherDashboard();



}

);
