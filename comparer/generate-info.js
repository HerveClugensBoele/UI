
// The logic that loads the JSON in local memory
let jsonData;
fetch('../parti-infos.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        jsonData = data;
        generateCategories();
    });


const selectedPartiLeft = 'N.P.D.';
const selectedPartiRight = 'P.V.C.';
// Generate the the content for the given Parti
function generateCategories() {
    generateCategoriesHeader();
    generateCategoriesPar();
}

// Generates a single categories header (called only in generateCategoriesHeader())
function generateCategoriesHeaderWith(elementId, title) {

    // <span>[TITLE GOES HERE]</span>
    const spanElement = document.createElement('span');
    spanElement.textContent = title;

    $('#' + elementId).prepend(spanElement);
}

// Generate the selectedParti Header (displays above categories)
function generateCategoriesHeader() {
    generateCategoriesHeaderWith('caties-head-left', selectedPartiLeft);
    generateCategoriesHeaderWith('caties-head-right', selectedPartiRight);
}

// Generate the category title and the category data
function generateCategoriesPar() {
    // TODO HAVE FUN :)
}
