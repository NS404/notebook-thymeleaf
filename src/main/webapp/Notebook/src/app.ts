import {Category} from "./Category";
import {Note} from "./Note";

let notesDiv = document.getElementById('notesDiv') as Element;
let catDiv = document.getElementById('categoriesDiv') as Element;

let writeNoteButton = document.getElementById('writeNoteButton') as HTMLButtonElement;
writeNoteButton.addEventListener('click', createNote);

let newCategoryButton = document.getElementById('newCategoryButton') as HTMLButtonElement;
newCategoryButton.addEventListener('click', createCategory);

let openNewNoteButton = document.getElementById('openNewNoteButton') as HTMLButtonElement;
openNewNoteButton.addEventListener('click', openNewNotePopup);

let closeNewNoteButton = document.getElementById('closeNewNoteButton') as HTMLButtonElement;
closeNewNoteButton.addEventListener('click',closeNewNotePopup);

let newNotePopup = document.getElementById('newNoteDiv') as HTMLElement;
let overlay = document.getElementById('overlay') as HTMLElement;

function openNewNotePopup() {
    newNotePopup.classList.add('active');
    overlay.classList.add('active');

}

function closeNewNotePopup() {
    newNotePopup.classList.remove('active');
    overlay.classList.remove('active');
}


export var categories: Category[];

export var selectedCategory: Category;

//renderCategories(categories);
//selectCategory(categories[0]);
// @ts-ignore
//renderNotes(selectedCategory);

addCategoryListeners();
addDeleteCatButtonListeners();

function addDeleteCatButtonListeners(){

    $(".deleteCatButton").click(function() {
        // @ts-ignore
        deleteCategory(event);

    } )

}

function addDeleteNoteButtonListeners(){

    $(".deleteNoteButton").click(function() {
        // @ts-ignore
        deleteNote(event);
    });

}



function addCategoryListeners() {
    let categoryDivs = document.getElementsByClassName("category");

    for (let i = 0; i < categoryDivs.length; i++) {
        categoryDivs[i].addEventListener('click',clickCategory);
    }
}

function createNote() {

    if(selectedCategory !== undefined) {

        let noteTitleInput = document.getElementById('newNoteTitle') as HTMLInputElement
        let noteContentInput = document.getElementById('noteContentArea') as HTMLInputElement

        if (noteTitleInput.value.trim().length  && noteContentInput.value.trim().length) {

            let newNoteTitle: string = (document.getElementById('newNoteTitle') as HTMLInputElement).value;
            (document.getElementById('newNoteTitle') as HTMLInputElement).value = '';
            let newNoteContent: string = (document.getElementById('noteContentArea') as HTMLInputElement).value;
            (document.getElementById('noteContentArea') as HTMLInputElement).value = '';
            let newNote = new Note(newNoteTitle, newNoteContent, selectedCategory.name);

            saveNote(newNote);
        }
    }
}

function createCategory() {
    let catNameInput = document.getElementById('newCategoryName')as HTMLInputElement;
    let categoryName: string = catNameInput.value;

    if(categoryName.trim().length) {

        catNameInput.value = '';

            $.post("/Categories/create", {name : categoryName}, function (data, status) {
                    alert("Data: " + data + " Status: " + status);
                    $("#categoriesDiv").empty();
                    $("#categoriesDiv").append(data);
                });
    }
}

function updateNoteCount(category: Category) {

    let catElms = catDiv.children;

    for (let i = 0; i < catElms.length; i++) {

        let categoryName  = (catElms[i].querySelector('.categoryName') as HTMLElement).innerText;

        if(category.name === categoryName) {

            (catElms[i].querySelector('.noteCount') as HTMLElement).innerText = String(category.notes.length);

        }
    }

}

function saveCategory(category: Category) {

    categories.push(category);
    localStorage.setItem('categories',JSON.stringify(categories));
    reRenderCategories();
    reRenderNotes(selectedCategory);

}

function saveNote(newNote: Note) {

    selectedCategory.notes.push(newNote);

    localStorage.setItem('categories',JSON.stringify(categories));

    updateNoteCount(selectedCategory);

    reRenderNotes(selectedCategory);

}

function getCategories(): Category[] {

    if(localStorage.length !== 0) {
        let cats: any = localStorage.getItem('categories');
        return JSON.parse(cats);
    }else {
        return []
    }

}

