import React from 'react';
import videoHomePage from '../../assets/video-homepage.mp4';

const HomePage = () => {
    return (
        <div className='homepage-container container'>
            <div className="row home-content">
                <div className="col-6">
                    <video  autoPlay muted loop>
                        <source src={videoHomePage} type="video/mp4" />
                    </video>

                </div>
                <div className="col-6 home-content-right">
                    <h1>Forms that break the norm</h1>
                    <p>Get more data—like signups, feedback, and anything else—with forms <br /> designed to be <strong>refreshingly different.</strong></p>
                    <button>Get started</button>

                </div>
            </div>
            {/* <div className="homepage-container">
            </div> */}
        </div>
    );
};

export default HomePage;