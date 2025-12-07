function noteViewModel(note) {
  return {
    id: note._id,
    description: note.description,
  };
}

module.exports = {
  noteViewModel,
};
