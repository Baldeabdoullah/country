// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)

//test
// 2 - Créer une fonction pour "fetcher" les données, afficher les données dans la console.
const rangeValue = document.querySelector("#rangeValue");
const inputRange = document.querySelector("#inputRange");

const countriesContainer = document.querySelector(".countries-container");
const inputSearch = document.querySelector("#inputSearch");

const btnSort = document.querySelectorAll(".btnSort");
console.log(btnSort);

let countries = [];

let sortMethod = "alpha";
async function fetchData() {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
      // 3 - Passer les données à une variable
      console.log(data);
      countries = data;
    });

  console.log(countries);
  countriesDisplay();
}

// 4 - Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP
// function countriesDisplay() {
//   if (countries === null) {
//     countriesContainer.innerHTML = "<h2> aucun resultat </h2>";
//   } else {
//     countriesContainer.innerHTML = countries
//       .map((country) => {
//         let names = [];
//         let capitals = [];
//         let flags = [];
//         let populations = [];
//         for (i = 1; i < 250; i++) {
//           if (country[`${i}`]) {
//             names = country[`${i}`].altSpellings[1];
//             capitals = country[`${i}`].capital[0];
//             flags = country[`${i}`].coatOfArms.png;
//             populations = country[`${i}`].population;

//             console.log(names);
//           }
//         }

//         return `
//       <div class="card">

//       <img src=${flags}>
//       <h2> ${names} </h2>

//        <h3> ${capitals} </h3>
//         <p> ${populations} </p>

//       </div>
//       `;
//       })
//       .join("");
//   }
// }

function countriesDisplay() {
  countriesContainer.innerHTML = countries
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    )
    .sort((a, b) => {
      if (sortMethod === "maxToMin") {
        return b.population - a.population;
      } else if (sortMethod === "minToMax") {
        return a.population - b.population;
      } else if (sortMethod === "alpha") {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      }
    })
    .slice(0, inputRange.value)
    .map(
      (country) =>
        `
    <div class="card">
    <img src=${country.flags.svg} alt= " drapeau ${
          country.translations.fra.common
        }" >
    <h2> ${country.translations.fra.common}</h2>
    <h4> ${country.capital} </h4>
    <p> Population: ${country.population.toLocaleString()} </p>
    </div>
    `
    )
    .join("");
}

window.addEventListener("load", fetchData);

inputSearch.addEventListener("input", countriesDisplay);

inputRange.addEventListener("input", () => {
  countriesDisplay();
  rangeValue.textContent = inputRange.value;
});

// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données
// coutry.name.includes(inputSearch.value);

// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays

btnSort.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sortMethod = e.target.id;
    countriesDisplay();
  });
});
