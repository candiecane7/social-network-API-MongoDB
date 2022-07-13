const { User, Thought } = require('../models');

const thoughtController = {
    //get all thoughts
    getAllThought(req, res){
        Thought.find({})
        .populate({
            
        })
    }
    
    //get a single thought by id
    //post a new thought
    //put thought update by id
    //delete thought

    // /api/thoughts/:thoughtId/reactions
    //post reaction
    //delete reaction
}