
// The logic that loads the JSON in local memory
let jsonData;
fetch('https://api.myjson.com/bins/twdog')
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        jsonData = data;
        generateCategories();
    });

function getSelectedParty(){
    let party = document.location.search.replace(/^.*?\=/,"");
    return party;
}

const selectedParti = getSelectedParty();
// Generate the the content for the given Parti
function generateCategories() {
    generateCategoriesHeader();
    generateCategoriesPar();
}

// Generate the selectedParti Header (displays above categories)
function generateCategoriesHeader() {

    // <span>[TITLE GOES HERE]</span>
    const spanElement = document.createElement('span');
    spanElement.textContent = selectedParti;

    $('#categories-header').prepend(spanElement);
}

// Generate the category title and the category data
function generateCategoriesPar() {

    // Generate HTML for 'Categories'
    for (const category of jsonData[selectedParti]) {

        // <span>[CATEGORY TITLE GOES HERE]</span>
        const spanElement = document.createElement('span');
        spanElement.textContent = category['title'];

        // <i class="material-icons" onclick="toggleStar(this)">star_border</i>
        const iconElement = document.createElement('i');
        iconElement.classList.add('material-icons');
        iconElement.onclick = function () {
            if (this.classList.contains('selected')){
                this.classList.remove('selected')
            } else {
                this.classList.add('selected');
            }
        };
        iconElement.textContent = 'star_border';

        // <article class="category-header"></article>
        const categoryHeaderElement = document.createElement('article');
        categoryHeaderElement.classList.add('category-header');
        categoryHeaderElement.appendChild(spanElement);
        categoryHeaderElement.appendChild(iconElement);

        // <p>[CATEGORY INFO GOES HERE]</p>
        const pElement = document.createElement('p');
        pElement.textContent = category['text'];

        // <article class="category-paragraph"></article>
        const categoryParagraphElement = document.createElement('article');
        categoryParagraphElement.classList.add('category-paragraph');
        categoryParagraphElement.appendChild(pElement);

        // <section></section>
        const sectionElement = document.createElement('section');
        sectionElement.appendChild(categoryHeaderElement);
        sectionElement.appendChild(categoryParagraphElement);

        $('#scrollable').append(sectionElement);
    }
}
