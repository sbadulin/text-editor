var noteList = {
  notes: [],
  addNote: function(noteText) {
    this.notes.push({
      noteText: noteText
    });
  },
  changeNote: function(position, noteText) {
    this.notes[position].noteText = noteText;
  },
  deleteNote: function(position) {
    this.notes.splice(position, 1);
  },

  displayNote: function(position) {
    return this.notes[position].noteText;
  }
};

var handlers = {
  addNote: function() {
    var addNoteTextInput = document.getElementById('addNoteTextInput');
    noteList.addNote(addNoteTextInput.value);
    addNoteTextInput.value = '';
    view.displayAllNotes();
  },
  changeNote: function(position) {
    var addNoteTextInput = document.getElementById('addNoteTextInput');
    noteList.changeNote(position, addNoteTextInput.value);
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
  }
};

var view = {
  displayAllNotes: function() {
    var notesUl = document.querySelector('ul');
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
  displayNote: function(position) {
    // var selectedNote = document.getElementById(position);
    // selectedNote.className = 'selected';
    var textarea = document.getElementById('addNoteTextInput');
    textarea.value = noteList.displayNote(position);
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners: function() {
    var notesUl = document.querySelector('ul');
    notesUl.addEventListener('click', function(event) {
      var elementClicked = event.target;
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteNote(parseInt(elementClicked.parentNode.id, 10));
      }
      if (elementClicked.nodeName === 'LI') {
        handlers.displayNote(parseInt(elementClicked.id, 10));
      }
    });
  }
};

view.setUpEventListeners();
