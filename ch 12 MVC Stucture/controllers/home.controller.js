const homePage=(req,res)=>{
    return res.render('home');
}

const aboutPage=(req, res)=>{
    return res.render('about');
}

const contectPage=(req, res)=>{
    return res.render('contect');
}
module.exports ={
    homePage,
    aboutPage,
    contectPage
}