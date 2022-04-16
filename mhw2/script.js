//Questa funzione permette di selezionare la risposta, la assegna alla mappa e nel caso tutte le risposte siano state date attiva la funzione questionariocompleto()
function check(event) {
    const risposta = event.currentTarget;
    const img = risposta.querySelector('.checkbox');
    img.src = 'images/checked.png';
    risposta.classList.remove('unchecked');
    risposta.classList.add('checked');
    risposte_date[risposta.dataset.questionId] = risposta.dataset.choiceId; //assegniamo univocamente a ogni domanda una risposta
    if (risposte_date.one !== null && risposte_date.two !== null && risposte_date.three !== null)
        questionariocompleto();
    uncheck(risposta);
}


//Questa funzione rimuove la possibilità di cliccare ancora nelle risposte e attiva la visualizzazione del risultato
function questionariocompleto() {
    for (const box of boxes)
        box.removeEventListener('click', check);
    ScriviRisposta();

}

function uncheck(risposta) {    //Creo una lista di risposte non date per dargli la classe 'unchecked' e potergli aggiungere le caratteristiche richieste (esempio:opacità)

    const risposte_non_date = document.querySelectorAll('.choice-grid div');

    for (const non_data of risposte_non_date) {
        if (non_data.dataset.choiceId !== risposta.dataset.choiceId && non_data.dataset.questionId === risposta.dataset.questionId) {
            non_data.classList.remove('checked');
            const img = non_data.querySelector('.checkbox');
            img.src = 'images/unchecked.png';
            non_data.classList.add('unchecked');
        }
    }

}

const risposte_date = {         //una mappa che per ogni domanda segna l'id della risposta 
    one: null,
    two: null,
    three: null
};

const boxes = document.querySelectorAll(".choice-grid div");        
for (const box of boxes) {
    box.addEventListener('click', check);       //viene aggiunto il trigger a tutti i box con le risposte
}

//Dobbiamo creare degli elementi dinamicamente per aggiungere i risultati

function AssegnaRisposta() {                                
    if (risposte_date.two === risposte_date.three)
        return (risposte_date.two);
    else
        return (risposte_date.one);
}

function ScriviRisposta() {                         //In questa funzione abbiamo creato gli elementi h2, p e button per farli comparire una volta ottenuti i risultati
    index = AssegnaRisposta();
    const risultato_container = document.querySelector('#risultato');
    var titolo = document.createElement('h2');
    var testo = document.createElement('p');
    var bottone = document.createElement('button');
    titolo.textContent = RESULTS_MAP[index].title;
    testo.textContent = RESULTS_MAP[index].contents;
    bottone.textContent = "Riavvia il test";
    risultato_container.appendChild(titolo);
    risultato_container.appendChild(testo);
    risultato_container.appendChild(bottone);
    bottone.addEventListener('click', RiavviaTest);     
}

//Sviluppo funzione del bottone 
function RiavviaTest() {
    risposte_date.one = null;               //qui azzeriamo i risultati delle risposte
    risposte_date.two = null;
    risposte_date.three = null;
    for (const box of boxes) {
        const img = box.querySelector('.checkbox');
        img.src = 'images/unchecked.png';
        box.classList.remove('unchecked');          //rimuoviamo sia le classi checked che unchecked perché entrambi presentano peculiari caratteristiche
        box.classList.remove('checked');            
        box.addEventListener('click', check);
    }
    risultato.innerHTML='';                 //questo serve a eliminare gli elementi titolo, testo e bottone precentemente creati
    window.scroll(0 , 0);
}
