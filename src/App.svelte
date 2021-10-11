<script>
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import firebase from 'firebase/app';
  import { FirebaseApp } from 'sveltefire';
  import { Router } from 'svelte-router-spa';

  import './tailwind.css';
  import { routes } from './routes';

  // App context
  setContext('app', {
    needsAuthCheck: writable(true)
  });

  setContext('newOrderInfo', writable({
    id: null,
    count: 0,
    ambient: '',
    features: {}
  }));
  setContext('newOrderReady', writable(false));
  setContext('orderEditReady', writable(false));
  setContext('orderEditIndex', writable(null));

  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyCrf6s1jRKp4f8tl2P6qv3bHgpf5SfgYyY",
    authDomain: "orocasa-dev.firebaseapp.com",
    projectId: "orocasa-dev",
    storageBucket: "orocasa-dev.appspot.com",
    messagingSenderId: "29647324329",
    appId: "1:29647324329:web:c649857dc97e15aa5ad5b8"
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
</script>

<FirebaseApp {firebase}>
  <Router {routes} />
</FirebaseApp>
