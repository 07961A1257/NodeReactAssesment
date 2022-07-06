import React, { useEffect, useState } from "react";
import axios from "../../apis/axios";
import Table from "../Helpers/Table/Table";

const UserDetails = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      await axios
        .get("/")
        .then((res) => {
          if (res.status === 200) {
            setUsers(res.data);
            setLoading(false);
          } else {
            setUsers([]);
            setLoading(false);
          }
        })
        .catch((err) => {
          setUsers([]);
          setLoading(false);
        });
    };

    fetchUsers();
  }, []);

  const showLoading = () => {
    return <h3>Loading...</h3>;
  };

  const showTableData = () => {
    return (
      <>
        {users.length > 0 ? <Table users={users} /> : <h4>No Users found!!</h4>}
      </>
    );
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <h2>User Details</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {loading && showLoading()}
          {!loading && users.length > 0 && showTableData()}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
