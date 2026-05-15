importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBza8zvWZ1Z9j1NmaPUaIS4AaGlP0WRFGw",
  authDomain: "mage-courier.firebaseapp.com",
  projectId: "mage-courier",
  storageBucket: "mage-courier.firebasestorage.app",
  messagingSenderId: "337736317081",
  appId: "1:337736317081:web:ea06038aba11b369ae2008"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const title = payload.notification.title || 'Нове замовлення!';
  const body  = payload.notification.body  || '';

  // Закрити всі існуючі сповіщення з тим самим тегом перед показом нового
  return self.registration.getNotifications({ tag: 'order' })
    .then(notifications => {
      notifications.forEach(n => n.close());
      return self.registration.showNotification(title, {
        body,
        icon: '/mage_delivery/icon-192.png',
        badge: '/mage_delivery/icon-192.png',
        tag: 'order',
        renotify: false,
        requireInteraction: true
      });
    });
});
