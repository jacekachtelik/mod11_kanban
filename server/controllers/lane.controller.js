import Lane from '../models/lane';
import uuid from 'uuid';

export function getSomething(req, res) {
	return res.status(200).end();
}

export function getLanes(req, res) {
    console.log('Request geLanes: ',req);
  	Lane.find().exec((err, lanes) => {
    	if (err) {
      		res.status(500).send(err);
    	}
    	res.json({ lanes });
        });
}

export function addLane(req, res) {
	if (!req.body.name) {
    	res.status(403).end();
	}
	const newLane = new Lane(req.body);
	newLane.notes = [];
	newLane.id = uuid();
  	newLane.save((err, saved) => {
    	if (err) {
      		res.status(500).send(err);
    	}
    	res.json(saved);
  	});
}

export function deleteLane(req, res) {
	console.log('Request: ',req);
	Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
		if (err) {
			res.status(500).send(err);
		}
		console.log("Linia",lane);
		lane.notes.map( (note) => {
			console.log('Notatka: ',note);
            note.remove();
		});
		lane.remove(() => {
			res.status(200).end();
		});
    });
}

export function editLane(req, res) {
	Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
        if (err) {
            res.status(500).send(err);
        }
        if (!req.body.name) {
            res.status(403).end();
        }
        lane.name = req.body.name;
        lane.save((err, saved) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json(saved);
        });
    });
}
