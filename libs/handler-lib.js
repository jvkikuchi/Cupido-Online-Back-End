export default function handler(lambda) {
  return async function (event, context) {
    let body;
    let statusCode;

    try {
      body = await lambda(event, context);
      statusCode = 200;
    } catch (err) {
      body = { error: err.message };
      statusCode = 500;
    }

    return {
      statusCode,
      body: JSON.stringify(body),
    };
  };
}