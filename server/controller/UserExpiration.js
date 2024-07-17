const schedule = require('node-schedule');
const moment = require('moment');

module.exports = function(db) {
  const codesCollection = db.collection('codes');
  const redeemcodesCollection = db.collection('redeemcodes');

  // Schedule the job to run every hour
  schedule.scheduleJob('0 * * * *', async function() {
    console.log('Running the scheduled job');

    const currentDate = moment();

    // Find all documents with status 'Availed'
    const cursor = redeemcodesCollection.find({ status: 'Availed' });

    while (await cursor.hasNext()) {
      const document = await cursor.next();

      if (moment(document.purchase_date).isBefore(currentDate)) {
        // Update redeemcodes collection
        await redeemcodesCollection.updateOne(
          { code: document.code },
          { $set: { status: 'Expired' } }
        );

        // Update codes collection
        await codesCollection.updateOne(
          { code: document.code },
          { $set: { expired: true } }
        );

        console.log(`Updated code ${document.code} to expired`);
      }
    }
  });
};
