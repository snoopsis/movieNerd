import React, { useState } from "react";
import axios from "axios";

function App() {
  // useEffect(() => {
  // axios.get("/getMovies").then(response => {
  //   setFilmes(response.data);
  // });
  // }, []);

  const onChange = e => setTitle({ ...title, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    setFilmes([]);
    setIsLoading(true);
    axios
      .post("https://api.migueldias.net/movienerd/getMovies", {
        addGeneros: title.addGeneros,
        score: title.score,
        titulo: title.titulo,
        votos: title.votos
      })
      .then(function(response) {
        setIsLoading(false);
        setFilmes(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const [filmes, setFilmes] = useState([]);
  const [title, setTitle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="page-single movie_list">
      <div className="container">
        <div className="row ipad-width2">
          <div className="col-md-4 col-sm-12 col-xs-12">
            <div className="sidebar">
              <div className="searh-form">
                <h4 className="sb-title">Search for movie</h4>
                <form onSubmit={onSubmit} className="form-style-1">
                  <div className="row">
                    <div className="col-md-12 form-it">
                      <label>Movie name</label>
                      <input
                        type="text"
                        onChange={onChange}
                        placeholder="Enter keywords"
                        name="titulo"
                      />
                    </div>
                    <div className="col-md-12 form-it">
                      <label>Match Genre</label>
                      <input
                        type="text"
                        onChange={onChange}
                        placeholder="Enter keywords"
                        name="addGeneros"
                      />
                    </div>

                    <div className="col-md-12 form-it">
                      <label>Rating Range</label>

                      <select onChange={onChange} name="score" required>
                        <option value="5">> 5</option>
                        <option value="6">> 6</option>
                        <option value="7">> 7</option>
                        <option value="8">> 8</option>
                        <option value="9">> 9</option>
                      </select>
                    </div>
                    <div className="col-md-12 form-it">
                      <label>Votes</label>

                      <select onChange={onChange} name="votos" required>
                        <option value="1000">> 1000</option>
                        <option value="10000">> 10000</option>
                        <option value="25000">> 25000</option>
                        <option value="100000">> 100000</option>
                        <option value="500000">> 500000</option>
                      </select>
                    </div>
                    <div className="col-md-12 ">
                      <input className="submit" type="submit" value="search" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-8 col-sm-12 col-xs-12">
            {isLoading && (
              <img
                src="https://i.redd.it/6eqdnsnk9vwx.gif"
                alt="Loading..."
              ></img>
            )}
            {filmes.map(i => (
              <div className="movie-item-style-2" key={i.id}>
                <img
                  src={i.cover}
                  alt={i.titulo}
                  style={{
                    height: "auto",
                    width: "auto",
                    maxWidth: "170px",
                    maxHeight: "261px"
                  }}
                />
                <div className="mv-item-infor">
                  <h6
                    style={{
                      fontFamily: "Dosis",
                      fontSize: "14px",
                      color: "#FFF",
                      fontWeight: "bold",
                      textTransform: "uppercase"
                    }}
                  >
                    {i.titulo}
                  </h6>
                  <p className="rate">
                    <i className="ion-android-star"></i>
                    <span>{i.score}</span> /10
                  </p>
                  <p className="describe">{i.descricao}</p>
                  <p className="run-time"> Genre: {i.genero} </p>
                  <p style={{ color: "#4280bf" }}>Votes:{i.votos}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
