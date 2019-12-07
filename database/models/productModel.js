const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    prize: Number,
    brand: String
}, {
    timestamps: true,
    toObject: {
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
}
);

module.exports = mongoose.model('Product', ProductSchema);