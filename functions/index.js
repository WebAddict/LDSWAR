'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Moments library to format dates.
const moment = require('moment');
// CORS Express middleware to enable CORS Requests.
const cors = require('cors')({origin: true});


exports.calcPoints = functions.database.ref('/points/{uid}/history/{historyId}').onWrite(event => {
  // https://github.com/firebase/functions-samples/blob/master/child-count/functions/index.js
  // Only edit data when it is first created.
  if (event.data.previous.exists()) {
    //console.log('Already exists - Only edit data when it is first created.' + event.data.previous.val());
	//return;
  }
  // Exit when the data is deleted.
  if (!event.data.exists()) {
    //console.log('deleted - Only edit data when it is first created.');
	//return;
  }
  // Exit when there are no points or type assigned
  //if (!event.data.ref.child('type').exists() || !event.data.ref.child('pointValue').exists()) {
  //  console.log('Exit when there are no points or type assigned');
  //  return;
  //}
  const type = event.data.ref.child('type').val();
  const points = event.data.ref.child('pointValue').val();
  const userPointsRef = event.data.ref.parent;
  const totalPointsRef = userPointsRef.child('totalPoints');
  const addedPointsRef = userPointsRef.child(type);
  console.log('type: ' + type + ' points: ' + points);

  // Return the promise from userPointsRef.transaction() so our function 
  // waits for this async event to complete before it exits.
  return userPointsRef.transaction(current => {
	if (current.child(type).exists()) {
	}
    if (event.data.exists() && !event.data.previous.exists()) {
	  current.child('totalPoints').set((current.child('totalPoints').val() || 0) + points);
      return current;
    }
    else if (!event.data.exists() && event.data.previous.exists()) {
      current.child('totalPoints').set((current.child('totalPoints').val() || 0) - points);
      return current;
    }
  });

});
