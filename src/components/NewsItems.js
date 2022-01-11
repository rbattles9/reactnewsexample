import React, { Component } from 'react'

export default class NewsItems extends Component {
  render() {

    let { title, description, imageURL, URL } = this.props;
    return (
      <div style={{ justifyContent: "center", paddingBottom: "20px" }}>
        <div className="card" style={{ height: '400px' }}>
          <img src={imageURL} className="card-img-top" alt="#" style={{ width: "90%", minHeight: "150px", margin: "0 auto", paddingTop: "10px" }} />
          <div className="card-body" ><strong>{title ? title.slice(0.50) : "Description:"}...</strong><br />
            <p className="card-text" style={{ minHeight: "40px", alignItems: "center" }}>{description ? description.slice(0, 100) : ""}...</p>
            <a rel="noreferrer" className="btn btn-primary" target="_blank" href={URL}>Read More</a>
          </div>
        </div>
      </div>
    )
  }
}
