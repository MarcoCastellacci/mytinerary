import React from 'react';
import CallToAction from '../componentes/banner';

import '../style/index.css';
import Carrousel from '../componentes/carrousel';


export default function Index() {
    return (
        <>
            <div className="main">
                <div className="call">
                    <CallToAction />
                </div>
                <div className="carrousel">
                    <Carrousel />
                </div>
            </div>

        </>
    )
}