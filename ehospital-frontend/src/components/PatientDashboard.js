import { useEffect, useState } from "react";
import PhysicianCard from "./PhysicianCard.js";
import {
  addMedecinesAction,
  getDiagnosedDiseaseAction,
  getMedecinesDataAction,
  getMyPatientsPharmacistAction,
  getPharmacistsAction,
  getPhysiciansAction,
  getPhysiciansWithGrantedAccessAction,
  getUsersWithGrantedAccessAction,
} from "../store/auth/authActions.js";
import { useDispatch, useSelector } from "react-redux";
import PatientsForPhysician from "./PatientsForPhysician.js";
import CustomTextInput from "./CustomTextInput.js";
import CsvFile from "./CsvFile.js";
import { useNavigate } from "react-router-dom";

function PatientDashboard() {
  const { auth } = useSelector((state) => state);
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    user?.role === "patient" &&
      getPhysiciansAction({ userType: "physician" })(dispatch);
    user?.role === "patient" &&
      getPharmacistsAction({ userType: "pharmacist" })(dispatch);
    user?.role === "patient" &&
      getDiagnosedDiseaseAction(user?.username)(dispatch);
    user?.role === "patient" && getMedecinesDataAction()(dispatch);

    getPhysiciansWithGrantedAccessAction({ userType: "physician" })(dispatch);
    getMyPatientsPharmacistAction({ userType: "pharmacist" })(dispatch);

    const localUser = localStorage.getItem("euser");
    if (localUser) setUser(JSON.parse(localUser));

    getUsersWithGrantedAccessAction({})(dispatch);
  }, [dispatch, user?.role, user?.username]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data);

    console.log(values);
    await addMedecinesAction(values)(dispatch);
    event?.target?.reset();
  };
  if (!user) return navigate("/");
  return (
    <div className="flex-1 relative flex flex-col pl-56 xmin-h-screen px-10 py-10 gap-y-10">
      <div className="font-semibold">
        <p className="text-3xl">Hello {user?.name ?? "Anonymous"},</p>
        <p className=" text-gray-500 font-thin">How are you doing today!</p>
      </div>
      <div className="max-w-[900px]">
        {/* Available physicians and pharmacists */}
        {["patient"].includes(user?.role) && (
          <div className="flex gap-10 w-full">
            <div className="bg-white p-4 rounded-lg w-[32rem] xmx-auto">
              <h2 className="mb-6 font-light text-3xl xfont-bold text-gray-800">
                Available Physicians
              </h2>

              {auth?.physicians?.data?.length > 0 ? (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                  {auth.physicians?.data?.map((physician, index) => (
                    <PhysicianCard
                      key={index}
                      user={physician}
                      userType={"physician"}
                      patient={user}
                      onGrantAccess={() =>
                        alert(`Access granted to Dr. ${physician?.name}`)
                      }
                    />
                  ))}
                </div>
              ) : (
                <p className="text-lg  text-gray-500">
                  [+] No physician available!
                </p>
              )}
            </div>

            <div className="bg-white p-4 rounded-lg w-[32rem] xmx-auto">
              <h2 className="mb-6 text-3xl font-light text-gray-800">
                Available Pharmacist
              </h2>

              {auth?.pharmacists?.data?.length > 0 ? (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                  {auth?.pharmacists?.data?.map((pharmacist, index) => (
                    <PhysicianCard
                      key={index}
                      user={pharmacist}
                      userType={"pharmacist"}
                      patient={user}
                      onGrantAccess={() =>
                        alert(`Access granted to Dr. ${pharmacist?.name}`)
                      }
                    />
                  ))}
                </div>
              ) : (
                <p className="text-lg text-gray-500">
                  [+] No pharmacist available
                </p>
              )}
            </div>
          </div>
        )}

        {/* Patients who granted access to physician */}
        {["physician"].includes(user?.role) && (
          <div className="">
            <p className="text-gray-500 font-thin text-3xl mb-3">
              My Patients{" "}
            </p>
            <div className="flex flex-wrap gap-2">
              {filteredData?.map((patient, _index) => (
                <PatientsForPhysician doctor={user?.email} patient={patient} />
              ))}
            </div>
          </div>
        )}

        {/* Physicians reply */}
        {["patient"].includes(user?.role) && (
          <div className="absolute top-0 right-1 p-2 bg-white h-full rounded-lg text-black border shadow">
            <p className="font-thin text-3xl mb-3">Replies from Physicians </p>
            <div className="py-5 px-2 bg-white rounded-lg font-mono border w-80 shadow">
              {auth?.diagnosis?.data?.disease && (
                <>
                  <span>[+]</span>
                  <span className="capitalize italic font-bold">
                    {` "${auth?.diagnosis?.data?.disease}"`}
                  </span>
                  {" - "}
                  {auth?.diagnosis?.data?.doctor}
                </>
              )}
              {!auth?.diagnosis?.data?.disease && (
                <div className="font-sans">[+] No replies yet!</div>
              )}
            </div>
          </div>
        )}

        {/* Patients to give medecines */}
        {["pharmacist"].includes(user?.role) && (
          <div className=" ">
            <p className="text-gray-500 font-thin text-3xl mb-3 capitalize">
              Patients to give prescriptions{" "}
            </p>
            {auth?.myPatientsPharmacist?.data?.map((data) => (
              <div className="bg-white px-4 py-4 rounded-md mb-5">
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

        {/* View csv file */}
        {["patient"].includes(user?.role) && (
          <div className="bg-white p-2 rounded-lg mt-10">
            <p className="font-thin text-3xl mb-3">
              Medicines from Pharmacists
            </p>
            {auth?.medecinesData?.length > 0 && (
              <div className="w-full">
                <CsvFile
                  medicinesData={
                    "med-name,med-price,med-expiration\nGinger,200.00,22-02-22023\nFiber,400.00,23-02-22023\nginger,200.00,02-03-2020\nGinger,200.00,23-02-2020"
                  }
                />
              </div>
            )}
            {auth?.medecinesData?.message && (
              <p className="text-lg  text-gray-500">
                [+] {auth?.medecinesData?.message}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientDashboard;
