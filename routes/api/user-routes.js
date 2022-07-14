const router = require('express').Router();
const { getAllUsers, getOneUser, createUser, updateUser, deleteUser, addFriend, deleteFriend } = require('../../controllers/user-controller');

//api/users
router
.route('/')
.get(getAllUsers)
.post(createUser);

router
.route('/:id')
.get(getOneUser)
.put(updateUser)
.delete(deleteUser);

router
.route('/:id/friends/:friendId')
.post(addFriend)
.delete(deleteFriend)

module.exports = router;