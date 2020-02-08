// The logic that loads the JSON in local memory
loadingData = true;
let jsonData;
fetch('https://log2420-serve.herokuapp.com/JSON/output.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        jsonData = data;
        selectedElectionIndex = 0;
        loadingData = false;
        generateElections();
    });

function getPartis() {
    return jsonData['Elections'][selectedElectionIndex]['type'] === 'Federal' ?
        'PartisFederaux' : 'PartisProvinciaux';
}

function generateElections(){
    const elections = jsonData['Elections'];

    // getting the list and emptying it.
    const electionList = document.getElementById('election-list');
    while(electionList.firstChild) {
        electionList.removeChild(electionList.firstChild);
    }

    let index = 1;
    for (const election of elections){
        // Generate HTML for 'Election'

        // <input type="radio" class="radio__input" id="radio1" name="election" value="1" checked>
        const radio__input = document.createElement('input');
        radio__input.type = 'radio';
        radio__input.classList.add('radio__input');
        radio__input.id = 'radio' + index.toString();
        radio__input.name = 'election';
        radio__input.checked = index === selectedElectionIndex;

        // <div class="radio__radio"></div>
        const radio__radio = document.createElement('div');
        radio__radio.classList.add('radio__radio');

        // <span class="card-option-title">43e élection fédérale</span><br/>
        const cardOptionTitle = document.createElement('span');
        cardOptionTitle.classList.add('card-option-title');
        cardOptionTitle.textContent = election['name'];

        // <span class="card-option-subtitle">21 octobre 2019</span>
        const cardOptionSubtitle = document.createElement('span');
        cardOptionSubtitle.classList.add('card-option-subtitle');
        cardOptionSubtitle.textContent = election['date'];

        // <div class="text">
        const text = document.createElement('div');
        text.classList.add('text');
        text.appendChild(cardOptionTitle);
        text.appendChild(document.createElement('br'));
        text.appendChild(cardOptionSubtitle);

        // <label for="radio1" class="radio">
        const radio = document.createElement('label');
        radio.for = 'radio' + index.toString();
        radio.classList.add('radio');
        radio.appendChild(radio__input);
        radio.appendChild(radio__radio);
        radio.appendChild(text);

        // <li>
        const li = document.createElement('li');
        li.appendChild(radio);

        // <ul> (parent)
        electionList.appendChild(li);

        ++index;
    }

    generatePartis();
}

function generatePartis(str) {
    partis = getPartis();
    for (parti of partis) {
        // Generate HTML for 'parti'

    }
}


// The logic that checks for checkboxes being clicked

checkboxesClicked = [];

function clickedCheckbox(event){
    const id = event.id;
    updateCheckboxesClicked(id);
    updateBtnConnaitre();
    updateBtnComparer();
}

function updateCheckboxesClicked(id) {
    if (document.getElementById(id).checked){
        if (checkboxesClicked.indexOf(id) < 0){
            checkboxesClicked.push(id);
        }
    } else {
        if (0 <= checkboxesClicked.indexOf(id)){
            checkboxesClicked.splice(checkboxesClicked.indexOf(id), 1);
        }
    }
}

function updateBtnConnaitre() {
    const classList = document.getElementById("btn-propositions").classList;
    if (checkboxesClicked.length === 1 && classList.contains('disabled')) {
        classList.remove('disabled');
    } else if (checkboxesClicked.length !== 1 && !classList.contains('disabled')){
        classList.add('disabled');
    }
}

function updateBtnComparer() {
    const classList = document.getElementById("btn-comparer").classList;
    if (checkboxesClicked.length === 2 && classList.contains('disabled')) {
        classList.remove('disabled');
    } else if (checkboxesClicked.length !== 2 && !classList.contains('disabled')){
        classList.add('disabled');
    }
}
