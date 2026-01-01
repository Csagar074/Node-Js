
const home = (req, res) => {
    return res.render('home');
};

const about = (req, res) => {
    return res.render('about');
};

module.exports = {
    home,
    about
};