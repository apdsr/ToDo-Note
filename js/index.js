//console.log("Note app");
//if a user add note,add it to the local storage 
shownotes();
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click', function(e) {
    let addText = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myobj = {
        title: addTitle.value,
        text: addText.value
    };
    if (addText.value != "" && addTitle.value != "") {
        notesObj.push(myobj);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addText.value = "";
        addTitle.value = "";
    }
    // console.log(notesObj);

    shownotes();

});

//function to show elements from local storage
function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element, index) {
        html += `
   <div class="note card my-2 mx-2 card bg-dark text-white" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Title:${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
        </div>
    </div> `;

    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show!`;
    }

}

// function to delete a note
function deleteNote(index) {
    // console.log("i am deleting", index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    shownotes();
}


let search = document.getElementById("searchTxt");
search.addEventListener("input", function() {
    let inputval = search.value.toLowerCase();
    // console.log("input Event"+inputval);
    let noteCards = document.getElementsByClassName('note card');
    Array.from(noteCards).forEach(function(element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        //console.log(cardTxt);
        if (cardTxt.includes(inputval)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
});