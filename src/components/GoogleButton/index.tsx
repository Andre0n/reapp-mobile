import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import React, { useState } from 'react';
// Configuração do Google Signin
GoogleSignin.configure({
  webClientId:
    '831403833609-voubrli7i5ei1qqr4pmu3sgpq7k9b3mc.apps.googleusercontent.com',
});

export default function GoogleButton() {
  const [isSigningIn, setIsSigningIn] = useState(false);

  const onGoogleButtonPress = async () => {
    if (isSigningIn) return;

    setIsSigningIn(true);

    try {
      // Verificar se o dispositivo suporta Google Play Services
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Obter o token de ID do usuário e informações do usuário
      const { idToken, user } = await GoogleSignin.signIn();

      // Criar uma credencial do Google com o token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Fazer login do usuário com a credencial
      await auth().signInWithCredential(googleCredential);

      // Retornar as informações do usuário no console
      // setUserCtx(userApp); //setando no contexto
      console.log(user);
    } catch (error) {
      console.error('Erro ao autenticar com o Google: ', error);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Standard}
      style={{ width: 60, height: 60 }}
      onPress={onGoogleButtonPress}
    />
  );
}
