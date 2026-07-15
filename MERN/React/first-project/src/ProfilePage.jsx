import React from "react";
import ProfileHeader from "./components/ProfileHeader";
import ProfileContent from "./components/ProfileContent";
import ProfileFooter from "./components/ProfileFooter";

function ProfilePage() {
  return (
    <>
      <ProfileHeader></ProfileHeader>
      <ProfileContent></ProfileContent>
      <ProfileFooter></ProfileFooter>
    </>
  );
}

export default ProfilePage;
