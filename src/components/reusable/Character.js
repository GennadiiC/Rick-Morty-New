import { useEffect, useState } from "react";

export const Character = ({ 
  name, 
  species, 
  gender,  
  location, 
  status,
  episode,
  created, 
  image
}) => {

  
  const [ clicked, setClicked ] = useState(false)
  const [ episodes, setEpisodes ] = useState(null)
  const [ error, setError ] = useState(null)


  let idsArr = episode.map(ep => Number(ep.slice(-2).replace('/', '')))
  let ids = idsArr.join(',')

  const fetchEpisodes = async () => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode/${ids}`
      )
      let result = await response.json()
      setEpisodes(result)
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchEpisodes()
  }, [])


  function episodesData (data) {
    if (Array.isArray(episodes)) {
      return episodes.map(ep => ep[data]).join(', ') 
    } else {
      return episodes[data]
    }
  }


  let title = episodes ? episodesData('name') : error ? error : null

  let series = episodes ? episodesData('episode') : error ? error : null


  return ( 
    <div className="d-flex justify-content-between my-2 rounded shadow">
      
      <div className="container">
        <img className="float-start rounded img-fluid my-3 me-3" src={image} alt={name} />
        <div className="mt-3">
          <h5>Name: <span className="sm">{name}</span>, Status: <span className="sm">{status}</span></h5> 
          <div className="d-flex flex-column align-items-end">
            <button className="btn my-3" onClick={() => setClicked(!clicked)}>{!clicked ? 'Show Info' : 'Hide Info'}</button>
          </div> 
          <div className={!clicked ? "d-none" : null}>
            <p><span className="fs-5">Species:</span> {species}</p>
            <p><span className="fs-5">Gender:</span> {gender}</p>
            <p><span className="fs-5">Location:</span> {location.name}</p>
            <p><span className="fs-5">Created:</span> {created.slice(0, -14)}</p>
            <div>
              <p className="fs-5">Episode(s):</p>
              <div>
                <p className="ser">series:</p> 
                <p>{series}</p>
              </div>
              <div>
                <p className="ser">title:</p> 
                <p>{title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}