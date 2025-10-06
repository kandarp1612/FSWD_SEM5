import React from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Row from "./components/Row";
import requests from "./requests";

function App() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <Banner />
      <div className="space-y-8 mt-6">
        <Row title="Trending" fetchUrl={requests.trending} />
        <Row title="Top Rated" fetchUrl={requests.topRated} />
        <Row title="Action" fetchUrl={requests.action} />
        <Row title="Comedy" fetchUrl={requests.comedy} />
        <Row title="Horror" fetchUrl={requests.horror} />
        <Row title="Romance" fetchUrl={requests.romance} />
        <Row title="Documentary" fetchUrl={requests.documentary} />
      </div>
    </div>
  );
}

export default App;
