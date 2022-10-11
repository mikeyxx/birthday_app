const sendmail  = require('./mail.js');
const { getFirestore, getDocs, collection, where, query } = require('firebase-admin/firestore');

module.exports = function(timezone) {
    const date = new Date();
    getDocs(
        query(collection(getFirestore(), 'birthdays'),
        where('timezone', '==', timezone),
        where('date.day', '==', date.getDay()),
        where('date.month', '==', date.getMonth()))
    ).then(snapshot => {
        snapshot.forEach(doc => {
           sendMail(doc.data()).then(() => doc.delete());
        });
   });
};