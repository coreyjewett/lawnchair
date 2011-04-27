// Silly name (to avoid collisions) for a semi-automatic adaptor. Make sure you are still loading all the adaptors you need.
function BeachfrontAdaptor(opts) {
  // TODO implement bootstrapper to only network fetch the right one?
  // TODO may need to bootstrap JSON2.js

  var adaptor
  // TODO Air, Blackberry
  if (window.runtime) {
    // default to sync as it is probably safer, but allow over-ride.
    adaptor = (opts && opts.async) ? AIRSqliteAsyncAdaptor : AIRSqliteAdaptor
  } else if (window.openDatabase) {
    adaptor = WebkitSQLiteAdaptor
  } else if (window.google && google.gears) {   // assuming gears is better than DOMStorage
    adaptor = GearsSQLiteAdaptor
  } else if (window.localStorage || window.Storage) {   // picks up IE8+
    adaptor = DOMStorageAdaptor
  } else if (navigator.userAgent.toLowerCase().indexOf("msie") != -1) {   // couldn't google up a feature selector for this.
    adaptor = UserDataStorage
  } else if (navigator.store) {   // PhoneGap's proprietary store for Blackberrys.
    adaptor = BlackBerryPersistentStorageAdaptor
  } else { // opted for DOMStorageAdaptor instead of CookieAdaptor as Lawnchair will default to this anyway...
    adaptor = DOMStorageAdaptor
  }

  return new adaptor(opts)
}