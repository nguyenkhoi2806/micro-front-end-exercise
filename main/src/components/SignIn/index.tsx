import React from "react";
import styles from './Signin.module.scss';
import jwt_decode from "jwt-decode";
import ProfilePicture from '../Header/ProfilePicture';
import { useLogto } from '@logto/react';

const SignIn = () => {
  const { signIn, isAuthenticated, signOut  } = useLogto();
  if (isAuthenticated) {
    const token = localStorage.getItem('logto:4mVxVsfPCoYNSkf2SwZ26:idToken') || "";
    const data: any = jwt_decode(token);
    return (
      <div className={styles.header__top__right__auth}>
        <ProfilePicture name={data.username} profilePicture={data.avatar} signOut={signOut}/>
      </div>
    );
  }

  return (
    <div className={styles.header__top__right__auth}>
      <a href="#" onClick={() => signIn('http://localhost:3000/callback')}><i className="fa fa-user" />Login</a>
    </div>
  );
};

export default SignIn;
