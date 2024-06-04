const User = require('../models/user')

module.exports.renderRegister =  (req, res) => {
    res.render('users/register');
}

module.exports.register =  async (req, res) => {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    try {
        const registeredUser = await User.register(user, password); // used for hashing mainly in passport
       // console.log(registeredUser);
       req.login(registeredUser,err=>{
        if(err) return next();
        req.flash('success', 'Welcome to Yelp Camp!');
        res.redirect('/campgrounds'); // Corrected the typo in the redirect URL
       })
       
    } catch (err) {
        console.error(err);
        req.flash('error', err.message);
        res.redirect('/register'); // Redirect to the registration page in case of an error
    }
}

module.exports.renderLogin= (req,res)=>{
    res.render('users/login')
 }

 module.exports.login = (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
     res.redirect(redirectUrl);
}



module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            // Handle the error appropriately, such as sending an error response to the client
            return res.redirect('/campgrounds');
        }

        req.flash('success', 'GoodBye!');
        res.redirect('/campgrounds');
    });
}