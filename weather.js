// // 01c5f08129a6474d9b865906262707


// fetch(`https://api.weatherapi.com/v1/current.json?key=${"01c5f08129a6474d9b865906262707"}&q=${"jammu"}&aqi=no`)

// .then(function(raw){
//     if(!raw.ok){
//         throw new error("failed");
//     }
//     return raw.json();
// })
// .then(function(data){
//     console.log(data);
// }).catch(function(error){
//     console.log(error);
// })

let form=document.querySelector("#form");
let search =document.querySelector("#search");
let city=document.querySelector("#city");
search.addEventListener("click",function(e){


e.stopPropagation();
  form.classList.toggle("open");

})
document.querySelector("body").addEventListener("click",function(e){
    if(!form.contains(e.target) && e.target!==search && form.classList.contains("open")){
        form.classList.toggle("open")
    }
})

form.addEventListener("submit",function(dets){
    dets.preventDefault();
    console.log(city.value);
    fetch(`https://api.weatherapi.com/v1/current.json?key=${"01c5f08129a6474d9b865906262707"}&q=${city.value}&aqi=no`)
    .then(function(raw){
        if(!raw.ok){
            throw new error("fuck off");
        }
        return raw.json();
    })
    .then((data)=>{
        console.log(data);
        
    })
    .catch((error)=>{
        
    })
})