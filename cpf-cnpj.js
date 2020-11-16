// Libraries funcionais: ["Axios"]
// Para adicionar uma library via NPM, fale com o administrador do sistema.
const sendCNPJ = require("../plugins/cpf-cnpj/plugin_1.js")
function getFunction(req, res,next) {
  if(req.query.cpfCnpj){
      sendCNPJ(req.query.cpfCnpj,res)

  }else{
    res.send({"error":"empty cpfCnpj"})
  }
  next();
  }
function postFunction(req, res,next) {
  res.send("post ready"); 
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

// Plugin 1 -------------------------------------------------------------------
const axios = require("axios");

async function callSuperlogica(cpfcnpj,res){
  route = `http://apps.superlogica.net/imobiliaria/api/proprietarios?cpfCnpj=${cpfcnpj}`
  let app_token = "76dd111f-a350-3158-b553-3f9d5c30e119"
  let access_token = "312fb4ca-252d-3218-a662-9455a25538e5"
  let result = await axios.get(route,{headers:{app_token,access_token}})
  console.log(result.data)
  res.send(result.data.data[0].st_email_pes)
 
}
module.exports = callSuperlogica ;
