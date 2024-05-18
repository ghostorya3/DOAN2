const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = req.headers["authorization"];
    token = token.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Missing token" });
    }
    jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.idUser = decoded.data._id;
        next();
    });
}