System.register("Note", [], function (exports_1, context_1) {
    "use strict";
    var Note;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Note = class Note {
                constructor(title, content, categoryName) {
                    this.title = title;
                    this.content = content;
                    this.categoryName = categoryName;
                }
                getTitle() {
                    return this.title;
                }
                setTitle(title) {
                    this.title = title;
                }
                getContent() {
                    return this.content;
                }
                setContent(content) {
                    this.content = content;
                }
                getCategoryName() {
                    return this.categoryName;
                }
                setCategoryName(categoryName) {
                    this.categoryName = categoryName;
                }
            };
            exports_1("Note", Note);
        }
    };
});
System.register("Category", [], function (exports_2, context_2) {
    "use strict";
    var Category;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            Category = class Category {
                constructor(name, notes) {
                    this.name = name;
                    this.notes = notes;
                }
                getName() {
                    return this.name;
                }
                setName(name) {
                    this.name = name;
                }
                getNotes() {
                    return this.notes;
                }
                setNotes(notes) {
                    this.notes = notes;
                }
            };
            exports_2("Category", Category);
        }
    };
});
System.register("app", ["Category", "Note"], function (exports_3, context_3) {
    "use strict";
    var Category_1, Note_1, notesDiv, catDiv, writeNoteButton, newCategoryButton, openNewNoteButton, closeNewNoteButton, newNotePopup, overlay, categories, selectedCategory;
    var __moduleName = context_3 && context_3.id;
    function openNewNotePopup() {
        newNotePopup.classList.add('active');
        overlay.classList.add('active');
    }
    function closeNewNotePopup() {
        newNotePopup.classList.remove('active');
        overlay.classList.remove('active');
    }
    //renderCategories(categories);
    //selectCategory(categories[0]);
    // @ts-ignore
    //renderNotes(selectedCategory);
    function createNote() {
        if (selectedCategory !== undefined) {
            let noteTitleInput = document.getElementById('newNoteTitle');
            let noteContentInput = document.getElementById('noteContentArea');
            if (noteTitleInput.value.trim().length && noteContentInput.value.trim().length) {
                let newNoteTitle = document.getElementById('newNoteTitle').value;
                document.getElementById('newNoteTitle').value = '';
                let newNoteContent = document.getElementById('noteContentArea').value;
                document.getElementById('noteContentArea').value = '';
                let newNote = new Note_1.Note(newNoteTitle, newNoteContent, selectedCategory.name);
                saveNote(newNote);
            }
        }
    }
    function createCategory() {
        let catNameInput = document.getElementById('newCategoryName');
        let categoryName = catNameInput.value;
        if (categoryName.trim().length) {
            catNameInput.value = '';
            let notes = [];
            let newCategory = new Category_1.Category(categoryName, notes);
            exports_3("selectedCategory", selectedCategory = newCategory);
            saveCategory(newCategory);
            selectCategory(newCategory);
        }
    }
    function updateNoteCount(category) {
        let catElms = catDiv.children;
        for (let i = 0; i < catElms.length; i++) {
            let categoryName = catElms[i].querySelector('.categoryName').innerText;
            if (category.name === categoryName) {
                catElms[i].querySelector('.noteCount').innerText = String(category.notes.length);
            }
        }
    }
    function saveCategory(category) {
        categories.push(category);
        localStorage.setItem('categories', JSON.stringify(categories));
        reRenderCategories();
        reRenderNotes(selectedCategory);
    }
    function saveNote(newNote) {
        selectedCategory.notes.push(newNote);
        localStorage.setItem('categories', JSON.stringify(categories));
        updateNoteCount(selectedCategory);
        reRenderNotes(selectedCategory);
    }
    function getCategories() {
        if (localStorage.length !== 0) {
            let cats = localStorage.getItem('categories');
            return JSON.parse(cats);
        }
        else {
            return [];
        }
    }
    function renderCategories(categories) {
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
            deleteCatButton.addEventListener('click', deleteCategory);
            categoryDiv.appendChild(deleteCatButton);
            categoryDiv.appendChild(categoryName);
            categoryDiv.appendChild(notesCount);
            catDiv.appendChild(categoryDiv);
            categoryDiv.addEventListener('click', clickCategory);
        });
    }
    exports_3("renderCategories", renderCategories);
    function renderNotes(category) {
        if (category !== undefined) {
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
                deleteNoteButton.innerHTML = '<i class="fa fa-light fa-trash"></i>';
                deleteNoteButton.addEventListener('click', deleteNote);
                noteDiv.appendChild(noteTitle);
                noteDiv.appendChild(noteContent);
                noteDiv.appendChild(deleteNoteButton);
                notesDiv.appendChild(noteDiv);
            });
        }
    }
    exports_3("renderNotes", renderNotes);
    function clickCategory(e) {
        let clickedCategory = e.target;
        let categoryName = clickedCategory.querySelector('.categoryName').innerText;
        categories.forEach(cat => {
            if (categoryName == cat.name) {
                exports_3("selectedCategory", selectedCategory = cat);
            }
        });
        toggleCategories(clickedCategory);
        reRenderNotes(selectedCategory);
    }
    function toggleCategories(categoryElm) {
        let categories = catDiv.children;
        for (let i = 0; i < categories.length; i++) {
            if (categoryElm === categories[i]) {
                categories[i].classList.add('selectedCategory');
            }
            else {
                categories[i].classList.remove('selectedCategory');
            }
        }
    }
    function deleteCategory(event) {
        const item = event.target;
        if (item.classList[0] === 'deleteCatButton') {
            let category = item.parentElement;
            let categoryName = category.querySelector('.categoryName').innerText;
            category.remove();
            categories.forEach(cat => {
                if (cat.name === categoryName) {
                    categories.splice(categories.indexOf(cat), 1);
                }
            });
            localStorage.setItem('categories', JSON.stringify(categories));
            if (selectedCategory.name === categoryName) {
                deSelectedCategory();
            }
            reRenderNotes(selectedCategory);
        }
    }
    function deleteNote(event) {
        const item = event.target;
        if (item.classList[0] === 'deleteNoteButton') {
            const note = item.parentElement;
            let noteTitle = note.querySelector('.noteTitle').innerText;
            let notes = selectedCategory.notes;
            notes.forEach(note => {
                if (noteTitle == note.title) {
                    notes.splice(notes.indexOf(note), 1);
                }
            });
            localStorage.setItem('categories', JSON.stringify(categories));
            updateNoteCount(selectedCategory);
            reRenderNotes(selectedCategory);
        }
    }
    function deSelectedCategory() {
        // @ts-ignore
        exports_3("selectedCategory", selectedCategory = undefined);
        let categories = catDiv.children;
        for (let i = 0; i < categories.length; i++) {
            categories[i].classList.remove('selectedCategory');
        }
    }
    function selectCategory(category) {
        exports_3("selectedCategory", selectedCategory = category);
        let catElms = catDiv.children;
        for (let i = 0; i < catElms.length; i++) {
            let catTitle = catElms[i].querySelector('.categoryName').innerText;
            if (catTitle === category.name) {
                toggleCategories(catElms[i]);
            }
        }
    }
    exports_3("selectCategory", selectCategory);
    function reRenderNotes(cat) {
        notesDiv.innerHTML = '';
        renderNotes(cat);
    }
    function reRenderCategories() {
        catDiv.innerHTML = '';
        renderCategories(categories);
    }
    return {
        setters: [
            function (Category_1_1) {
                Category_1 = Category_1_1;
            },
            function (Note_1_1) {
                Note_1 = Note_1_1;
            }
        ],
        execute: function () {
            notesDiv = document.getElementById('notesDiv');
            catDiv = document.getElementById('categoriesDiv');
            writeNoteButton = document.getElementById('writeNoteButton');
            writeNoteButton.addEventListener('click', createNote);
            newCategoryButton = document.getElementById('newCategoryButton');
            newCategoryButton.addEventListener('click', createCategory);
            openNewNoteButton = document.getElementById('openNewNoteButton');
            openNewNoteButton.addEventListener('click', openNewNotePopup);
            closeNewNoteButton = document.getElementById('closeNewNoteButton');
            closeNewNoteButton.addEventListener('click', closeNewNotePopup);
            newNotePopup = document.getElementById('newNoteDiv');
            overlay = document.getElementById('overlay');
        }
    };
});
//# sourceMappingURL=bundle.js.map