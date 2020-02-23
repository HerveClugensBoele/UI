
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


const selectedPartiLeft = 'P.L.C';
const selectedPartiRight = 'P.V.C.';
// Generate the the content for the given Parti
function generateCategories() {
    generateCategoriesHeader();
    generateCategoriesPar();
}

// Generates a single categories header (called only in generateCategoriesHeader())
function generateCategoriesHeaderWith(elementId, title) {
    const section = document.getElementById(elementId);

    // <span>[TITLE GOES HERE]</span>
    const spanElement = document.createElement('span');
    spanElement.textContent = title;

    section.insertBefore(spanElement, section.firstElementChild);
}

// Generate the selectedParti Header (displays above categories)
function generateCategoriesHeader() {
    generateCategoriesHeaderWith('caties-head-left', selectedPartiLeft);
    generateCategoriesHeaderWith('caties-head-right', selectedPartiRight);
}

function generateCategoryHeader(article ,categoryName){

    const spanCatyName =  document.createElement('span');
    spanCatyName.textContent = categoryName;

    const star_icon = document.createElement('i');
    star_icon.classList.add('material-icons');
    star_icon.onclick = function () {
        if (this.classList.contains('selected')){
            this.classList.remove('selected')
        } else {
            this.classList.add('selected');
        }
    };
    star_icon.textContent = 'star_border';


    article.classList.add('category-header');
    article.appendChild(spanCatyName);
    article.appendChild(star_icon);

}

function uniteWithSeparator(pairContainingDiv, leftDiv, rightDiv)
{
    let separator = document.createElement('div');
    separator.classList.add('divides');
    pairContainingDiv.appendChild(leftDiv);
    pairContainingDiv.appendChild(separator);
    pairContainingDiv.appendChild(rightDiv);
}

function generateCategoryHeaderPair(pairContainingDiv ,categoryName)
{
    const leftHeader = document.createElement('article');
    leftHeader.classList.add('left');
    generateCategoryHeader(leftHeader, categoryName);

    const rightHeader = document.createElement('article');
    rightHeader.classList.add('right');
    generateCategoryHeader(rightHeader, categoryName)

    pairContainingDiv.classList.add('category-header-wrapper');
    pairContainingDiv.classList.add('splits');

    uniteWithSeparator(pairContainingDiv,leftHeader,rightHeader);

}

function generateCategoryParagraph(article, paragraph)
{
    article.classList.add('category-paragraph');
    article.textContent=paragraph;
}

function generateCategoryParagraphPair(pairContainingDiv,jsonCategoryIndex)
{
    const leftParagraph = document.createElement('article');
    leftParagraph.classList.add('left');
    let leftParagraphText = jsonData[selectedPartiLeft][jsonCategoryIndex]['text'];
    generateCategoryParagraph(leftParagraph,leftParagraphText)

    const rightParagraph = document.createElement('article');
    rightParagraph.classList.add('right');
    let rightParagraphText = jsonData[selectedPartiRight][jsonCategoryIndex]['text'];
    generateCategoryParagraph(rightParagraph,rightParagraphText);

    pairContainingDiv.classList.add('category-paragraph-wrapper')
    pairContainingDiv.classList.add('splits')

    uniteWithSeparator(pairContainingDiv,leftParagraph,rightParagraph);
}



// Generate the category title and the category data
function generateCategoriesPar() {
    // TODO HAVE FUN :)
    let jsonCategoryIndex = 0;

    let categoryAndParagraphWrapper = document.getElementById("category_and_paragraph_wrapper");

    let debugVar = jsonData[selectedPartiLeft];

    for(const category of jsonData[selectedPartiLeft])
    {
        let categoryHeaderPair = document.createElement('div');
        generateCategoryHeaderPair(categoryHeaderPair,category['title']);

        let categoryParagraphPair = document.createElement('div');
        generateCategoryParagraphPair(categoryParagraphPair,jsonCategoryIndex);

        categoryAndParagraphWrapper.appendChild(categoryHeaderPair);
        categoryAndParagraphWrapper.appendChild(categoryParagraphPair);

        jsonCategoryIndex ++;
    }

}



















