import React, { Component } from "react";
import "./Favorites.css";
import { connect } from "react-redux";
import { deleteMovies,setLinkActive,isSaved } from "../../redux/action";
import axios from "axios";
class Favorites extends Component {
  state={
    disable:false,
    clsName:"favorites__save",
    listLink: "#",
    title:"",
  }
  handleInput = (e) => {
    this.setState({ title: e.target.value });
  };
  saveList=(e)=>{
    e.target.style.display='none'
    document.querySelector('.link__none').style.display='block'
    this.props.isSaved()
    axios
      .post("https://acb-api.algoritmika.org/api/movies/list", {
        title: this.state.title,
        movies: this.props.movies.map((item) => item.imdbID),
      })
      .then((res) => {
        this.setState({ listLink: res.data.id });
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
  render() {
    const {linkActive,movies } = this.props;
    const { title, listLink } = this.state;
    return (
      <div className="favorites">
        <input className="favorites__name" value={this.state.title} onChange={this.handleInput} placeholder="Пожалуйста, введите название"/>
        <ul className="favorites__list">
          {this.props.movies.map((item) => {
            return (
              <li key={item.imdbID}>
                {item.Title} ({item.Year})
                <button onClick={() => this.props.deleteMovies(item.imdbID)}>
                  x
                </button>
              </li>
            );
          })}
        </ul>
        <button  type="button" disabled={!title || movies.length===0}  onClick={this.saveList}  className={this.state.clsName}>
          Сохранить список
        </button>
        <a
          href={`http://localhost:3000/list/${listLink}`}
          className={`link__none ${linkActive ? "link__block" : null}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Перейти сохраненный список
        </a>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { 
    movies: state.addMovies,
    linkActive: state.linkActive,
    savedBolen:state.savedBolen,
   };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteMovies: (id) => {
      dispatch(deleteMovies(id));
    },
    setLinkActive: (bool) => {
      dispatch(setLinkActive(bool));
    },
    isSaved:()=>{
      dispatch(isSaved())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);