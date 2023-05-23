const mongo = require('mongoose');
const schema = mongo.Schema; 

var Joueur = new schema({
   pseudo: String,
   sante:Number,
   score:Number
}); 
module.exports = mongo.model("joueur", Joueur)
