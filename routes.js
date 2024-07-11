const express = require("express")
const router = new express.Router()
const ExpressError = require("./expressError")
const items = require("./fakeDb")

router.get('/',function(req,res){
    res.json({items})
})

router.post('/',function(req,res,next){
    try{
        if(!req.body.name || !req.body.price){
            throw new ExpressError("Name and Price is required", 400);
        }
        //creates new from passed json data via post req
        const newItem = {name: req.body.name, price: req.body.price}
        //pushes it into the fake db []
        items.push(newItem)
        return res.status(201).json({item:newItem})
    }catch(e){
        return next(e)
    }
});

router.get('/:name',function(req,res){
    //finds item by name svaed to variable
    const foundItem = items.find(item=>item.name===req.params.name)
    if(foundItem===undefined){
        throw new ExpressError("Item doesnt exist",404)
    }
    //json resp with that item
    res.json({item:foundItem})
});

router.patch('/:name',function(req,res){
    const foundItem = items.find(item=>item.name===req.params.name)
    if(foundItem===undefined){
        throw new ExpressError("Item doesnt exist",404)
    }
    //patches name and or price
    foundItem.name = req.body.name
    foundItem.price = req.body.price
    //returns json resp
    res.json({item:foundItem})
});

router.delete('/:name',function(req,res){
    //finds by index in items for deletion
    const foundItem = items.findIndex(item=>item.name===req.params.name)
    if(foundItem === -1){
        throw new ExpressError("Item doesnt exist",404)
    }
    //only one item removed at that index of itself
    items.splice(foundItem,1)
    res.json({message:"Deleted"})
})

module.exports = router;