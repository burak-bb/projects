import React from "react";
import { Link } from "react-router-dom";

import "./PlayCard.css";

/** Show limited information about a company
 *
 * Is rendered by CompanyList to show a "card" for each company.
 *
 * CompanyList -> CompanyCard
 */

function PlayCard({ id, title }) {


  return (
      <Link className="PlayCard card" to={`/playlists/${id}`}>
        <div className="card-body">
          <h6 className="card-title">
            {title}
          </h6>
        </div>
      </Link>
  );
}

export default PlayCard;
