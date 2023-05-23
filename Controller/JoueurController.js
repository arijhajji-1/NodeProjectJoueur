


const express = require('express');
const joueur = require('../models/Joueur');
const partie = require ('../models/Partie')
const router = express.Router();


//add
exports.add = async (req,res)=>
{

 

    try{
        const newjoueur = new joueur({
            pseudo: req.body.pseudo,

            sante: 100,
            score: 0
        });

        const result = await newjoueur.save();
        res.send({response:result, message:"joueur is saved"});
    }
    catch(error){
        res.send({message:"there is an error"});

    }
}

//update a user by id

// exports.modify = async (req, res) => {
//     try {
//       const id = req.params.id;
//       const updatedUser = {
//         name: req.body.name,
//         email: req.body.email,
//         cin: req.body.cin,
//         image: req.file.originalname,
//         telephone: req.body.telephone
//       };
  
//       const result = await user.updateOne({ _id: id }, updatedUser);
      
//       if (result.nModified === 0) {
//         return res.status(404).send({ message: "User not found or no changes applied." });
//       }
      
//       res.send({ message: "User is modified successfully." });
//     } catch (error) {
//         console.error(error); // Log the error message

//       res.status(500).send({ message: "An error occurred while updating the user." });
//     }
//   };
  



//remove
exports.remove= async (req,res)=>
{
    try{
        const id = req.params.id;
        const result = await joueur.deleteOne({_id:id});
    
        res.send({message:"user is deleted"});
    }
    catch(error){
        res.send({message:"there is no user with this id"});
    }

}
//get all

exports.getAll= async (req,res)=>
{
    try{
        const result = await joueur.find();
        res.send({response:result, message:"users are found"});
    }
    catch(error){
        res.send({message:"there is no user"});
    }
}

//get one
exports.getOne= async (req,res)=>
{
    try{
        const id = req.params.id;
        const result = await joueur.findOne({_id:id});
        res.send({response:result, message:"user is found"});
    }
    catch(error){
        res.send({message:"there is no user with this id"});
    }
}
exports.attaque= async (req,res)=>
{
    try{
        const id1 = req.params.id1;
        const id2 = req.params.id2;
        const result1 = await joueur.findOne({_id:id1});
        const result2 = await joueur.findOne({_id:id2});
        const result3 = await joueur.updateOne({_id:id1},{score:result1.score+10});
        const result4 = await joueur.updateOne({_id:id2},{sante:result2.sante-20});
        res.send({response:result3, message:"user is found"});
    }
    catch(error){
        res.send({message:"there is no user with this id"});
    }
}


exports.addPartie= async (req,res)=>
{

const joueur_1 = req.body.joueur_1;
const joueur_2 = req.body.joueur_2;
const result1 = await joueur.findOne({_id:joueur_1});
const result2 = await joueur.findOne({_id:joueur_2});
if(result1 && result2)
{
    try{
        const newpartie = new partie({
            nom:req.body.nom,
            joueur_1:joueur_1,
            joueur_2:joueur_2,
            etat:"en cours"
        });
            
    

        const result = await newpartie.save();
        res.send({response:result, message:"partie is saved"});
    }

    catch(error){
        res.send({message:"there is an error"});

    }
}
else
{
    res.send({message:"there is no user with this id"});
    
}
}

exports.addPartieSocket= async (data)=>
{
   const joueur_1 = data.joueur_1;
    const joueur_2 = data.joueur_2;
    const result1 = await joueur.findOne({_id:joueur_1});
    const result2 = await joueur.findOne({_id:joueur_2});
    if(result1 && result2)
    {
        try{
            const newpartie = new partie({
                nom:data.nom,
                joueur_1:joueur_1,
                joueur_2:joueur_2,
                etat:"en cours"
            });
                
        
    
            const result = await newpartie.save();
            return result;
        }
    
        catch(error){
            return error;
    
        }
    }
    else
    {
        return "there is no user with this id";
        
    }
}


    


