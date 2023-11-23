import { userStore } from "../stores";
import useRedirect from "../hooks/useRedirect";
export default function Home() {
  const setUser = userStore((state) => state.setUser);
  const user = userStore((state) => state.user);
  useRedirect(user, false);

  return (
    <div>
      <button
        onClick={() => {
          setUser(null);
        }}
      >
        a
      </button>
        
      <button
        onClick={() => {
          console.log(user);
        }}
      >
        b
      </button>
    </div>
  );
}
