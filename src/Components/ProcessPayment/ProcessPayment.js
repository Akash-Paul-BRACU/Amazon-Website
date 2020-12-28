import React from 'react';
import { Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import SplitCardForm from './SimpleCardForm';
import SimpleCardForm from './SimpleCardForm';

const stripePromise = loadStripe('pk_test_51I2bGHGxkWpX5rVG2xYKw4Vpg0ZkuonLw6OHnEqeJOVhiwaGG6GBQPv1pSboSJwS8KODKtM9fjMrr2Q6DtFTNNys00hpoERYk2');
const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            
      
      <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
    </Elements>
    );
};

export default ProcessPayment;