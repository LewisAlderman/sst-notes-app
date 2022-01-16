import {APIGatewayProxyHandler} from "aws-lambda";
import * as debug from "./debug";

export default function (lambda) {
	const handler: APIGatewayProxyHandler = async (event, context) => {
		let body, statusCode;
		
		debug.init(event);

		try {
			body = await lambda(event, context);
			statusCode = 200
		} catch (err) {
			debug.flush(err);

			body = {error: err.message}
			statusCode = 500
		}

		return {statusCode, body: JSON.stringify(body), headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": true
		}}
	}

	return handler;
}