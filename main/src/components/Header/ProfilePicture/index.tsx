/* eslint-disable @typescript-eslint/ban-types */
import React, { useState, memo } from 'react';
import classNames from 'classnames';
import styles from './ProfilePicture.module.scss';

type Props = {
  profilePicture?: string;
  name: string;
  signOut: Function;
}
const ProfilePicture = ({ profilePicture, name, signOut }: Props) => {
  const [isClickProfile, setIsClickProfile] = useState(false)
  return (
    <div className={classNames(styles.profile)} onClick={() => {setIsClickProfile(!isClickProfile)}}>
      <span className={classNames(styles.profile__name)}>{name}</span>
      <span className={`${classNames(styles.profile__avatar)} float-right`}>
        {
          profilePicture ? (
          <img
            className={classNames(styles.profile__image)}
            src={profilePicture}
            alt="Profile picture"
          />
          ) : (
            <div className={classNames(styles.profile__default)}/>
          )
        }
        <ul className={`${classNames(styles.profile__userDropdownMenu)} ${isClickProfile ? classNames(styles.profile__userDropdownMenu__show) : ''}`}>
          <li className={classNames(styles.profile__item)}>
            Profile
          </li>
          <li className={classNames(styles.profile__item)} onClick={() => signOut('http://localhost:3000')}>
            Logout
          </li>
        </ul>
      </span>
    </div>
  )
};

export default memo(ProfilePicture);