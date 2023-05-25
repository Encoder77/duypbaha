const logout = (req, res) => {
    res.clearCookie("isAdmin");
    res.redirect("/");
}
module.exports = logout;