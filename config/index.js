const {version,name}=require('../package.json');

module.exports={
    VERSION: process.env.VERSION || version,
    PORT: process.env.PORT || 3000,
}