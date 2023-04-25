import { useDispatch, useSelector } from "react-redux";
import CustomTextInput from "./CustomTextInput";
import { diagnoseDiseaseAction } from "../store/auth/authActions";

const PatientsForPhysician = ({ doctor, patient }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data);

    // await registerAction(Object.fromEntries(data))(dispatch);
    console.log(values);
    await diagnoseDiseaseAction(values)(dispatch);
    event?.target?.reset();
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
      {auth?.diagnosis?.disease && (
        <div>
          <p className="text-right italic font-mono text-gray-700 bg-slate-100 p-2 rounded-md border">
            {auth?.diagnosis?.disease} - {doctor}
          </p>
        </div>
      )}

      <form
        method="post"
        className="bg-white px-2 pb-2 w-full"
        onSubmit={handleSubmit}
      >
        <CustomTextInput
          type="text"
          name="doctor"
          value={doctor}
          className="hidden"
          placeholder="Enter medecine here"
        />
        <CustomTextInput
          type="text"
          name="patientId"
          value={patient?.username}
          className="hidden"
          placeholder="Enter medecine here"
        />
        <CustomTextInput
          type="text"
          name="disease"
          label="Disease"
          placeholder="Enter disease here"
        />

        <div className="flex justify-between items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Send
          </button>
          {auth?.diagnosis?.status === 200 && <span>{"Sent!"}</span>}
        </div>
      </form>
    </div>
  );
};

export default PatientsForPhysician;
