var elasticsearch = require('elasticsearch');

var log = console.log.bind(console);

var client = new elasticsearch.Client({
    host: 'localhost:9200/',
    log: 'trace'
});



module.exports = {
    search: function search(_index,_data) {

        return client.search({
            size: 120,
            index: _index,
            type: 'Product',
            body: {
                query: {
                    query_string:{
                        query: _data,
                    }
                },
            },

        })
    }
};

