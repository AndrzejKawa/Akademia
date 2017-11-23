var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200/',
    log: 'trace'
});

function initMapping(_index,_type) {
    return client.indices.putMapping({
        index: _index,
        type: _type,
        body: {
            properties: {
                id: {type: "integer"},
                name: { type: "text" },
                price:{type: "double"},
                description: { type: "string" },
                status: {type: "text"},
                quantity: {type: "integer"},
                category: {type: "text"},
                tags: {type: "text"}
            }
        }
    });
}
exports.initMapping = initMapping;