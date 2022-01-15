import {APIGatewayProxyHandler} from "aws-lambda";

export default function (lambda) {
	const handler: APIGatewayProxyHandler = async (evt, ctx) => {
		let body, statusCode;

		try {
			body = await lambda(evt, ctx);
			statusCode = 200
		} catch (err) {
			console.error(err)
			body = {error: e.message}
			statusCode = 500
		}

		return {statusCode, body: JSON.stringify(body), headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": true
		}}
	}

	return handler;
}