const { User } = require("../models/user");
const { ctrlWrapper } = require("../utils");


const updateSubscription = ctrlWrapper(async(req, res) => {
    const { id, email } = req.user;
    const { subscription } = req.body;

    await User.findByIdAndUpdate(id, { subscription });

    res.status(200).json({
      email,
      subscription,
    });
})

module.exports = {
    updateSubscription
}