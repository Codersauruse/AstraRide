import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Add databaseURL if needed: databaseURL: "https://your-database-url.firebaseio.com"
});

const db = getFirestore();

// Export the admin SDK and Firestore instance for use in other parts of your project
export { admin, db };
