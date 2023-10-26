import React from 'react';

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import type {NextPage} from 'next';

import {Page} from '../../src/containers/Page/Page';

// import styles from 'styles/Home.module.css';

const paypalClienId = process.env.PAYPAL_CLIENT_ID;

const Tasks: NextPage = () => {
    return (
        <Page>
            {paypalClienId ? <PayPalScriptProvider options={{ clientId: paypalClienId, intent: 'subscription', vault: true, currency: 'USD' }}>
            <PayPalButtons style={{ layout: "horizontal", shape: "pill", label: "subscribe", color: "black" }} createSubscription={(_data, actions) => {
			return actions.subscription
				.create({
					plan_id: "P-8YP55027XM3365445MU4VRZQ",
				});
		}} />
        </PayPalScriptProvider> : null}
           
        </Page>
    );
};

export default Tasks;
