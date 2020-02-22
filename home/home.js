// The logic that loads the JSON in local memory
let loadingData = true;
let jsonData;
let selectedElectionIndex;
let checkboxesClicked = [];
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

function resetBtns(){
    checkboxesClicked = [];
    updateBtnConnaitre();
    updateBtnComparer();
}

function getPartis() {
    return jsonData['Elections'][selectedElectionIndex]['type'] === 'Federal' ?
        'PartisFederaux' : 'PartisProvinciaux';
}

function generateElections(){
    const elections = jsonData['Elections'];
    $('#election-list').empty();

    let index = 0;
    for (const election of elections){
        // Generate HTML for 'Election'

        // <input type="radio" class="radio__input" id="radio1" name="election" value="1" checked>
        const radio__input = document.createElement('input');
        radio__input.type = 'radio';
        radio__input.classList.add('radio__input');
        radio__input.id = 'radio' + index.toString();
        radio__input.name = 'election';
        radio__input.checked = index === selectedElectionIndex;
        radio__input.addEventListener('click', (event) => clickedRadio(event.toElement));

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
        $('#election-list').append(li);

        ++index;
    }

    generatePartis();
}

function generatePartis() {
    resetBtns();

    partisType = getPartis();
    partis = jsonData[partisType];
    $('#partis-list').empty();

    let index = 0;
    for (const parti of partis){
        // Generate HTML for 'Partis'

        // <input type="checkbox" class="checkbox__input" id="cb1" name="pp" onclick="clickedCheckbox(this)">
        const checkbox__input = document.createElement('input');
        checkbox__input.type = 'checkbox';
        checkbox__input.classList.add('checkbox__input');
        checkbox__input.id = 'cb' + index.toString();
        checkbox__input.name = 'pp';
        checkbox__input.addEventListener('click', (event) => clickedCheckbox(event.toElement));

        // <div class="checkbox__box"></div>
        const checkbox__box = document.createElement('div');
        checkbox__box.classList.add('checkbox__box');

        // <span class="card-option-title">C.A.Q</span><br/>
        const cardOptionTitle = document.createElement('span');
        cardOptionTitle.classList.add('card-option-title');
        cardOptionTitle.textContent = parti['abreviation'];

        // <span class="card-option-subtitle">Coalition Avenir Québec</span>
        const cardOptionSubtitle = document.createElement('span');
        cardOptionSubtitle.classList.add('card-option-subtitle');
        cardOptionSubtitle.textContent = parti['fullname'];

        // <div class="text">
        const text = document.createElement('div');
        text.classList.add('text');
        text.appendChild(cardOptionTitle);
        text.appendChild(document.createElement('br'));
        text.appendChild(cardOptionSubtitle);

        // <label class="checkbox" for="cb1">
        const checkbox = document.createElement('label');
        checkbox.for = 'radio' + index.toString();
        checkbox.classList.add('radio');
        checkbox.appendChild(checkbox__input);
        checkbox.appendChild(checkbox__box);
        checkbox.appendChild(text);

        // <li>
        const li = document.createElement('li');
        li.appendChild(checkbox);

        // <ul> (parent)
        $('#partis-list').append(li);

        ++index;
    }

}


// The logic that checks for radios being clicked

function clickedRadio(event) {
    const id = event.id;
    selectedElectionIndex = +id.charAt(id.length - 1);
    generatePartis();
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
