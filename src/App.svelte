<script>
  import firebase from 'firebase/app';
  import { FirebaseApp } from 'sveltefire';
  import { Router } from 'svelte-router-spa';

  import './tailwind.css';
  import { routes } from './routes';

  const firebaseConfig = {
    apiKey: "AIzaSyCrf6s1jRKp4f8tl2P6qv3bHgpf5SfgYyY",
    authDomain: "orocasa-dev.firebaseapp.com",
    projectId: "orocasa-dev",
    storageBucket: "orocasa-dev.appspot.com",
    messagingSenderId: "29647324329",
    appId: "1:29647324329:web:c649857dc97e15aa5ad5b8"
  };

  // Initialize Firebase
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
</script>

<FirebaseApp {firebase}>
  <Router {routes} />
</FirebaseApp>
