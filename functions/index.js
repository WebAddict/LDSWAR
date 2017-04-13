'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Moments library to format dates.
const moment = require('moment');
// CORS Express middleware to enable CORS Requests.
const cors = require('cors')({origin: true});


exports.calcPoints = functions.database.ref('/points/{uid}/history/{historyId}').onWrite(event => {
  const uid = event.params.uid;
  const userPointsRef = event.data.ref.parent.parent;

  // DELETED EVENT - recalculate all
  if (!event.data.exists()) {
    return userPointsRef.once('value').then(function(userPointsSnapshot) {
      var totalPoints = 0;
      return userPointsRef.child('history').once('value').then(function(historySnapshot) {
        historySnapshot.forEach(function(childSnapshot) {
          if (childSnapshot.child('pointValue').exists()) {
            var newPoints = childSnapshot.child('pointValue').val();
            var newTotalPoints = totalPoints + newPoints;
            console.log('totalPoints: ' + totalPoints + '+' + newPoints +' = ' + newTotalPoints);
            totalPoints = newTotalPoints;
          }
        });
        console.log('FINAL totalPoints: ' + totalPoints);
        return userPointsRef.child('totalPoints').set(totalPoints);
      });
    });
//    return userPointsRef.child('totalPoints').transaction(current => {
//      current = 0;
//      return userPointsRef.child('history').once('value').then(function(historySnapshot) {
//        historySnapshot.forEach(function(childSnapshot) {
//          //console.log(childSnapshot);
//          if (childSnapshot.child('pointValue').exists()) {
//            current += childSnapshot.child('pointValue').val();
//          }
//        });
//        return current;
//      });
//    });
  }
  // EDITED EVENT
  if (event.data.previous.exists()) {
    console.log('done: Already exists - Only edit data when it is first created.' + event.data.previous.val());
	return;
  }
  // NEW EVENT
  const historyItem = event.data.val();
  const type = historyItem.type;
  const pointValue = historyItem.pointValue;
  console.log('type: ' + type + ', pointValue: ' + pointValue);

  return userPointsRef.child('totalPoints').transaction(current => {
    current += pointValue;
    return current;
  });

  //return userPointsRef.once('value').then(function(userPointsSnapshot) {
  //    const totalPoints = userPointsSnapshot.val().totalPoints;
  //    console.log('points before update: ' + totalPoints + ', type: ' + type + ', pointValue: ' + pointValue);
  //    return userPointsRef.update({ totalPoints: (pointValue+totalPoints) });
  //});
  
/*
  // Return the promise from userPointsRef.transaction() so our function 
  // waits for this async event to complete before it exits.
  return userPointsRef.transaction(current => {
	//if (current.child(type).exists()) {
	//}
	return current.child('rich').set('hi');
    if (event.data.exists() && !event.data.previous.exists()) {
	  current.child('totalPoints').set((current.child('totalPoints').val() || 0) + pointValue);
      return current;
    }
    else if (!event.data.exists() && event.data.previous.exists()) {
      current.child('totalPoints').set((current.child('totalPoints').val() || 0) - pointValue);
      return current;
    }
  });
*/
});
