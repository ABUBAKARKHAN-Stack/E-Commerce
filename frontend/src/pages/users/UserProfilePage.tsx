import { Layout } from '@/components/layout/shared'

const UserProfilePage = () => {
    // const { user } = useUserContext()
    // console.log(user);

    return (
        <Layout>
            {/* Profile Card */}
            <div className="bg-[#1E1E1E] p-6 rounded-2xl shadow-lg w-full max-w-md text-center">
                {/* Avatar */}
                <div className="w-24 h-24 mx-auto rounded-full bg-gray-700 flex items-center justify-center text-3xl font-bold">
                    A {/* Replace with actual avatar image */}
                </div>
                {/* User Info */}
                <h2 className="text-2xl font-semibold mt-4">Abubakar Aijaz</h2>
                <p className="text-gray-400">abubakarxd7@gmail.com</p>

                {/* Edit Profile Button */}
                <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">Edit Profile</button>
            </div>
        </Layout>
    )
}

export default UserProfilePage