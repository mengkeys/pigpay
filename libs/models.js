/**
 * Created by mengkeys on 16-9-23.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrderSchema = new Schema({

});


var UserSchema = new Schema({

});



var OrderModel = mongoose.model('Order', OrderSchema);

var UserModel = mongoose.model('User', UserSchema);


/* 扩展方法 */