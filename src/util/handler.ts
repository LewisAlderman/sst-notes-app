import {APIGatewayProxyHandler} from "aws-lambda";

export default function (lambda) {
	const handler: APIGatewayProxyHandler = async (event, ctx) => {
		let body, statusCode;

		try {
			body = await lambda(event, ctx);
			statusCode = 200
		} catch (err) {
			console.error(err)
			body = {error: e.message}
			statusCode = 500
		}

		return {statusCode, body: JSON.stringify(body)}
	}

	return handler;
}