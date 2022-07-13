const { User, Thought } = require("../models");

const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thought',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //get 1 user
    getOneUser({ params }, res) {
        User.findOne({_id: params.id })
        .populate({
            path: 'thought',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // post new user
    createUser({ body }, res){
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    
    //put to update user by id
    //delete user by id * bonus - remove thoughts when deleted

    // /api/users/:userId/friends/:friendId
    //post new friend to friends list
    //delete a friend from friends list
};

module.exports = userController;