function renderCategories(categories: Category[]){


    categories.forEach(cat => {

        let categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');

        let categoryName = document.createElement('h3');
        categoryName.classList.add('categoryName');
        categoryName.innerText = cat.name;

        let notesCount = document.createElement('p');
        notesCount.classList.add('noteCount');
        notesCount.innerText = String(cat.notes.length);

        let deleteCatButton = document.createElement('button');
        deleteCatButton.classList.add('deleteCatButton');
        deleteCatButton.innerHTML = '<i class="fa fa-light fa-trash"></i>';
        deleteCatButton.addEventListener('click',deleteCategory);

        categoryDiv.appendChild(deleteCatButton);
        categoryDiv.appendChild(categoryName);
        categoryDiv.appendChild(notesCount);
        catDiv.appendChild(categoryDiv);

        categoryDiv.addEventListener('click',clickCategory);

    });



}

function renderNotes(category: Category) {

    if(category !== undefined) {
        let notes = category.notes;

        notes.forEach(note => {

            let noteDiv = document.createElement('div');
            noteDiv.classList.add('note');

            let noteTitle = document.createElement('h3');
            noteTitle.classList.add('noteTitle');
            noteTitle.innerText = note.title;

            let noteContent = document.createElement('p');
            noteContent.classList.add('noteContent');
            noteContent.innerText = note.content;

            let deleteNoteButton = document.createElement('button');
            deleteNoteButton.classList.add('deleteNoteButton');
            deleteNoteButton.innerHTML = '<i class="fa fa-light fa-trash"></i>'
            deleteNoteButton.addEventListener('click', deleteNote);


            noteDiv.appendChild(noteTitle);
            noteDiv.appendChild(noteContent);
            noteDiv.appendChild(deleteNoteButton);
            notesDiv.appendChild(noteDiv);


        });
    }

}

export function clickCategory(e: Event){

    let clickedCategory = e.target as Element;

    let categoryName = (clickedCategory.querySelector('.categoryName') as HTMLElement).innerHTML;

    console.log(categoryName.trim());

    $.ajax({
        async: false,
        type: "GET",
        url: "/Notes",
        data: {categoryName: categoryName} ,
        success: function (data,status) {

            alert("Data: " + data + " Status: " + status);
            $("#notesDiv").empty();
            $("#notesDiv").append(data);
            toggleCategories(clickedCategory);

        }
    });

    addDeleteNoteButtonListeners();

}

function toggleCategories(categoryElm: Element){

    let categories = catDiv.children;

    for (let i = 0; i < categories.length; i++) {
        if(categoryElm === categories[i]) {

            categories[i].classList.add('selectedCategory');
        }else {
            categories[i].classList.remove('selectedCategory');
        }
    }


}

function deleteCategory(event: Event) {

    const item = event.target as Element;

    if(item.classList[0] === 'deleteCatButton') {

        let category = item.parentElement as HTMLElement;
        let categoryName: string = (category.querySelector('.categoryName') as HTMLElement).innerText;

        console.log(categoryName);

        event.stopPropagation();

        // category.remove();
        // if(selectedCategory.name === categoryName) {
        //     deSelectedCategory();
        // }
       // reRenderNotes(selectedCategory);

    }


}

function deleteNote(event: Event | undefined) {
    const item = (event as Event).target as Element;

    if(item.classList[0] === 'deleteNoteButton') {
        const note = item.parentElement as HTMLElement;
        let noteTitle: string = (note.querySelector('.noteTitle') as HTMLElement).innerText;

        $.ajax({
            async: false,
            type: "DELETE",
            url: "/Notes",
            data: {noteTitle: noteTitle},
            success: function (response) {
                note.remove();
            }
        });


       // updateNoteCount(selectedCategory);
       // reRenderNotes(selectedCategory);

    }
}

function deSelectedCategory(){
    // @ts-ignore
    selectedCategory = undefined;

    let categories = catDiv.children;

    for (let i = 0; i < categories.length; i++) {
            categories[i].classList.remove('selectedCategory');

    }

}

function selectCategory(category: Category) {

    selectedCategory = category;

    let catElms = catDiv.children;

    for (let i = 0; i < catElms.length; i++) {
        let catTitle = (catElms[i].querySelector('.categoryName') as HTMLElement).innerText;

        if(catTitle === category.name) {
            toggleCategories(catElms[i]);
        }
    }

}

function reRenderNotes(cat: Category){
    notesDiv.innerHTML = '';
    renderNotes(cat);
}

function reRenderCategories(){
    catDiv.innerHTML = '';
    renderCategories(categories);
}

