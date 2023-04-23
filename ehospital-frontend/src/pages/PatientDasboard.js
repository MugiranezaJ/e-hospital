import React from "react";
import PatientDashboard from "../components/PatientDashboard";

import { Header, Footer, SideBar } from "../components/LayoutDesigns";

function PatientDashboardPage() {
  return (
    <div className=" flex flex-col justify-between h-screen">
      <Header />
      <div className="relative flex flex-1 h-full overflow-scroll">
        <SideBar />
        <PatientDashboard />
      </div>
      <Footer />
    </div>
  );
}

export default PatientDashboardPage;
