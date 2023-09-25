const {add,update,remove,getOne,getAll} = require("../controller/nonprofit");

module.exports = (router) => {
  router.post("/addNonProfit", add);
  router.post("/updateNonProfit", update);
  router.delete("/removeNonProfit",remove)
  router.get("/getNonProfit",getOne)
  router.get("/getAllNonProfit",getAll)
};
