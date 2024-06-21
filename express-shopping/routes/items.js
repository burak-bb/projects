const express = require('express');
const router = express.Router()

let shopItems = [{name: 'popsicle', price: 1.45}, {name: 'cheerios', price: 3.40}]


router.get('/', (req, res)  => {
    res.json(shopItems)
})

router.get('/:name', (req, res)  => {
    item = shopItems.filter(item => item.name == req.params.name)
    res.json(item)
})

router.post('/', (req, res) => {
    let newItems = req.body
    shopItems.push(newItems);
    res.json({ message: 'Added', newItems})
})

router.patch('/:name', (req, res) => {
    const itemName = req.params.name
    const updates = req.body

    const oldItem = shopItems.find(item => (item.name == itemName));
    Object.assign(oldItem, updates)

    res.json({message: "Updated", updates})
})

router.delete('/:name', (req, res) => {
    const deletingItem = req.params.name
    const index = shopItems.findIndex(item => item.name == deletingItem)
    shopItems.splice(index, 1)
    res.json({message: "Deleted"})
})



module.exports = router 