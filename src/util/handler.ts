export default function (lambda) {
	return async function (evt, ctx) {
		let body, statusCode;

		try {
			body = await lambda(evt, ctx);
			statusCode = 200
		} catch (err) {
			console.error(err)
			body = {error: e.message}
			statusCode = 500
		}

		return {statusCode, body: JSON.stringify(body)}
	}
}