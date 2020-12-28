import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    //console.log(props.product);
    const { img, name, seller, price, key} = props.product
    return (
        <div className="product">
            <div className="col-md-4">
                <img src={img} alt="" />
            </div>
    <div  className="col-md-6">
                <h1 className="product-name"><Link to={"/product/"+key}>{name}</Link></h1>
                <h3 className="product-name">by{seller}</h3>
                <h4 className="product-name">Price:${price}</h4>
               {props.showAddToCart===true && <button 
                onClick = {() => props.handleAddProduct(props.product)}
                className="main-button"> <FontAwesomeIcon icon={faShoppingCart} />Add to Cart</button>}
            </div>
        </div>

    );
};

export default Product;