const countryLinks = document.querySelectorAll(".country__link");
const countryDescriptionItems = document.querySelectorAll(".country-description__item");
const countryDescriptionCards = document.querySelectorAll(".country-description__card");


for (let i = 0; i < countryLinks.length; i++) {

  countryLinks[i].addEventListener("click", function() {

    let activeTab = countryLinks[i].getAttribute("data-tab");
    console.log(activeTab)

    for (let j = 0; j < countryDescriptionCards.length; j++) {

      let activeContent = countryDescriptionCards[j].getAttribute("data-tab-conten");

      console.log(activeContent)

      if (activeTab === activeContent) {
              countryDescriptionCards[j].classList.add("country-description__card--active");
      } else {
        
        countryDescriptionCards[j].classList.remove("country-description__card--active");
      }
    }
  })
}


for (let i = 0; i < countryDescriptionItems.length; i++) {

  countryDescriptionItems[i].addEventListener("click", function(e) {
    e.preventDefault();

    let activeTab = countryDescriptionItems[i].getAttribute("data-tab-name");
    console.log(activeTab)

    for (let j = 0; j < countryDescriptionCards.length; j++) {

      let activeContent = countryDescriptionCards[j].getAttribute("data-tab-conten");

      console.log(activeContent)

      if (activeTab === activeContent) {
        countryDescriptionItems[j].classList.add("country-description__item--active");
        countryDescriptionCards[j].classList.add("country-description__card--active");
      } else {
        countryDescriptionItems[j].classList.remove("country-description__item--active");
        countryDescriptionCards[j].classList.remove("country-description__card--active");
      }
    }
  })
}
