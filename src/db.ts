// db.js
function addTimestamp(timestamp) {
  const openRequest = indexedDB.open("MyDatabase", 1);

  openRequest.onupgradeneeded = function (e) {
    const db = openRequest.result;
    if (!db.objectStoreNames.contains("timestamps")) {
      db.createObjectStore("timestamps", { keyPath: "id" });
    }
  };

  openRequest.onsuccess = function (e) {
    const db = openRequest.result;
    const transaction = db.transaction("timestamps", "readwrite");
    const store = transaction.objectStore("timestamps");
    const record = { id: Date.now(), timestamp: timestamp };
    const request = store.add(record);

    request.onsuccess = function (e) {
      console.log("Timestamp added successfully");
    };

    request.onerror = function (e) {
      console.error("Error adding timestamp", request.error);
    };
  };

  openRequest.onerror = function (e) {
    console.error("Error opening database", openRequest.error);
  }
}

function getTimestamps(callback) {
  const openRequest = indexedDB.open("MyDatabase", 1);

  openRequest.onsuccess = function (e) {
    const db = openRequest.result;
    const transaction = db.transaction("timestamps", "readonly");
    const store = transaction.objectStore("timestamps");
    const request = store.getAll();

    request.onsuccess = function (e) {
      const timestamps = request.result.map((record) => record.timestamp);
      callback(timestamps);
    };

    request.onerror = function (e) {
      console.error("Error retrieving timestamps", request.error);
    };
  };

  openRequest.onerror = function (e) {
    console.error("Error opening database", openRequest.error);
  }
}

export { addTimestamp, getTimestamps };
