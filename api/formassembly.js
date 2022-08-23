import axios from 'axios';
import fetch from 'node-fetch';

/* 
 * Vercel serverless functions (API):
 * https://vercel.com/docs/concepts/functions/serverless-functions/supported-languages#node.js
 */ 


module.exports = async (req, res) => {
  // get around cors Pre-Flight options request for cross domain, e.g., local dev
  // https://stackoverflow.com/questions/53298478/has-been-blocked-by-cors-policy-response-to-preflight-request-doesn-t-pass-acce
  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'Content-Type': 'application/json'
  };
  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers).end();
    return;
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  try {
    const { formID } = req.body;
    // const formID = 304;

    /* using fetch */
    // const response = await fetch('https://artu.tfaforms.net/rest/forms/view/304', {mode: 'no-cors'});
    // const html = await response.text();

    /* using axios */
    const response = await axios({
      url: `https://artu.tfaforms.net/rest/forms/view/${formID}`,
      method: 'GET'
    });
    const html = response.data;

    // console.log(`*** SVU: typeof response is: ${typeof response}`);
    // console.log(`*** SVU: response is: `, response);
    // console.log(`*** SVU: axios html is:`,html);
    // console.log(`*** SVU: repsonding from my-academy-web`);

    /* return just the data */
    await res.status(200).send(html);

  } catch (error) {
    console.error(`Error caught in /api/formassembly.js: ${error.message}`);
    console.error(error.stack);
    res.status(500).json({ error: error.message })
  }
};
