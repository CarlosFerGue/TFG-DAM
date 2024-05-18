import { auth } from './firebaseConfig.js';
import { sendSignInLinkToEmail } from 'firebase/auth';


export const sendVerificationEmail = (email, actionCodeSettings) => {
  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      console.log('Correo de verificación enviado');
    })
    .catch(error => {
      console.error('Error enviando correo de verificación', error);
    });
};