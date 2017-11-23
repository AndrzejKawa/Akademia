var elasticsearch = require('elasticsearch');
var Math = require('mathjs');
var client = new elasticsearch.Client({
    host: 'localhost:9200/',
    log: 'trace'
});

var categories = ['Phone','PC','Tablet'];
var tags = ['Nokia','Samsung','AMD','Intel','Gigabyte','Dell','HP','Apple','Android','Peach'];
var status = ['Niedostepny','Dostepny']

var i = 0,j = 0;
var randQuantity,randPrice;



module.exports = {
    addOne: function addOne(_index,_type,_id,_name, _price, _description, _status, _quantity, _cat_name, _tags) {
        client.index({
            index: _index,
            type: _type,
            body: {
                properties: {
                    id: _id,
                    name: _name,
                    price: _price,
                    description: _description,
                    status: _status,
                    quantity: _quantity,
                    category: _cat_name,
                    tags: _tags,
                }
            }
        })
    },
    //'test',1002,'Laptop Dell',200,'Lapek','Niedostepny',0,'PC',['Tak','PC','Laptop']
    test: function test() {
      this.addOne('electronics','Product','1001','Laptop Dell',200,'Laptop','Dostepny',10,'PC',['Dell,PC,Laptop']);
    },
    addAll: function addAll() {
        i = 0,j = 0;
        while (i < 3) {
            while (j < 20) {
                randPrice = Math.floor((Math.random() * 3000) + 1);
                randQuantity = Math.floor((Math.random() * 20) + 1);
                console.log('i = '+i+'j = '+j);
                this.addOne('electronics','Product',((1+i) * 1000) + j+1, "Phone" + j, randPrice, "Fajny" + Math.floor(Math.random() * 4) + 1, status[Math.floor(Math.random() * 2)], randQuantity, categories[i], [tags[Math.floor(Math.random() * 5)], tags[Math.floor(Math.random() * 5) + 5]]);
                j++;
            };
            i++;
            j = 0;
        };
    }
};

