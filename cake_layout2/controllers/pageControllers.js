const { getNewProducts, getTopProducts } = require('../models/cakeModel');

exports.home = async (req, res, next) => {
    try {
        const [newProducts, topProducts] = await Promise.all([
            getNewProducts(),
            getTopProducts(),
        ]);

        res.render('home', { newProducts, topProducts });
    } catch (error) {
        next(error);
    }
};

exports.about = (req, res) => {
    res.render("about")
}


exports.contact = (req, res) => {
    res.render("contact")
}