exports.home = (req, res) => {
    res.render("index", { newProducts: [], topProducts: [] });
};

exports.about = (req, res) => {
    res.render("about")
}


exports.contact = (req, res) => {
    res.render("contact")
}