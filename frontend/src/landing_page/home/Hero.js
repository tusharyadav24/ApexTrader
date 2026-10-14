
import React from 'react';
function Hero() {
    return (
        <div className='container p-5 mb-5'>
           <div className='row text-center'>
             <img src="/assets/homeHero.png" alt='' className='mb-5'/>
             <h1 className='mt-5'>Invest in everything</h1>
             <p>Online plateform to invest in stocks,mutual funds and more</p>
             <button className='btn btn-dark sign-up-btn mb-5'><b>Signup Now</b></button>
           </div>
        </div>
    );
}

export default Hero;