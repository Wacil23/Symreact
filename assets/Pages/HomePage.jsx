import React from 'react';

const HomePage = props => {
    return (
    <><div className="card mb-3">
      <h3 className="card-header">Card header</h3>
      <div className="card-body">
        <h5 className="card-title">Special title treatment</h5>
        <h6 className="card-subtitle text-muted">Support card subtitle</h6>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" className="d-block user-select-none" width="100%" height="200" aria-label="Placeholder: Image cap" focusable="false" role="img" preserveAspectRatio="xMidYMid slice" viewBox="0 0 318 180" style={{fontSize: '1.125rem', textAnchor: 'middle'}}>
        <rect width="100%" height="100%" fill="#868e96"></rect>
        <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>
      </svg>
    <div className="card-body">
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <ul className="list-group list-group-flush">
    <li className="list-group-item">Cras justo odio</li>
    <li className="list-group-item">Dapibus ac facilisis in</li>
    <li className="list-group-item">Vestibulum at eros</li>
  </ul>
  <div className="card-body">
    <a href="#" className="card-link">Card link</a>
    <a href="#" className="card-link">Another link</a>
  </div>
  <div className="card-footer text-muted">
    2 days ago
  </div>
</div>
<div className="card">
  <div className="card-body">
    <h4 className="card-title">Card title</h4>
    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" className="card-link">Card link</a>
    <a href="#" className="card-link">Another link</a>
  </div>
</div></>
);

}

export default HomePage