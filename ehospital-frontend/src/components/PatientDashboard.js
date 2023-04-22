import { useState, useEffect } from "react";
import PhysicianCard from "./PhysicianCard.js";

function PatientDashboard() {
  const [physicians, setPhysicians] = useState([]);

  useEffect(() => {
    fetch("/api/physicians")
      .then((response) => response.json())
      .then((data) => setPhysicians(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="flex flex-col xmin-h-screen px-10 py-10 gap-y-10">
      <div className="font-semibold">
        <p className="text-3xl">Hello Name,</p>
        <p className=" text-gray-500 font-thin">How are you doing today!</p>
      </div>
      <main className="flex gap-10 ">
        <div className="max-w-lg mx-auto">
          <h2 className="mb-6 text-3xl font-bold text-gray-800">
            Available Physicians
          </h2>

          {!physicians.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {Array.from({ length: 4 }).map((physician) => (
                <PhysicianCard
                  key={physician?.id}
                  id={physician?.id}
                  name={physician?.name}
                  specialty={physician?.specialty}
                  imageUrl={physician?.imageUrl}
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

          {!physicians.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {Array.from({ length: 4 }).map((physician) => (
                <PhysicianCard
                  key={physician?.id}
                  id={physician?.id}
                  name={physician?.name}
                  specialty={physician?.specialty}
                  imageUrl={physician?.imageUrl}
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
      </main>
    </div>
  );
}

export default PatientDashboard;
