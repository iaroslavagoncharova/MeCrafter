import { usePrompt, useReflection } from "../hooks/apiHooks";
import { useUserContext } from "../hooks/contextHooks";
import { useForm } from "../hooks/formHooks";
import { ReflectionWithPrompt } from "../types/DBTypes";
const ReflectionEntry = (props: { reflections: ReflectionWithPrompt[] }) => {
  const { reflections } = props;
  const user = useUserContext();
  const { postReflection } = useReflection();
  const { promptList } = usePrompt();

  const values = {
    reflection_text: "",
    prompt_id: "",
  };

  const submit = async () => {
    const token = localStorage.getItem("token");
    try {
      if (!token || !user) {
        return;
      }
      console.log(inputs);
      if (!inputs.prompt_id) {
        alert("Please select a prompt");
        return;
      }
      const result = await postReflection(
        inputs.reflection_text,
        Number(inputs.prompt_id),
        token
      );
      alert(result.message);
    } catch (error) {
      console.log((error as Error).message);
    }
  };
  const { handleSubmit, handleInputChange, inputs } = useForm(submit, values);
  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <form>
            <div className="form-group">
              <label htmlFor="prompt_id">Select a prompt</label>
              <select
                className="form-control"
                id="prompt_id"
                name="prompt_id"
                onChange={handleInputChange}
              >
                <option value="">Select a prompt</option>
                {promptList.map((prompt) => (
                  <option key={prompt.prompt_id} value={prompt.prompt_id}>
                    {prompt.prompt_text}
                  </option>
                ))}
              </select>
              <label htmlFor="reflection_text">Write about your day</label>
              <textarea
                className="form-control"
                id="reflection_text"
                name="reflection_text"
                rows={3}
                placeholder="Write about your day here"
                onChange={handleInputChange}
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
        <div className="col-md-8">
          <h2>Previous entries</h2>
          <div id="previous-entries">
            {reflections.map((reflection) => (
              <div key={reflection.reflection_id} className="card">
                <div className="card-body">
                  <p>On {new Date(
                      reflection.created_at.replace(
                        /(\d+)\.(\d+)\.(\d+) (\d+).(\d+).(\d+)/,
                        "$3-$2-$1T$4:$5:$6"
                      )
                    ).toLocaleDateString("fi-FI")} you reflected on the prompt:</p>
                  <h4 className="card-title text-center">
                    {reflection.prompt_text}
                  </h4>
                  <p>And on that day, you wrote this beautiful thought: {reflection.reflection_text}</p>
                  <p>
                    
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReflectionEntry;

/**
 * const timestamp = new Date(timestampString.replace(/(\d+)\.(\d+)\.(\d+) (\d+).(\d+).(\d+)/, '$3-$2-$1T$4:$5:$6'));
const formattedDate = timestamp.toLocaleDateString();
 */
