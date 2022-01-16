import React, { useState } from "react";
import {loadStripe} from '@stripe/stripe-js';
import { API } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { onError } from "../lib/errorLib";
import config from "../config";
import BillingForm from "../components/BillingForm";
import { Elements } from "@stripe/react-stripe-js";
import "./Settings.css"

const stripePromise = loadStripe(config.STRIPE_KEY);

export default function Settings() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

	
  function billUser(details) {
    return API.post("notes", "/billing", {
      body: details
    });
  }

  async function handleFormSubmit(storage, { token, error }) {
		if (error) {
			onError(error);
			return;
		}
	
		setIsLoading(true);
	
		try {
			await billUser({
				storage,
				source: token.id,
			});
	
			alert("Your card has been charged successfully!");
			history.push("/");
		} catch (e) {
			onError(e);
			setIsLoading(false);
		}
	}
	
	return (
		<div className="Settings">
			<Elements
				stripe={stripePromise}
				options={{fonts: {
					cssSrc:
						"https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800",
				}}}
			>
				<BillingForm isLoading={isLoading} onSubmit={handleFormSubmit} />
			</Elements>
		</div>
	);
}