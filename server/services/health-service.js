import sequelize from "../database/config.js";

export const healthCheck = async(req,res)=>{
    sequelize.authenticate()
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      res.status(503).send();
    });
}