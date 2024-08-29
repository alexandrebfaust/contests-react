import React, { useEffect, useState } from 'react';

const Home = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = 'http://localhost:3000/v1/contests';

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch contests');
        }

        const data = await response.json();
        setContests(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;

  return (
    <div className="container mx-auto mt-5 px-4">
      <h1 className="text-3xl font-bold mb-6">Contests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contests.map((contest) => (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden" key={contest.contestId}>
            <img src={contest.logo || 'default-logo.png'} className="w-full h-48 object-cover" alt="Contest Logo" />
            <div className="p-6">
              <h5 className="text-xl font-semibold mb-2">{contest.name}</h5>
              <p className="text-gray-700 mb-4">{contest.description}</p>
              <p className="text-gray-500 text-sm mb-2">Start Date: {new Date(contest.startDate).toLocaleDateString()}</p>
              <p className="text-gray-500 text-sm mb-2">End Date: {new Date(contest.endDate).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
