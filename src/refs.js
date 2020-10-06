import { firestore } from 'fire';

const userRef = email => firestore.collection("users").doc(email);
const chatRef = (email, selected) => firestore.collection("users").doc(email).collection("chats").doc(selected || ' ');
const chatsRef = email => firestore.collection("users").doc(email).collection("chats").orderBy("last.timestamp");
const messagesRef = (email, selected) => firestore.collection("users").doc(email).collection("chats").doc(selected || ' ').collection("messages").orderBy("timestamp");

export { userRef, chatRef, chatsRef, messagesRef };
