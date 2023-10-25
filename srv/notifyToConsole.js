const NotificationService = require('./service');
const cds = require("@sap/cds");
const LOG = cds.log('notifications');
const { buildNotification, doesKeyExist } = require("./../lib/utils");

module.exports = class NotifyToConsole extends NotificationService {
  async init() {
    // call NotificationService's init
    await super.init();
  }

  notify() {

    const notification = buildNotification(arguments[0]);

    if (notification) {
      LOG._info && LOG.info(`SAP Alert Notification Service notification: ${JSON.stringify(notification, null, 2)}`);
      const existingTypes = cds.notifications.local.types;
  
      if (!doesKeyExist(existingTypes, notification["NotificationTypeKey"])) {
        LOG._warn && LOG.warn(
          `Notification Type ${notification["NotificationTypeKey"]} is not in the notification types file`
        );
        return;
      }

      if (!doesKeyExist(existingTypes[notification["NotificationTypeKey"]], notification["NotificationTypeVersion"])) {
        LOG._warn && LOG.warn(
          `Notification Type Version ${notification["NotificationTypeVersion"]} for type ${notification["NotificationTypeKey"]} is not in the notification types file`
        );
      }
    }
  }
}