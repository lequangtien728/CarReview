const Car = require('../models/car');

module.exports = {
    create,
    deleteLike
}

async function create(req, res){
 
    try {
		// Find a car, so we need the id of the car
        const car = await Car.findById(req.params.id);
		
        car.likes.push({username: req.user.username, userId: req.user._id}); //mutating a document
        await car.save()// save it
        res.status(201).json({data: 'like added'})
    } catch(err){
       
        res.status(400).json({err})
    }
    
}

async function deleteLike(req, res){
    try {
        
        const car = await Car.findOne({'likes._id': req.params.id, 'likes.username': req.user.username});
        car.likes.remove(req.params.id) // mutating a document
		console.log(car, " <-= car in delete!")
        // req.params.id is the like id 
        await car.save() // after you mutate a document you must save
        res.json({data: 'like removed'})
    } catch(err){
        res.status(400).json({err})
    }
}