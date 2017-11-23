var client = require("./Connect.js");

client.cluster.health({},function(err,resp,status) {
    console.log("-- Client Health --",resp);
});
});
