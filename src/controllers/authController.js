const { env } = require('process')
const jwt = require('jsonwebtoken');

const getAuth = async (req, res) => {
    try {
        const {token} = req.body;
        const {login, password} = jwt.decode(token)
        if(login == env['LOGIN'] && password == env['PASSWORD']){
            return res.status(200).json({message: "OK"})
        }
    } catch (error) {
            return res.status(500).json({error: "Internal server error"})
    }
}

const isAuth = async (req, res) => {
  try {
        const {login, password} = req.body;
        if(login == env['LOGIN'] && password == env['PASSWORD']){
            const privateKey = env['SECRET_KEY']
            const token = jwt.sign({login, password}, privateKey)
            return res.status(200).json({message: "Successfull", token})
        }else{
            return res.status(400).json({error: "Incorrect username or password"})
        }
    } catch (error) {
            return res.status(500).json({error: "Internal server error"})
    }
};

module.exports = {
    isAuth,
    getAuth
};
