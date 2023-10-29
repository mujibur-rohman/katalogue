import profileApi from "@/lib/api/profile.api";
import ProfileForm from "./_components/profile-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getProfile } from "@/actions/profile";

async function Profile() {
  const token = await getServerSession(authOptions);
  const profile = await getProfile(token?.user.id as string);
  return <ProfileForm profile={profile} />;
}

export default Profile;
