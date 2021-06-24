// eslint-disable-next-line import/no-unresolved
import sanityClient from '@sanity/client';
// eslint-disable-next-line import/no-unresolved
import MailGun from 'mailgun-js';

const client = sanityClient({
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET,
  token: process.env.SANITY_READ_TOKEN, // just querying info for emails
  useCdn: false,
});

module.exports = async (req, res) => {
  // get around cors preflight options request for local dev
  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'Content-Type': 'application/json',
  };
  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers).end();
    return;
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  if (!req.body) {
    console.error('Error no post body');
    res.status(400).json({ error: 'Bad request' });
    return;
  }

  const { target, sender, message } = req.body;
  if (target && sender) {
    try {
      const query = '*[_type == "student" && _id == $studentId] {name, email}';
      const params = { studentId: target };
      let studentEmail = '';

      await client.fetch(query, params).then((student) => {
        if (student) {
          studentEmail = student[0].email;
        } else {
          console.log('Not able to find the matching student!');
          res.json({
            status: 404,
          });
          return;
        }
      });

      const mailgun = new MailGun({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
      });

      const renderedHtml = `<html><body>
                            <p><strong>Contact's Name: </strong>${sender.name}</p>
                            <p><strong>Contact's Email Address: </strong>${sender.email}</p>
                            <p><strong>Contact's Phone Number: </strong>${sender.phone}</p>
                            <p>${message}</p>
                            </body></html>`;

      const data = {
        from: process.env.MAILGUN_SENDING_EMAIL,
        to: studentEmail,
        cc: process.env.SPRING_SHOW_CC_EMAIL,
        bcc: process.env.SPRING_SHOW_BCC_EMAIL,
        subject: 'Industry Interest & Inquiry From Spring Show 2021 Website',
        html: renderedHtml,
      };

      await mailgun.messages().send(data);
      res.json({
        body: 'Success!',
      });
    } catch (error) {
      console.error(`Error when sending mail: ${error.message}`);
      console.error(error.stack);
      res.status(500).json({ error: error.message });
    }
  } else {
    console.error('Error no params');
    console.error(req.body);
    res.status(400).json({ error: 'Bad request' });
  }
};
