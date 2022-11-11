import React, { useState } from 'react';
import './Login.css';

import authStore from '../utils/authStorage';

function Helpout(){
    const [genericName, setGenericName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [zipcode, setZIPCode] = useState('');
    const [email, setEmail] = useState('');
    return (
        <>
            <div className='text-center'>
            <form className="form-signin">
                <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                <h3 className="h3 mb-3 font-weight-normal">Donate</h3>
                <p className="mb-3 font-weight-normal"></p>
                <label for="inputName" className='sr-only'>Enter what you'd like to donate</label>
                <input type="text" id="inputName" className="form-control" placeholder="generic name" required autofocus onChange={
                    (event) => {
                        setGenericName(event.target.value);
                    }
                } />
                <label for="inputQuantity" className="sr-only">Quantity</label>
                <input type="number" id="inputQuantity" className="form-control" placeholder="2" required onChange={(e) => {
                    setQuantity(e.target.value);
                }} />
                <label for="inputZIPCode" className="sr-only">ZIP Code</label>
                <input type="number" id="inputZIPCode" className="form-control" placeholder="Enter ZIP Code" required onChange={(e) => {
                    setZIPCode(e.target.value);
                }} />
                <label for="inputEmail" className="sr-only">Email Address</label>
                <input type="email" id="inputZIPCode" className="form-control" placeholder="Email Address (we can update you)" required onChange={(e) => {
                    setEmail(e.target.value);
                }} />
                <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={(e) => {
                    e.preventDefault();
                    //doLogin();
                }}>Submit</button>
                </form>
            </div>
        </>
    )
}

export default Helpout;