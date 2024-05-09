// function promise() {
//   return new Promise((success, fail) => {
//     console.log("Avant le if");
//     // réussir une fois sur deux
//     if (Math.random() > 0.5) {
//       setTimeout(() => {
//         success("Réussite");
//       }, 2000);
//     } else {
//       fail("Échec");
//     }
//     console.log("apres le else");
//   });
// }

// function promise2() {
//   return new Promise((success, fail) => {
//     console.log("Avant le if prom2");
//     // réussir une fois sur deux
//     if (Math.random() > 0.5) {
//       setTimeout(() => {
//         success("Réussite Prom2");
//       }, 4000);
//     } else {
//       fail("Échec");
//     }
//     console.log("apres le else Prom2");
//   });
// }
// // async function getResult() {
// //   const result = await promise2();
// //   console.log(result);
// // }
// // getResult();

// // async function getData() {
// //   console.log("log1 dand getData");
// //   const data = await promise();
// //   console.log("log2 dand getData");
// //   return console.log(data);
// // }
// // getData();

// const promiseConst = new Promise((resolve, reject) => {
//   const vehicule = {
//     marque: "Renault",
//     model: "Clio",
//   };
//   if (true) {
//     setTimeout(() => {
//       resolve(vehicule);
//     }, 2000);
//   } else {
//     reject("Echec");
//   }
// });

// // console.log(await promiseConst);
// // const carRenault = await promiseConst;

// // console.log("Salut la cavalerie");

// // function getBrand(data) {
// //   return data;
// // }
// // const marque = getBrand(carRenault);
// // console.log(marque);
const divPok = document.querySelector("#pokemon");
const reponse = await fetch(
  "https://api-poks-tns-713844542118.herokuapp.com/api/pokemons",
  {
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNTI3NTIwNCwiZXhwIjoxNzE1MzYxNjA0fQ.92rzKKIpoLkoxMvLL5Y7o6hOmf19UcGrMom4-J5tscg",
    },
  }
);
const reponse2 = await reponse.json();
const pokemons = reponse2.data;
console.log(pokemons);
// divPok.innerHTML = pokemons.map((pokemon) => pokemon.name);

pokemons.map((pokemon) => {
  //
  const cardPkm = document.createElement("div");
  cardPkm.classList.add("cardPkm");
  divPok.appendChild(cardPkm);
  //
  const pokName = document.createElement("h1");
  cardPkm.innerText = pokemon.name;
  //
  const imgPkm = document.createElement("img");
  imgPkm.src = pokemon.picture;
  cardPkm.appendChild(imgPkm);
});
