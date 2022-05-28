import React, { Component } from "react";
import "./MovieItem.css";
import { selectMovies } from "../../redux/action";
import { connect } from "react-redux";
class MovieItem extends Component {
  isAdded=(id)=>{
    const active=this.props.isAdded.find((item)=>{
      return item.imdbID===id
    });
    return active
  }
  render() {
    const { Title, Year, Poster, imdbID, addMovies,savedBolen } = this.props;
    return (
      <article className="movie-item">
        <img className="movie-item__poster" src={Poster} alt={Title} />
        <div className="movie-item__info">
          <h3 className="movie-item__title">
            {Title}&nbsp;({Year})
          </h3>
          <button
            type="button"
            className="movie-item__add-button"
            onClick={() => addMovies(imdbID)}
            disabled={savedBolen}
          >
            {this.isAdded(imdbID) ? "был добавлен в список":"добавить в список"}
          </button>
        </div>
      </article>
    );
  }
}const mapDispatchToProps = (dispatch) => { 
  return {
    addMovies:(id)=>{
      dispatch(selectMovies(id))
    }
  };
};
const mapStateToProps=(state)=>{
  return{
    isAdded:state.addMovies,
    savedBolen:state.savedBolen,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieItem);