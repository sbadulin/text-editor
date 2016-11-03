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
    console.log('Заметка ' + (position + 1));
    console.log(this.notes[position].noteText);
  }
};


var handlers = {
  addNote: function() {
    var addNoteTextInput = document.getElementById('addNoteTextInput');
    noteList.addNote(addNoteTextInput.value);
    addNoteTextInput.value = '';
    view.displayNotes();
  },
  changeNote: function() {
    var changeNotePositionInput = document.getElementById('changeNotePositionInput');
    var changeNoteTextInput = document.getElementById('changeNoteTextInput');
    noteList.changeNote(changeNotePositionInput.valueAsNumber, changeNoteTextInput.value);
    changeNotePositionInput.value = '';
    changeNoteTextInput.value = '';
    view.displayNotes();

  },
  deleteNote: function(position) {
    noteList.deleteNote(position);
    view.displayNotes();
  }
};

var view = {
  displayNotes: function() {
    var notesUl = document.querySelector('ul');
    notesUl.innerHTML = '';
    noteList.notes.forEach(function(note, position) {
      var noteLi = document.createElement('li');
      noteLi.textContent = note.noteText;
      noteLi.id = position;
      notesUl.appendChild(noteLi);
      noteLi.appendChild(this.createDeleteButton());
    }, this)
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
        handlers.deleteNote(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setUpEventListeners();
