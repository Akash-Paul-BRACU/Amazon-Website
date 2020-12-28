import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
   //console.log(cart);
    //const total = cart.reduce((total, prd) => total + prd.price, 0);
    let total =0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity || 1;
        
    }

    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.99;
    }
    else if (total > 0) {
        shipping = 4.99;
    }

    const tax = total / 10;
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
        <div>
            <h1 className="text-danger product-name col-md-3">Order Summary</h1>
            <h3 className="product-name">Items Ordered:{cart.length}</h3>
            <h3 className="product-name">Product Price:{formatNumber(total)}</h3>
            <h3 className="product-name">TAX + VAT: {tax}</h3>
            <h3 className="product-name">Shipping Cost:{shipping}</h3>
            <h5 className="product-name">Total Price: {grandTotal}</h5>
           {
               props.children
           }
            
        </div>
    );
};

export default Cart;