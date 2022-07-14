const { User, Thought } = require('../models');

const thoughtController = {
    //get all thoughts
    getAllThought(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err));
    },

    //get a single thought by id
    getOneThought({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with that id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    //post a new thought
    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    //put thought update by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId }, body, { new: true, runValidators: true})
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({ message: 'No thought associated with this id'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
},
    //delete thought
 removeThought({params}, res){
    Thought.findOneAndDelete({_id: params.thoughtId})
    .then(dbThoughtData => {
        if(!dbThoughtData){
            res.status(404).json({ message: 'No Thought associated with this id'});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
 },

    // /api/thoughts/:thoughtId/reactions
    //post reaction
    addReaction({ params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $push: {reactions: body}},
            { new: true, runValidators: true}
        )
        .then(dbReactionData => {
            if(!dbReactionData){
                res.status(404).json({ message: 'No thought associated with this id'});
                return;
            }
            res.json(dbReactionData);
        })
        .catch(err => res.status(400).json(err));
    },

    //delete reaction
    removeReaction({ params }, res){
        Thought.findByIdAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId }}},
            { new: true }
        )
        .then(dbReactionData => res.json(dbReactionData))
        .catch(err => res.status(400).json(err));
    }
};

module.exports = thoughtController;