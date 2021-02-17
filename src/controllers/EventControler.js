const Event = require('../models/Events');
const User = require('../models/User');


module.exports = {
    async createEvent (req, res) {
        const { title, description, price } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id)

        if(!user) {
            return res.status(400).json({ message: 'User does not exist!' });
        }

        const event = await Event.create({
            title,
            description,
            price,
            user: user_id
        })

    }
}