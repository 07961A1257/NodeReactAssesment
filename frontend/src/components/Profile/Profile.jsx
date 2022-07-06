import React, { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
import axios from "../../apis/axios";
import ErrorComponent from "./../ErrorComponent";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [error, setError] = useState("");
  // const [searchParams] = useSearchParams();

  useEffect(() => {
    // console.log(searchParams.get("id"));
    const fetchProfile = async () => {
      // const id = searchParams.get("id");
      const id = sessionStorage.getItem("USER_ID");
      setLoading(true);
      axios
        .get(`/${id}`)
        .then((res) => {
          if (res.status === 200) {
            setUser(res.data);
            setError("");
          }
        })
        .catch((err) => {
          setUser([]);
          setError(err.data);
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchProfile();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-left">
        <div className="col-12">
          <h2>Profile</h2>
        </div>
      </div>
      {loading && <h4>Loading</h4>}
      {error && <ErrorComponent errorMessage={error} />}
      {user.length === 0 && <h4>No user found</h4>}
      {user.length > 0 && (
        <>
          <div className="row justify-content m-5">
            <div className="col-2">
              <h4>Name:</h4>
            </div>
            <div className="col-2 text-left">{user[0].name}</div>
          </div>
          <div className="row justify-content m-5">
            <div className="col-2">
              <h4>Email:</h4>
            </div>
            <div className="col-2 text-left">{user[0].email}</div>
          </div>
          <div className="row justify-content m-5">
            <div className="col-2">
              <h4>Role:</h4>
            </div>
            <div className="col-2 text-left">{user[0].role}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
