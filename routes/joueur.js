
const express = require("express");

const router = express.Router();
const {
    add,
  getOne,
  remove,
  attaque,
  addPartie


} = require("../Controller/JoueurController");

router.post("/newjoueur",add);
router.get("/getjoueur/:id", getOne);
// router.get("/getAll", getAll);
// router.put("/modify/:id", upload.single("image") ,modify);
 router.delete("/deleteJoueur/:id", remove);
 router.put("/attaque/:id1/:id2",attaque);
 router.post("/newpartie",addPartie);
// router.get("/getbyid/:id", getById);
// router.get("/getbyname/:name", getByName);
// router.get("/getbyemail/:email", getByEmail);
// router.get("/getbycin/:cin", getByCin);
// router.delete("/deleteAll",removeAll);


module.exports = router;



