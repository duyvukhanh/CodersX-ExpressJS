module.exports.cookieCount = function (req, res, next) {
    req.cookies.cookie += 1
    console.log(req.cookies)
    next();
}