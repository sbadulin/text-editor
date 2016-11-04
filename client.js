var noteList = {
  notes: [],
  addNote: function(noteText, tags) {
    this.notes.push({
      noteText: noteText,
      tags: tags
    });
  },
  changeNote: function(position, noteText, tags) {
    var changedNote = this.notes[position];
    changedNote.noteText = noteText;
    changedNote.tags = [];
    this.notes[position].tags = tags;
  },
  deleteNote: function(position) {
    this.notes.splice(position, 1);
  },

  displayNote: function(position) {
    return this.notes[position].noteText;
  }
};

var tagList = {
  tags: [],
  addTags: function(noteTags) {
    noteTags.forEach(function(tag) {
      if (!tagList.tags.includes(tag)) {
        tagList.tags.push(tag);
      }
    });
  },
  deleteTag: function(tag) {
    var index = this.tags.indexOf(tag);
    this.tags.splice(index, 1);
  }
};

var handlers = {
  addNote: function() {
    var addNoteTextInput = document.getElementById('addNoteTextInput');
    var tags = this.findNoteTags();
    noteList.addNote(addNoteTextInput.value, tags);
    this.displayTagList();
    addNoteTextInput.value = '';
    view.displayAllNotes();
  },
  changeNote: function(position) {
    var addNoteTextInput = document.getElementById('addNoteTextInput');
    var tags = this.findNoteTags();
    noteList.changeNote(position, addNoteTextInput.value, tags);
    this.displayTagList();
    addNoteTextInput.value = '';
    view.displayAllNotes();
  },
  deleteNote: function(position) {
    noteList.deleteNote(position);
    view.displayAllNotes();
  },
  displayNote: function(position) {
    view.displayNote(position);
    saveButton.onclick = function() {
      handlers.changeNote(position);
    };
  },
  findNoteTags: function() {
    var noteTags = addNoteTextInput.value.match(/\#[a-zA-zа-яА-я0-9]+/g);
    if (noteTags) {
      tagList.addTags(noteTags);
    }
    return noteTags;
  },
  displayTagList: function() {
    view.displayTagList();
  },
  deleteTag: function(tag) {
    tagList.deleteTag(tag);
    this.displayTagList();
  },
  displayNotesWithTag: function(tag) {
    view.displayNotesWithTag(tag);
  }
};

var view = {
  displayAllNotes: function() {
    var notesUl = document.querySelector('ul#notes');
    notesUl.innerHTML = '';
    noteList.notes.forEach(function(note, position) {
      var noteLi = document.createElement('li');
      noteLi.textContent = note.noteText;
      noteLi.id = position;
      notesUl.appendChild(noteLi);
      noteLi.appendChild(this.createDeleteButton());
    }, this);
    saveButton.onclick = function() {
      handlers.addNote();
    };
  },
  displayNotesWithTag: function(tag) {
    var notesUl = document.querySelector('ul#notes');
    notesUl.innerHTML = '';
    noteList.notes.forEach(function(note, position) {
      var noteLi = document.createElement('li');
      noteLi.textContent = note.noteText;
      noteLi.id = position;
      if (note.tags && note.tags.includes(tag)) {
        notesUl.appendChild(noteLi);
        noteLi.appendChild(this.createDeleteButton());
      }
    }, this);
    saveButton.onclick = function() {
      handlers.addNote();
    };
  },
  displayNote: function(position) {
    var textarea = document.getElementById('addNoteTextInput');
    textarea.value = noteList.displayNote(position);
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  displayTagList: function() {
    var tagsUl = document.querySelector('ul#tags');
    tagsUl.innerHTML = '';
    if (tagList.tags) {
      tagList.tags.forEach(function(tag) {
        var tagLi = document.createElement('li');
        tagLi.textContent = tag.slice(1);
        tagLi.dataset.tag = tag;
        tagsUl.appendChild(tagLi);
        tagLi.appendChild(this.createTagDeleteButton());
      }, this);
    }
  },
  createTagDeleteButton: function() {
    var tagDeleteButton = document.createElement('button');
    tagDeleteButton.textContent = 'x';
    tagDeleteButton.className = 'tagDeleteButton';
    return tagDeleteButton;
  },
  setUpEventListeners: function() {
    var notesUl = document.querySelector('ul#notes');
    notesUl.addEventListener('click', function(event) {
      var elementClicked = event.target;
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteNote(parseInt(elementClicked.parentNode.id, 10));
      }
      if (elementClicked.nodeName === 'LI') {
        handlers.displayNote(parseInt(elementClicked.id, 10));
      }
    });
    var tagsUl = document.querySelector('ul#tags');
    tagsUl.addEventListener('click', function(event) {
      var elementClicked = event.target;
      if (elementClicked.className === 'tagDeleteButton') {
        handlers.deleteTag(elementClicked.parentNode.dataset.tag);
      }
      if (elementClicked.nodeName === 'LI') {
        if (elementClicked.className === 'selected') {
          elementClicked.className = '';
          view.displayAllNotes(elementClicked.dataset.tag);
        } else {
          elementClicked.className = 'selected';
          handlers.displayNotesWithTag(elementClicked.dataset.tag);
        }
      }
    });
  }
};

view.setUpEventListeners();
