module.exports = (func) => {
  const topics = require("../controllers/topicsController.js");   

  var router = require("express").Router();   
                                              
  router.post("/", topics.create);          
  router.get("/", topics.findAll);          
  router.get("/:id", topics.findOne);       
  router.put("/:id", topics.update);        
  router.delete("/:id", topics.delete);     
  router.delete("/", topics.deleteAll);     

  func.use("/api/topics", router);   
};
