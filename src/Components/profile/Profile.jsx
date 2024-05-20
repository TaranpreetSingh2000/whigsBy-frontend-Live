import React from "react";

const Profile = () => {
  const name = localStorage.getItem("Name");
  const email = localStorage.getItem("Email");
  return (
    <div className="min-h-screen p-5 flex flex-col items-center">
      <h3 className="text-center font-sans uppercase p-3 text-xl text-[#23356a] font-semibold">
        User Profile
      </h3>
      <a
        href="#"
        className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
      >
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        <div className="sm:flex sm:justify-between sm:gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
              {name}
            </h3>

            <p className="mt-1 text-xs font-medium text-gray-600">{email}</p>
          </div>

          <div className="hidden sm:block sm:shrink-0">
            <img
              alt=""
              src="https://banner2.cleanpng.com/20180329/zue/kisspng-computer-icons-user-profile-person-5abd85306ff7f7.0592226715223698404586.jpg"
              className="size-16 rounded-lg object-cover shadow-sm"
            />
          </div>
        </div>

        <div className="mt-4">
          <p className="text-pretty text-sm text-gray-500">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. At velit
            illum provident a, ipsa maiores deleniti consectetur nobis et eaque.
          </p>
        </div>

        <dl className="mt-6 flex gap-4 sm:gap-6">
          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">Published</dt>
            <dd className="text-xs text-gray-500">31st June, 2021</dd>
          </div>

          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">Reading time</dt>
            <dd className="text-xs text-gray-500">3 minute</dd>
          </div>
        </dl>
      </a>
    </div>
  );
};

export default Profile;
