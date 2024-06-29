import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import React, { useState, useContext } from 'react';
import { UserContext } from 'src/contexts/user';
import { UserType } from 'src/types/UserType';

// Configuração do Google Signin
GoogleSignin.configure({
  webClientId:
    '831403833609-voubrli7i5ei1qqr4pmu3sgpq7k9b3mc.apps.googleusercontent.com', // Insira seu webClientId aqui
});

export default function GoogleButton() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { user: userCtx, setUser: setUserCtx } = useContext(UserContext);

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const userApp: UserType = {
        name: user.name,
        avatar: user.photo,
        email: user.email,
      };

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
