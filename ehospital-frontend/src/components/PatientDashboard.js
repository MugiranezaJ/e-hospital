import { useEffect, useState } from "react";
import PhysicianCard from "./PhysicianCard.js";
import {
  addMedecinesAction,
  getDiagnosedDiseaseAction,
  getMyPatientsPharmacistAction,
  getPharmacistsAction,
  getPhysiciansAction,
  getPhysiciansWithGrantedAccessAction,
  getUsersWithGrantedAccessAction,
} from "../store/auth/authActions.js";
import { useDispatch, useSelector } from "react-redux";
import PatientsForPhysician from "./PatientsForPhysician.js";
import CSVViewer from "./CSVViewer.js";
import CustomTextInput from "./CustomTextInput.js";

function PatientDashboard() {
  const { auth } = useSelector((state) => state);
  const [user, setUser] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    getPhysiciansAction({ userType: "physician" })(dispatch);
    getPharmacistsAction({ userType: "pharmacist" })(dispatch);
    getPhysiciansWithGrantedAccessAction({ userType: "physician" })(dispatch);
    getMyPatientsPharmacistAction({ userType: "pharmacist" })(dispatch);
    getDiagnosedDiseaseAction(user?.username)(dispatch);
    console.log("Username", user?.username);
    const localUser = localStorage.getItem("euser");
    if (localUser) setUser(JSON.parse(localUser));

    getUsersWithGrantedAccessAction({})(dispatch);
  }, [dispatch, user?.username]);

  // console.log(auth?.physiciansWithAcces?.data?.map((user) => user?.username))

  console.log(
    auth?.physiciansWithAcces?.data?.map((item) =>
      item?.physicians?.filter((el) => el === user?.email)
    )
  );
  const filteredData = auth?.physiciansWithAcces?.data?.filter(
    (item, index, self) =>
      item.physicians.includes(user?.email) &&
      self.findIndex((t) => t.physicians.includes(user?.email)) === index
  );
  // console.log("filtered", filteredData);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data);

    console.log(values);
    await addMedecinesAction(values)(dispatch);
    event?.target?.reset();
  };

  return (
    <div className="flex flex-col pl-56 xmin-h-screen px-10 py-10 gap-y-10">
      <div className="font-semibold">
        <p className="text-3xl">Hello {user?.name ?? "Anonymous"},</p>
        <p className=" text-gray-500 font-thin">How are you doing today!</p>
      </div>
      {user?.role === "patient" && (
        <div className="flex gap-10 ">
          <div className="max-w-lg mx-auto">
            <h2 className="mb-6 text-3xl font-bold text-gray-800">
              Available Physicians
            </h2>

            {auth?.physicians?.data?.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {auth.physicians?.data?.map((physician, index) => (
                  <PhysicianCard
                    key={index}
                    user={physician}
                    patient={user}
                    onGrantAccess={() =>
                      alert(`Access granted to Dr. ${physician?.name}`)
                    }
                  />
                ))}
              </div>
            ) : (
              <p className="text-lg font-medium text-gray-500">
                Loading physicians...
              </p>
            )}
          </div>

          <div className="max-w-lg mx-auto">
            <h2 className="mb-6 text-3xl font-bold text-gray-800">
              Available Pharmacist
            </h2>

            {auth?.pharmacists?.data?.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {auth?.pharmacists?.data?.map((pharmacist, index) => (
                  <PhysicianCard
                    key={index}
                    user={pharmacist}
                    onGrantAccess={() =>
                      alert(`Access granted to Dr. ${pharmacist?.name}`)
                    }
                  />
                ))}
              </div>
            ) : (
              <p className="text-lg font-medium text-gray-500">
                Loading physicians...
              </p>
            )}
          </div>
        </div>
      )}

      {["physician"].includes(user?.role) && (
        <div className="">
          <p className="text-gray-500 font-thin text-3xl mb-3">My Patients </p>
          <div className="flex flex-wrap gap-2">
            {filteredData?.map((patient, _index) => (
              <PatientsForPhysician doctor={user?.email} patient={patient} />
            ))}
          </div>
        </div>
      )}

      {["patient"].includes(user?.role) && (
        <div>
          <p className="text-gray-500 font-thin text-3xl mb-3">
            Replies from Physicians{" "}
          </p>
          <div className="py-5 px-2 bg-white rounded-lg font-mono border w-80">
            <span className="capitalize">{auth?.diagnosis?.data?.disease}</span>{" "}
            {auth?.diagnosis?.data?.doctor}
          </div>
        </div>
      )}

      {["pharmacist"].includes(user?.role) && (
        <div className=" ">
          <p className="text-gray-500 font-thin text-3xl mb-3 capitalize">
            Patients to give prescriptions{" "}
          </p>
          {auth?.myPatientsPharmacist?.data?.map((data) => (
            <div className="bg-white px-4 py-4 rounded-md">
              <div className="flex gap-5 mb-2 ">
                <p>
                  <b>Username: </b>
                  {data?.username}
                </p>
                <p>
                  <b>Age: </b>
                  {data?.age}
                </p>
              </div>
              <form
                method="post"
                className="flex w-full gap-1 border-t pt-4"
                onSubmit={handleSubmit}
              >
                <CustomTextInput
                  type="text"
                  name="medName"
                  label={"Name"}
                  // value={patient?.username}
                  // className="hidden"
                  placeholder="Enter medecine here"
                />
                <CustomTextInput
                  type="number"
                  name="medPrice"
                  label="Price"
                  placeholder="Enter price here"
                />
                <CustomTextInput
                  type="text"
                  name="medExpiration"
                  label={"Expiration Date"}
                  // value={doctor}
                  // className="hidden"
                  placeholder="Enter medecine here"
                />

                <div className="flex justify-between items-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Send
                  </button>
                  {/* {auth?.diagnosis?.status === 200 && <span>{"Sent!"}</span>} */}
                </div>
              </form>
              <div className="text-green-500 capitalize">
                {auth?.medecines?.message}
              </div>
            </div>
          ))}
        </div>
      )}

      {["pharmacist", "physician"].includes(user?.role) && (
        <div>
          <p className="text-gray-500 font-thin text-3xl mb-3">My Patients </p>
          <CSVViewer />
        </div>
      )}
    </div>
  );
}

export default PatientDashboard;
