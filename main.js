const API_URL = "https://api.thecatapi.com/v1/images/search?limit=4";

const FAV_URL = "https://api.thecatapi.com/v1/favourites?api_key=live_vzh90sxxQD4wzv4QNkwFXm46QOiPbShUe5Y6LDQrm0Dopy1WstO9XkjVMML82qcS";

const UPLOAD_URL = "https://api.thecatapi.com/v1/images/upload"

const deleteURL = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=c08d415f-dea7-4a38-bb28-7b2188202e46`;

const API_KEY = "live_vzh90sxxQD4wzv4QNkwFXm46QOiPbShUe5Y6LDQrm0Dopy1WstO9XkjVMML82qcS";

const spanError = document.getElementById("error");




document.addEventListener("DOMContentLoaded", newCat);

async function newCat() {
    const res = await fetch(API_URL);
    const data = await res.json();

    console.log('Random')
    console.log(data)

    if(res.status !== 200){
        spanError.innerText = "Hubo un error en el servidor código de error: " + res.status + data.message;
    }else{
        const img1 = document.getElementById('img1');
        img1.src = data[0].url;
        const img2 = document.getElementById('img2');
        img2.src = data[1].url;
        const img3 = document.getElementById('img3');
        img3.src = data[2].url;
        const img4 = document.getElementById('img4');
        img4.src = data[3].url;

        const plusBtn1 = document.getElementById("plus1");
        const plusBtn2 = document.getElementById("plus2");
        const plusBtn3 = document.getElementById("plus3");
        const plusBtn4 = document.getElementById("plus4");

        plusBtn1.onclick = () => saveFavMichis(data[0].id);
        plusBtn2.onclick = () => saveFavMichis(data[1].id);
        plusBtn3.onclick = () => saveFavMichis(data[2].id);
        plusBtn4.onclick = () => saveFavMichis(data[3].id);
    }
}

async function favCat() {
    const res = await fetch(FAV_URL);
    const data = await res.json();
    console.log('Favoritos')
    console.log(data)
    

    if(res.status !== 200){
        spanError.innerText = "Hubo un error en el servidor código de error: " + res.status + data.message;
    }else{

      
  

        data.forEach(michi => {
            const div = document.getElementById('favoriteMichis');
            
            const article = document.createElement('article');
            article.setAttribute('class', 'michiCard');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            btn.setAttribute('class', 'dlt-btn');
            const btnText = document.createTextNode('x');
            btn.onclick = () => deleteFavorite(michi.id);
            div.appendChild(article);
            
            article.appendChild(img);
            article.appendChild(btn);
            img.src = michi.image.url;
            img.width = 250;
            btn.appendChild(btnText);
            
            
            
          });
    }
}

async function saveFavMichis(id){
    const res = await fetch(FAV_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_id: id
        }),
      });
      const data = await res.json();
    
      console.log('Save')
      console.log(res)
    
      if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
      }

      favCat();
}



async function deleteFavorite(id){
  const res = await fetch(deleteURL(id), {
      method: 'DELETE',
  })

//cuando el estado de la peticion es distinto de 200 utilizo .text(), en caso contrario utilizo .json()
  if(res.status !==200){
      const error = await res.text()
      spanError.innerHTML = "ocurrio un error: " + error
  }else{
      const data = await res.json();
      console.log('delete', data)
      favCat()
  }
}

async function uploadMichi(){
  const form = document.getElementById("uploadingForm")
  const formData = new FormData(form);

  console.log(formData.get("file"))

  const res = await fetch(UPLOAD_URL, {
    method: "POST",
    headers: {
      "X-API-KEY": "live_vzh90sxxQD4wzv4QNkwFXm46QOiPbShUe5Y6LDQrm0Dopy1WstO9XkjVMML82qcS",
    },
    body: formData,
  })

  const data = await res.json()
   if (res.status !== 200){
    spanError.innerHTML = "hubo un error" + res.status + data.message
      }else {
   console.log({data})
   console.log(data.url)
    console.log("gato enviado")}

}




const button = document.getElementById("rn-btn");

saveFavMichis();
favCat ();
newCat();

button.onclick = newCat;
plusBtn1.onclick = saveFavMichis;
plusBtn2.onclick = saveFavMichis;
plusBtn3.onclick = saveFavMichis;
plusBtn4.onclick = saveFavMichis;