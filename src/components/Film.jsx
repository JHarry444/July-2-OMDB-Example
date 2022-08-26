/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

function Film({
  id, title, year, search,
}) {
  const navigate = useNavigate();
  return (
    <div>
      <p>{`Title: ${title}`}</p>
      <p>{`Year: ${year}`}</p>
      <button type="button" onClick={() => navigate(`/film/${id}`, { state: { search } })}>Details</button>
    </div>
  );
}

export default Film;
