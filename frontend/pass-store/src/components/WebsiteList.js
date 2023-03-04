import React, { useState, useEffect } from "react";
import WebsiteService from "../services/WebsiteService";

function WebsiteList() {
  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    WebsiteService.getAllWebsite().then((response) => {
      setWebsites(response.data.results);
      console.log(response.data.results);
    }).catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>All Websites</h1>
      {websites && websites.map(website => (
        <div>
          <h2>{website.url}</h2>
          <p>{new Date(website.updated_at).toDateString()}</p>
          <h4>Credentials</h4>
          {website.credentials && website.credentials.map(credential => (
            <div>
              <p>{credential.username}</p>
              <p>{credential.password}</p>
              <p>{new Date(credential.updated_at).toDateString()}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default WebsiteList;