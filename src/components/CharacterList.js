import { Character } from "./reusable/Character"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { PaginationFilter } from "./reusable/PaginationFilter"
import { getAllCharactersAsync, getSpeciesAsync, setCharacterFilter } from "../redux/rickMortySlice"

// component to display on 'Characters' link
export function CharacterList () {

  const filterparams = ['species', 'status', 'gender']
  const title = 'Browse List of Characters'
  const keyword = 'characters'

  const {
    characterPage, 
    filters,
    displaySpecies, 
    speciesStatus, 
    speciesError,
    displayAllCharacters,
    allCharactersStatus,
    allCharactersError
  } = useSelector((state) => state.rickMorty)

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getSpeciesAsync({
      query: 'character',
      page: characterPage,
      filter: filters.characterFilter.filter,
      name: filters.characterFilter.name
    }))
  }, [dispatch, characterPage, filters.characterFilter.filter, filters.characterFilter.name])


  return (
    <div className='container-fluid mt-5 custom-width'>
      
      <PaginationFilter 
        filterparams={filterparams}
        filter={filters.characterFilter.filter}
        display={displayAllCharacters}
        status={allCharactersStatus}
        error={allCharactersError}
        asyncFuncAll={getAllCharactersAsync}
        asyncFuncLocal={setCharacterFilter}
        name={filters.characterFilter.name}
        title={title}
        keyword={keyword}
        pageQuantity={
          speciesStatus === 'succeeded' && displaySpecies.info ? 
          displaySpecies.info.pages : 
          null
        }
        page={characterPage}
      />

      { 
        speciesStatus === 'loading' ? 
        <p>Loading...</p> :
        speciesStatus === 'succeeded' && displaySpecies.results ?
        displaySpecies.results.map(char => 
          <Character 
            key={char.id + 1}
            id={char.id}
            name={char.name}
            species={char.species}
            gender={char.gender}
            location={char.location}
            status={char.status}
            episode={char.episode}
            created={char.created}
            image={char.image}
          />
        ) :
        speciesStatus === 'succeeded' && displaySpecies.error ? 
        <p>Oops, {displaySpecies.error.toLowerCase()}</p> :
        speciesStatus === 'failed' && speciesError ?
        <p>Oops, {speciesError}</p> :
        null
      }
    </div>
  )
}