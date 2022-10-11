const scheduler = require("./scheduler.js");
const functions = require("firebase-functions");
const { initializeApp } = require("firebase-admin/app");

initializeApp();

const cronTime = "0 0 * * *";
const timezones = {
  LAGOS: "Africa/Lagos",
};

// replicate this with differ timezone and export name
// exports.scheduler[zone] = replica
exports.schedulerLagos = functions.pubsub
  .schedule(cronTime)
  .timeZone(timezones.LAGOS)
  .onRun((context) => {
    scheduler(timezones.LAGOS);
  });
