import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

let repo = "JwowSquared/Radical-Red-Pokedex";
let version = "rrdex 2 dev 0.1";

async function fetchData() {
  let request = new Request(`https://raw.githubusercontent.com/${repo}/master/data.js`);
  let response = null;
  if (typeof caches !== "undefined") {
    const cache = await caches.open(version);
    
    response = await cache.match(request);
    if (!response) {
      response = await fetch(request);
      await cache.put(request, response);
    }
      response = await cache.match(request);
  }
  else
    response = await fetch(request);
  
  let data = await response.text();
  return eval( "(" + data + ")" );
}

const database = await fetchData();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App database={database} />
  </React.StrictMode>
);