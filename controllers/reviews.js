const Car = require('../models/car');

module.exports = {
    create,
    
}

async function create(req, res){
 
    try {
		// Find a car, so we need the id of the car
        const car = await Car.findById(req.params.id);
		
        car.reviews.push({content: req.user.content, userId: req.user._id}); //mutating a document
        await car.save()// save it
        res.status(201).json({data: 'like added'})
    } catch(err){
       
        res.status(400).json({err})
    }
    
}