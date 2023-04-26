import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { grantAccessAction } from "../store/auth/authActions";

const UserCard = ({ name, user, onClick, patient, userType }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(user);
  const handleGrantAccess = () => {
    console.log("access granted", user?.email);
    grantAccessAction({
      userType: userType,
      user: patient?.username,
      doctor: user?.email ?? user?.phone,
    })(dispatch);
  };
  // console.log(
  //   auth?.physiciansWithAcces?.data?.map((user) =>
  //     user?.physicians?.includes(user?.email)
  //   )
  // );
  let isGranted = auth?.physiciansWithAcces?.data?.map((item) =>
    item?.physicians?.includes(user?.email)
  );
  let isGranted2 = auth?.myPatientsPharmacist?.data?.map((item) =>
    item?.pharamacists?.includes(user?.phone)
  );

  isGranted = isGranted && isGranted[0];
  isGranted2 = isGranted2 && isGranted2[0];
  // console.log(user?.email, isGranted && isGranted[0]);
  return (
    <div
      className="bg-white border rounded-lg p-6 cursor-pointer space-y-4"
      onClick={onClick}
    >
      <div>
        <div className="text-xl font-medium">{user?.name}</div>
        <div className="text-gray-500">{user?.gender}</div>
        <div className="text-gray-500">{user?.age}</div>
        <div className="text-gray-500">{user?.email}</div>
      </div>
      <button
        onClick={handleGrantAccess}
        className={` ${
          (isGranted || isGranted2) ? "bg-green-500" : "bg-blue-500 hover:bg-blue-700"
        } text-white font-bold py-2 px-4 rounded`}
        disabled={isGranted || isGranted2}
      >
        {isGranted ? "Access Granted" : "Grant access"}
      </button>
    </div>
  );
};

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  specialty: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default UserCard;
