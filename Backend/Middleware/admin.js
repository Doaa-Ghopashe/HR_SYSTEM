module.exports = function(req, res) {
    if(req.user.isAdmin){
        // return res.status(403).send('you are not authorized as Admin')
        return res.status(200).send('deleted successfully');
    }
    else {res.status(403).send('you are not authorized')}
};