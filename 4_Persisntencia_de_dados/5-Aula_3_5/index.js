if (process.env.PRD !== 'true') require('dotenv').config();
console.log(process.env.USERDB);
