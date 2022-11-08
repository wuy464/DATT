// const url = "https://635541bdda523ceadcfdc1e3.mockapi.io/api/v1/datamusic";
// const singerList = document.querySelector(".c-curation__list");
// function renderSingerItem(item) {
//     const singer = `<li class="c-curation__item">
//     <div class="c-curation__img">
//       <img src="https://i1.sndcdn.com/avatars-000202649537-6368nw-t250x250.jpg" alt="">
//     </div>
//     <span class="c-curation__tooltip">${item.author}</span>
//   </li> `
//   singerList.insertAdjacentHTML("beforeend", singer)

// }
// //getData
// async function getData(link = url) {
//     const res = await fetch(link);
//     const data = await res.json();
//     console.log(data);

//     singerList.innerHTML = ""; 
   
//     data.forEach(item => {
//         if(item.author.includes('Alan Walker') ) {
           
           
//             renderSingerItem(item)
//         }
      
      
        
//     });
    
// }
// getData()