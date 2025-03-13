import React, { useEffect } from "react";
import { authStore } from "../store/authAxios";
import { useChatStore } from "../store/useChatStore";

const SideUser = () => {
 // const { authUser } = authStore();
  const { getUsers, users, selectUser, setSelectUser } = useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <aside className="h-full overflow-scroll w-28 md:w-52  border-1 rounded-md shadow-black">
      <div className=" block my-2 ">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectUser(user)}
            className={` ${selectUser?._id === user._id ? "bg-base-300 " : ""} w-full flex justify-between `}
            >    
            <div className="relative mx-auto lg:mx-0 my-1">
              <img src={user.profileImg || "../avatar.webp"} alt="error" className="size-12 object-cover rounded-full"/>
            </div>
            <div className=" text-center">{user.username}</div>
            <div className="hidden"></div>
          </button>
           
        ))}
      </div>
    </aside>
  );
};

export default SideUser;
