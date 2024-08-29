import React, { useEffect, useState } from 'react';

const Contests = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = 'http://localhost:3000/v1/contests';
  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmYTg4ZDIwMS04NGU3LTRlNzItYjY0Ny1jMGUyMzU1NjlmOTIiLCJlbWFpbCI6ImFsZXhhbmRyZWJmYXVzdEBnbWFpbC5jb20iLCJpYXQiOjE3MjQ5MzYwNzMsImV4cCI6MTcyNTAyMjQ3M30.X8rAKHCnkEyTrbu0MI00xDT0DFBMOVgeKcgA6nFkJ74';

  // Função para buscar contests
  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': token,
            'User-Agent': 'insomnia/9.3.3',
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Erro ao consumir a API: ' + response.status);
        }
        const data = await response.json();
        const contestsWithEntries = await Promise.all(
          data.map(async (contest) => {
            const entries = await fetchEntries(contest.contestId);
            return { ...contest, entries };
          })
        );
        setContests(contestsWithEntries);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, [apiUrl, token]);

  // Função para buscar inscrições de um contest
  const fetchEntries = async (contestId) => {
    try {
      const response = await fetch(`http://localhost:3000/v1/contests/${contestId}/entries`, {
        method: 'GET',
        headers: {
          'Authorization': token,
          'User-Agent': 'insomnia/9.3.3',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Erro ao consumir a API de inscrições: ' + response.status);
      }
      return await response.json();
    } catch (error) {
      console.error(`Erro ao buscar inscrições para o contest ${contestId}:`, error);
      return [];
    }
  };

  // Função para escapar caracteres HTML
  const escapeHtml = (unsafe) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;

  return (
    <div className="container mx-auto mt-5 px-4">
      <h1 className="text-3xl font-bold mb-6">Contests and Entries</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contests.map((contest) => (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden" key={contest.contestId}>
            <img src={contest.logo || 'default-logo.png'} className="w-full h-48 object-cover" alt="Contest Logo" />
            <div className="p-6">
              <h5 className="text-xl font-semibold mb-2">{escapeHtml(contest.name)}</h5>
              <p className="text-gray-700 mb-4">{escapeHtml(contest.description)}</p>
              <p className="text-gray-500 text-sm mb-2">Start Date: {new Date(contest.startDate).toLocaleDateString()}</p>
              <p className="text-gray-500 text-sm mb-2">End Date: {new Date(contest.endDate).toLocaleDateString()}</p>
              <h6 className="text-lg font-medium mt-4">Entries:</h6>
              <ul className="mt-2">
                {contest.entries.map((entry) => (
                  <li className="border-t py-2" key={entry.entryId}>
                    <strong>Character:</strong> {escapeHtml(entry.character)}<br />
                    <strong>Media:</strong> {escapeHtml(entry.characterMedia)}<br />
                    <strong>User:</strong> {escapeHtml(entry.User.fullName)}<br />
                    <img src={entry.referenceImage || 'default-entry.png'} alt="Reference Image" className="mt-2 w-24 h-24 object-cover" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contests;
