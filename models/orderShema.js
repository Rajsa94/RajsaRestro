const mongoose = require("mongoose")


const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register',
        required: true
    },
    items: { type: Object, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    paymentType: { type: String, default: 'COD' },
    paymentStatus: { type: Boolean, default: false },
    status: { type: String, default: 'order_placed' },

}, { timestamps: true })

const orderMenu = mongoose.model('orderMenu', orderSchema);

module.exports = orderMenu;