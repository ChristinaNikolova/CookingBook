function noteViewModel(note) {
  return {
    id: note._id,
    description: note.description,
    isList: note.isList,
  };
}

module.exports = {
  noteViewModel,
};
