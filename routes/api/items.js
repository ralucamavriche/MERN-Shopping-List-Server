const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Item Model
const Item = require('../../models/Item');

//@routes GET api/items
//@desc Get All Items
//@acceSs Public
router.get('/', (req, res) => {
    Item.find()
    .sort({date: -1})
    .then(items => res.json(items));
});

//@routes POST api/items
//@desc Create A Item
//@acceSs Private
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

//@routes DELETE api/items
//@desc Delete A Item
//@acceSs Private
router.delete('/:id', auth,  (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
})


module.exports = router;