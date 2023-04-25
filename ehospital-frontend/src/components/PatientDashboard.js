import { useEffect, useState } from "react";
import PhysicianCard from "./PhysicianCard.js";
import {
  getPharmacistsAction,
  getPhysiciansAction,
  getUsersWithGrantedAccessAction,
} from "../store/auth/authActions.js";
import { useDispatch, useSelector } from "react-redux";
import PatientsForPhysician from "./PatientsForPhysician.js";
import CSVViewer from "./CSVViewer.js";

function PatientDashboard() {
  const { auth } = useSelector((state) => state);
  const [user, setUser] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    getPhysiciansAction({ userType: "physician" })(dispatch);
    getPharmacistsAction({ userType: "pharmacist" })(dispatch);
    const localUser = localStorage.getItem("euser");
    if (localUser) setUser(JSON.parse(localUser));

    getUsersWithGrantedAccessAction({})(dispatch);
  }, [dispatch]);

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
            {auth?.usersWithGrantedAccess?.data &&
              Object.values(auth?.usersWithGrantedAccess?.data)?.map(
                (patient, _index) => (
                  <PatientsForPhysician
                    username={patient?.username}
                    patient={patient}
                  />
                )
              )}
          </div>
        </div>
      )}
      {["pharmacist", "physician"].includes(user?.role) && <div>
        <p className="text-gray-500 font-thin text-3xl mb-3">My Patients </p>
        <CSVViewer />
      </div>}
    </div>
  );
}

export default PatientDashboard;
