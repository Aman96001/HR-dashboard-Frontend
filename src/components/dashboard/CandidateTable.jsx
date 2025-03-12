import CandidateRow from "./CandidateRow";

export default function CandidateTable({ candidates, fetchCandidates }) {
  return candidates.length === 0 ? (
    <p>No candidates available</p>
  ) : (
    <table className="tableMain">
      <thead>
        <tr>
          <th>Sr. No</th>
          <th>Candidate Name</th>
          <th>Email Address</th>
          <th>Phone Number</th>
          <th>Position</th>
          <th>Status</th>
          <th>Experience</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {candidates.map((candidate, index) => (
          <CandidateRow key={candidate._id} candidate={candidate} index={index} fetchCandidates={fetchCandidates} />
        ))}
      </tbody>
    </table>
  );
}
