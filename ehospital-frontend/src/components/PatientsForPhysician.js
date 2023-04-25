import CustomTextInput from "./CustomTextInput";

const PatientsForPhysician = ({ username, patient }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    // await registerAction(Object.fromEntries(data))(dispatch);
    console.log(Object.fromEntries(data));
  };
  return (
    <div className="bg-white shadow-lg rounded-lg p-6  space-y-4">
      <p className="font-semibold capitalize">{patient?.name}</p>
      <div>
        <p className="capitalize">{"symptoms"}</p>
        <p class="font-mono text-gray-700 bg-slate-100 p-2 rounded-md border">
          {patient?.symptoms}
        </p>
      </div>

      <form
        method="post"
        className="bg-white px-2 pb-2 w-full"
        onSubmit={handleSubmit}
      >
        <CustomTextInput
          type="text"
          name="patient"
          value={username}
          className="hidden"
          placeholder="Enter medecine here"
        />
        <CustomTextInput
          type="text"
          name="medecine"
          label="Medecine"
          placeholder="Enter medecine here"
        />

        <div className="flex justify-between items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientsForPhysician;
