importScripts(
  "https://www.gstatic.com/firebasejs/12.2.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/12.2.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBcS0QWgRbLsNtdKYiFPXceJsvLY7aDJw",
  authDomain: "speak-on-4a07b.firebaseapp.com",
  projectId: "speak-on-4a07b",
  storageBucket: "speak-on-4a07b.firebasestorage.app",
  messagingSenderId: "597603593359",
  appId: "1:597603593359:web:d6bb8621edbb6c913e54fa",
  measurementId: "G-5N94FQEVWB"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title =
    payload.notification?.title || "SpeakOn";

  const body =
    payload.notification?.body ||
    "Ada pesan baru di SpeakOn.";

  self.registration.showNotification(title, {
    body: body,
    icon: "/Speak-On/logo.png",
    badge: "/Speak-On/logo.png",
    data: payload.data || {}
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(
      "https://mqamqaoke-sketch.github.io/Speak-On/"
    )
  );
});
