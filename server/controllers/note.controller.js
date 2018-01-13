import Note from '../models/note';
import Lane from '../models/lane';
import uuid from 'uuid';

export function getSomething(req, res) {
	return res.status(200).end();
}

export function getNotes(req, res) {
  	Note.find().exec((err, notes) => {
    if (err) {
    	res.status(500).send(err);
    }
	res.json({ notes });
    });
}

export function addNote(req, res) {
  	const { note, laneId } = req.body;
	if (!note || !note.task || !laneId) {
    	res.status(400).end();
    }
	const newNote = new Note({
    	task: note.task,
	});
	newNote.id = uuid();
	newNote.save((err, saved) => {
    	if (err) {
      		res.status(500).send(err);
    	}
    	Lane.findOne({ id: laneId })
      	.then(lane => {
        	lane.notes.push(saved);
        	return lane.save();
      })
      .then(() => {
        	res.json(saved);
      });
  	});
}

export function deleteNote(req, res) {
	Note.remove({ id: req.params.noteId }).exec((err) => {
		if (err) {
			res.status(500).send(err);
		}
		res.status(200).end();
    });
}

export function editNote(req, res) {
    console.log('Edycja nazwy notatki: ',req.body);
	console.log('Parametry: ',req.params);
    Note.findOne({ id: req.params.noteId }).exec((err, note) => {
        console.log('Notatka: ',note);
        if (err) {
            res.status(500).send(err);
        }
        if (!req.body.note.task) {
            res.status(403).end();
        }
        note.task = req.body.note.task;
		note.save((err, saved) => {
			if (err) {
            	res.status(500).send(err);
			}
            res.json(saved);
		});
    });
}
