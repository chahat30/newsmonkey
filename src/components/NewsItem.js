import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {

    let {title,description,imageurl,newsurl,author,date,source}=this.props;

    return (
      <div className="my-3">
        <div className="card h-100" >
          <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:0}}>
        <span className="badge rounded-pill bg-info" >
         {source} </span>
         </div>
        <img src={!imageurl?"https://media.transcontinentaltimes.com/2023/02/Exoplanet-300x169.jpg":imageurl} className="card-img-top" alt="..."/>
        <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
        <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
        </div>
        </div>
      </div>
    )
  }
}
