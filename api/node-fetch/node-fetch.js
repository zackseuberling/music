const axios = require("axios");

exports.handler = async function (event, context) {
  try {
    const response = await axios.get(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}`,
      {
        params: {
          view: "Grid view",
        },
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
        },
      }
    );

    if (!response.statusText === "OK") {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }

    const data = response.data;

    return {
      statusCode: 200,
      body: JSON.stringify({ records: data.records }),
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
