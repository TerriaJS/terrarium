const fs = require('fs');
const root = require('./terrarium/root');

fs.writeFileSync('wwwroot/init/terrarium-new.json', JSON.stringify(root));
