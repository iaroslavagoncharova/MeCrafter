import { useEffect, useState } from "react";
import ReflectionEntry from "../components/ReflectionEntry";
import { useReflection } from "../hooks/apiHooks";
import { useUserContext } from "../hooks/contextHooks";
import { ReflectionWithPrompt } from "../types/DBTypes";

export default function Reflections() {
  const [reflections, setReflections] = useState<ReflectionWithPrompt[]>([]);
  const { user } = useUserContext();
  const { getReflectionsByUser } = useReflection();

  const fetchReflections = async () => {
    const token = localStorage.getItem("token");
    if (!token || !user) {
      return;
    }
    const result = await getReflectionsByUser(user.user_id, token);
    if (!result) {
      return;
    }
    setReflections(result);
  };

  useEffect(() => {
    fetchReflections();
  }, [user]);


  return (
    <div className="row justify-content-center">
      <h1>Reflections</h1>
      <p>Write about your day and reflect on your habits</p>
      <div className="col-md-8">
        <ReflectionEntry reflections={reflections} />
      </div>
    </div>
  );
}
