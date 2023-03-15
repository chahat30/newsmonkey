import React, { Component } from 'react'

import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps={
    country:'in',
    pageSize:8,
    category:'general'
  }

  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }

constructor(props)
{
  super(props)
  this.state={
    articles:[],
    loading:false,
    page:1
  }
  document.title="NewsMonkey -"+this.props.category;
}

async updateNews()
{
  let url=`https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=e11f3fc985b848979407594af3a6a3af&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true})
  let data=await fetch(url);
  let parsedData=await data.json();
  this.setState({
      articles:parsedData.articles,
      totalarticles:parsedData.totalResults,
      loading:false
  })
}

handlePrevclick= async ()=>{
 /* let url=`https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=e11f3fc985b848979407594af3a6a3af&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true})
  let data=await fetch(url);
  let parsedData=await data.json();
  this.setState({
    page:this.state.page-1,
    articles:parsedData.articles,
    loading:false
  })*/
  await this.setState({page:this.state.page-1});
  this.updateNews();
}

handleNextclick= async ()=>{
/*
  let url=`https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=e11f3fc985b848979407594af3a6a3af&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true})
  let data=await fetch(url);
  let parsedData=await data.json();
  this.setState({
    page:this.state.page+1,
    articles:parsedData.articles,
    loading:false
  })
*/
  await this.setState({page:this.state.page+1});
  this.updateNews();
}

async componentDidMount()
{/*
  let url=`https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=e11f3fc985b848979407594af3a6a3af&page=1&pageSize=${this.props.pageSize}`;
  this.setState({loading:true})
  let data=await fetch(url);
  let parsedData=await data.json();
  this.setState({
      articles:parsedData.articles,
      totalarticles:parsedData.totalResults,
      loading:false
  })*/
  this.updateNews();
}

  render() {
    return (
      <>
      <div className="container my-3">
        <h2 className="text-center my-3">NewsMonkey - Top Headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3">
          {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col md-4" key={element.url} >
            <NewsItem title={element.title} description={element.description} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevclick}>&larr; Prev</button>
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalarticles/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextclick}>Next &rarr;</button>
       </div>
      </div>
      </>
    )
  }
}

export default News
