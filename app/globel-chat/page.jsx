"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const GlobelChat = () => {
  const [userId, setUserId] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [userInfoIndex, setUserInfoIndex] = useState(-1);
  const [currentUserIndex, setCurrentUserIndex] = useState();
  const [activeUsers, setActiveUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const router = useRouter();
  const containerRef = useRef();
  const picRef = useRef();
  const { data: session } = useSession();
  const sessionData = {
    name: session?.user.name,
    email: session?.user.email,
    img: session?.user?.image,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message)
      socket.emit("sendMsg", {
        message: message,
        name: session?.user?.name,
        email: session?.user?.email,
      });

    setMessage("");
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
    setTimeout(() => {
      containerRef.current.scrollTop += 100;
    }, 50);
  };

  const handleProfileClick = (index) => {
    setUserInfoIndex(index);
  };

  const handleImageUploadClick = () => {
    picRef.current.click();
  };

  const handleImageUpload = (e) => {
    const img = e.target.files[0];
  };

  const handleOnsignOut = async () => {
      await signOut({ redirect: false, callbackUrl: '/' });
  };

  const saveMsgToDB = async (data) => {
    try {
      const res = await fetch("api/message", {
        method: "POST",
        body: JSON.stringify({
          data: data,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    const data = await fetch("api/users");
    const res = await data.json();

    if (res.length) {
      res?.forEach((data) => {
        const isActive = activeUsers?.some((info) => info.email === data.email);
        data.status = isActive ? "Online" : "Offline";
      });
    }

    setUsersData(res);
  };

  useEffect(() => {
    if (sessionData.email && usersData.length) {
      const index = usersData?.findIndex(
        (data) => data.email === sessionData.email
      );
      if (index >= 0) {
        setCurrentUserIndex(index);
        if (userInfoIndex < 0) setUserInfoIndex(index);
      }
    }
  }, [usersData]);

  console.log(currentUserIndex, userInfoIndex);

  const fetchMessageData = async () => {
    const data = await fetch("api/message");
    const res = await data.json();

    if (res) {
      setChatData(res);
    }
  };

  useEffect(() => {
    const socket = io("http://localhost:3001", {
      query: {
        userId: sessionData.email,
      },
    });
    setSocket(socket);
    socket.on("userID", (data) => setUserId(data));

    socket.on("activeUsers", (data) => setActiveUsers(data));

    socket.emit("newUser", sessionData);
  }, [sessionData?.name]);

  useEffect(() => {
    if (socket) {
      socket.on("reciveMsg", (data) => {
        setChatData((prev) => [...prev, data]);
        scrollToBottom();
        // if (data.user === userId) {
        //   saveMsgToDB(data);
        // }
      });
      return () => {
        socket.off("reciveMsg");
      };
    }
  }, [socket, userId]);

  useEffect(() => {
    fetchUsers();
  }, [activeUsers]);

  useEffect(() => {
    fetchMessageData();
  }, []);


  return (
    session?.user.name && (
      <section className="h-screen bg-MyBlue font-most ">
        <main className=" w-full h-full flex">
          <div className="h-full flex-[0.4] bg-myBlack"></div>

          <div className="flex-[2] bg-myDarkBlue overflow-hidden ">
            <div className="h-[4rem] w-full flex justify-center items-end">
              <input
                type="text"
                placeholder="search members"
                className=" p-2 bg-transparent border-2 border-MyBlue rounded-md w-3/4 h-4/6 text-myGray outline-none"
              />
            </div>

            <section className="h-5/6 flex gap-10 flex-col justify-evenly overflow-y-auto hide-scrollbar text-myWhite font-few">
              {activeUsers.length && (
                <section className=" h-1/4 ">
                  <h2 className="m-3 text-green-200  text-xl tracking-wide">
                    Active Users :
                  </h2>
                  <section className=" w-11/12 mx-auto font-some overflow-y-auto h-full hide-active-scrollbar overflow-hidden">
                    <div className="w-full flex flex-col gap-4">
                      {activeUsers.map((data) => (
                        <main className="w-10/12 mx-auto rounded-lg bg-myLightBlue p-3 flex gap-5 items-center text-lg">
                          <img
                            src={data.img}
                            className="ml-10 w-10 h-10 border border-MyBlue rounded-full bg-myWhite"
                          />
                          <h2 className="fontsem">{data.name}</h2>
                        </main>
                      ))}
                    </div>
                  </section>
                </section>
              )}

              <section className=" h-2/4 mb-10">
                <h2 className="m-3 text-gray-600 text-xl tracking-wide">
                  Chat Members :
                </h2>
                <section className=" w-11/12 mx-auto font-some overflow-y-auto h-full hide-active-scrollbar overflow-hidden">
                  <div className="w-full flex flex-col gap-4">
                    {usersData &&
                      usersData.map((data, index) => (
                        <main
                          key={index}
                          onClick={() => {
                            handleProfileClick(index);
                          }}
                          className="cursor-pointer w-4/5 mx-auto rounded-lg bg-myLightBlue p-3 flex gap-5 items-center text-lg"
                        >
                          <img
                            src={data?.image}
                            className="ml-10 w-10 h-10 border border-MyBlue rounded-full bg-myWhite"
                          />
                          <h2 className="fontsem capitalize">{data?.name}</h2>
                        </main>
                      ))}
                  </div>
                </section>
              </section>
            </section>
          </div>
          <section className="h-full flex-[3] bg-MyBlue flex flex-col justify-between">
            <div className="h-[4rem] flex justify-around items-center bg-myLightBlue w-full ">
              <h2 className="font-myCursive text-myWhite text-2xl">
                Globel Chat
              </h2>
            </div>

            <main
              ref={containerRef}
              className="flex-1 relative overflow-hidden text-sm overflow-y-auto hide-scrollbar"
            >
              <div className="w-full bg-myBlack flex gap-1 flex-col justify-center items-center p-2 text-center">
                <p className="text-myBrown">
                  Hii {sessionData.name.split(" ")[0]} , Leave a Message : )
                </p>
                <p className="text-myBrown text-xs">
                  NOTE : These messages will be stored to DB and can be viewed
                  by all Viewers !
                </p>
              </div>
              <section className="flex justify-end items-end absolute bottom-0 w-full">
                {chatData[0] && (
                  <div className="flex pt-[9rem] max-h-screen flex-col gap-2 m-1 w-full mt-8">
                    {chatData.map((data, index) => (
                      <main>
                        {sessionData?.email !== data.email && (
                          <div className="self-end">
                            <section
                              rows={2}
                              key={index}
                              className="bg-myBlack p-2 px-3 rounded-xl rounded-bl-none text-white inline-block whitespace-normal ml-auto max-w-[400px]"
                              style={{ overflowWrap: "break-word" }}
                            >
                              <div className="flex text-xs pr-1 mb-1 gap-3 justify-between">
                                <h2 className=" font-semibold text-myGray ">
                                  {data.name}
                                </h2>
                                <h2 className="opacity-70 text-[0.65rem]">
                                  {data.time}
                                </h2>
                              </div>
                              <p>{data.message}</p>
                            </section>
                          </div>
                        )}
                        {sessionData?.email === data.email && (
                          <div className="flex mr-auto">
                            <section
                              rows={2}
                              key={index}
                              className="bg-myBlack p-2 px-3 rounded-xl rounded-br-none text-white inline-block whitespace-normal ml-auto max-w-[400px] "
                              style={{ overflowWrap: "break-word" }}
                            >
                              <div className="flex text-xs pr-1 mb-1 gap-3 justify-between">
                                <h2 className=" font-semibold text-myGray ">
                                  {data.name}
                                </h2>
                                <h2 className="opacity-70 text-[0.65rem]">
                                  {data.time}
                                </h2>
                              </div>
                              <p>{data.message}</p>
                            </section>
                          </div>
                        )}
                      </main>
                    ))}
                  </div>
                )}
              </section>
            </main>

            <div className="h-[3rem] bg-myLightBlue w-11/12 mx-auto rounded-md my-[.5rem]">
              <section className="flex items-center gap-5 h-full p-3">
                <svg
                  onClick={handleImageUploadClick}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  data-slot="icon"
                  class="w-8 text-myGray cursor-pointer"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <input
                  type="file"
                  hidden
                  ref={picRef}
                  onChange={handleImageUpload}
                />
                <form
                  onSubmit={handleSubmit}
                  className="flex justify-between w-full items-center"
                >
                  <input
                    onChange={handleMessage}
                    value={message}
                    placeholder="Type a Msg..."
                    className="w-5/6 font-sans text- outline-none bg-myLightBlue text-white rounded-sm placeholder:text-myGray placeholder:text-base"
                    type="text"
                  />
                  <button
                    type="submit"
                    className="w-1/6 flex justify-center items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      data-slot="icon"
                      class="w-6 text-myGray "
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                      />
                    </svg>
                  </button>
                </form>
              </section>
            </div>
          </section>

          <div className="h-full flex-[1.5] bg-myBlack flex items-center justify-center">
            {userInfoIndex >= 0 && (
              <section className="flex flex-col gap-3 h-3/4 w-11/12 p-3 py-5 border border-myBrown rounded-lg relative">
                {sessionData.email !== usersData[userInfoIndex]?.email && (
                  <svg
                    onClick={() => {
                      handleProfileClick(currentUserIndex);
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-6 text-gray-400 absolute top-0 left-0 m-3 cursor-pointer"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                  </svg>
                )}
                <section className="h-[5rem] flex justify-evenly items-center">
                  <h2 className=" font-few text-2xl text-myGray ">
                    Profile Info
                  </h2>
                </section>

                <main className="h-full flex flex-col gap-3 items-center">
                  <img
                    src={usersData[userInfoIndex].image}
                    className="border border-myBlack h-[20vh] w-[20vh] rounded-full "
                    alt="profile-img"
                  />
                  <div className="flex gap-1 flex-col items-center ">
                    <h2 className="text-myWhite font-some text-xl">
                      {usersData[userInfoIndex].name}
                    </h2>
                    {usersData[userInfoIndex].status === "Online" ? (
                      <p className="text-green-200 text-sm">
                        {usersData[userInfoIndex].status}
                      </p>
                    ) : (
                      <p className="text-gray-500 text-sm">
                        {" "}
                        {usersData[userInfoIndex].status}
                      </p>
                    )}
                  </div>
                </main>
                <button
                  onClick={handleOnsignOut}
                  className="border rounded font-semibold text-myBlack bg-myWhite "
                >
                  Log Out
                </button>
              </section>
            )}
          </div>
        </main>
      </section>
    )
  );
};

export default GlobelChat;
