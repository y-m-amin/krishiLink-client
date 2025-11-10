import React, { useContext, useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import { AuthContext } from '../contexts/AuthContext';

const MyInterests = () => {
  const { user } = useContext(AuthContext);
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${API_BASE_URL}/my-interests?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setInterests(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching interests:', err);
        setLoading(false);
      });
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Interests</h2>

      {loading ? (
        <p>Loading...</p>
      ) : interests.length === 0 ? (
        <p>No interests sent yet.</p>
      ) : (
        <table className="table-auto w-full border">
          <thead>
            <tr>
              <th>Crop Name</th>
              <th>Owner</th>
              <th>Quantity</th>
              <th>Message</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {interests.map((item, i) => (
              <tr key={i}>
                <td>{item.cropName}</td>
                <td>{item.owner}</td>
                <td>{item.quantity}</td>
                <td>{item.message}</td>
                <td className={`font-semibold ${item.status === 'pending' ? 'text-yellow-600' : item.status === 'accepted' ? 'text-green-600' : 'text-red-600'}`}>
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyInterests;
