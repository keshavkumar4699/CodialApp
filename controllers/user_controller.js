module.exports.login = function(req, res){
    return res.render('user_profile', {
        title : "Login"
    });
}