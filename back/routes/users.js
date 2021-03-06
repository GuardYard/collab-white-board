const express = require('express');
const router = express.Router();

const User = require('../models/user.model');

// @route GET all users --> /users/
router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(404).json({ Error: err, nousersfound: 'No Users found' }));
});

// @route GET user by Id --> /users/:id
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(404).json({ nousersfound: 'No Users found' }));
});

// @route GET the color of a user --> users/:id/color
router.get('/:id/color', (req, res) => {
    User.findById(req.params.id).populate("color")
        .then(user => res.json(user.color))
        .catch(err => res.status(404).json({ nousersfound: 'No Users found' }));
});

// @route PUT update an user --> /users/
router.put('/', (req, res) => {
    User.findByIdAndUpdate(req.body._id, req.body)
        .then(user => res.json({ msg: 'Updated successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to update the Database' }));
});

router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => {
            user.trainings.map(training => Training.findByIdAndDelete(training)
                .then(training => {
                    training.exercises.map(exercise => Exercise.findByIdAndDelete(exercise))
                }))
            user.receipes.map(receipe => Receipe.findByIdAndDelete(receipe))
        })
        .catch(err => res.status(404).json({ error: 'No such a user' }));
});

module.exports = router;