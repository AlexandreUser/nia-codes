// Libraries funcionais: ["Axios"]
// Para adicionar uma library via NPM, fale com o administrador do sistema.
const customDB = require("../plugins/database/model")
const makeId = require("../plugins/createEmail/plugin_1")
userEmail = customDB("userEmail",{email:String,
                                      createdAt:Number,
                                      expireIn:Number,
                                      active:Boolean,
                                      code:String})
async function getFunction(req, res,next) {
  if(req.query.email){
    let result = await userEmail.findOne({email:req.query.email})
    let expired = result.expireIn < Date.now()
    res.send({expired,validated:result.active,code:result.code})
    
  }
  else{
    res.send({"error":"empty email query"})
  }
  next();
  }
function postFunction(req, res,next) {
  if(req.body.email){
    var future = new Date();
   
    let payload = {email:req.body.email,
                  createdAt:Date.now(),
                  expireIn:future.setDate(future.getDate() + 30),
                  active:false,
                  code:makeId(5)
    }
    res.send(userEmail.create(payload))
  }
  else{
    res.send({"error":"empty email field"})
  }
  next();
}
// Função put e delete, não precisam ser alteradas obrigatóriamente :)
function putFunction(req, res,next) {
  res.send("put ready");
  next();
}
function deleteFunction(req, res,next) {
  res.send("delete ready");
  next();
}

module.exports = { getFunction, postFunction, putFunction, deleteFunction };
