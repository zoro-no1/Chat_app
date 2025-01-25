import SideUser from "../components/sideUser";
import { useChatStore } from "../store/useChatStore";
import ChatBox from "../components/ChatBox";
import NoUser from "../components/NoUser";
const Home = () => {
  const { selectUser } = useChatStore();
  return (
    <div className="h-screen bg-base-200">
      <div className="pt-4 px-4 flex justify-center items-center">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div  className="flex h-full rounded-lg overflow-hidden">
            <SideUser />
            {selectUser ? <ChatBox /> : <NoUser />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
