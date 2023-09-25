import profileApi from "@/lib/api/profile.api";
import ProfileForm from "./_components/profile-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const getProfile = async (userId: string) => {
  const res = await profileApi.get(userId);
  return res;
};

async function Profile() {
  const token = await getServerSession(authOptions);
  const profile = await getProfile(token?.user.id as string);
  return <ProfileForm profile={profile} />;
}

export default Profile;
