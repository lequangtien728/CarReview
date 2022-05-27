const Car = require('../models/car');

module.exports = {
    create,
    deleteComment,
    
}

async function create(req, res){
 console.log(req.body)
    try {
		// Find a car, so we need the id of the car
        const car = await Car.findById(req.params.id);
		// console.log(req,'cooommmmm')
        car.comments.push({comment: req.body.comment, userId: req.user._id}); //mutating a document
        await car.save()// save it
        res.status(201).json({data: car.comments})
    } catch(err){
       
        res.status(400).json({err})
    }
    
}

async function deleteComment(req, res){
    try {
        
        const car = await Car.findOne({'comments._id': req.params.id, 'comments.username': req.user.username});
        car.comments.remove(req.params.id) // mutating a document
		console.log(car, " <-= car in delete!")
        // req.params.id is the car id 
        await car.save() // after you mutate a document you must save
        res.json({data: 'comment removed'})
    } catch(err){
        res.status(400).json({err})
    }
}