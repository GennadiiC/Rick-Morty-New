import { useForm } from 'react-hook-form';
import { getAllCharactersAsync, getSpeciesAsync, setSearchFormName } from '../redux/rickMortySlice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Character } from './reusable/Character';

// component to display on 'Search Form' link, also displayed as main page
export function Searchform () {

  const { register, handleSubmit, reset } = useForm();

  const { 
    displaySpecies,
    speciesStatus, 
    speciesError,
    displayAllCharacters, 
    allCharactersStatus, 
    allCharactersError,
    searchFormName 
  } = useSelector(state => state.rickMorty)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCharactersAsync())
  }, [dispatch])

  useEffect(() => {
    dispatch(getSpeciesAsync({
      query: 'character',
      filter: 'name',
      name: searchFormName
    }))
  }, [dispatch, searchFormName])


  const onSubmit = (value) => {
    dispatch(setSearchFormName(value.name))
    reset();
  }

  return (
    <div className='container-fluid mt-5 custom-width'>
      <h3 className='h3 text-center my-4'>Find your character</h3>
      
      {
        searchFormName === '' ?
        <p className="my-3">Enter name...</p> :
        speciesStatus === 'loading' ?
        <p className="my-3">Loading...</p> :
        speciesStatus === 'succeeded' && displaySpecies.results ?
        <p className="my-3">Look what I found:</p> :
        speciesStatus === 'succeeded' && displaySpecies.error ?
        <p className="my-3">Ops, {displaySpecies.error.toLowerCase()}!</p> :
        speciesStatus === 'rejected' && speciesError ?
        <p className="my-3">Ops, {speciesError.toLowerCase()}!</p> :
        null
      }
      <form className='input-group input-group-sm my-4' onSubmit={handleSubmit(onSubmit)}>
        <input 
          className="form-control" 
          list="datalistOptions" 
          id="exampleDataList" 
          {...register('name')} 
          aria-label="Text input with dropdown button" 
          autoComplete="off" 
        />
        <datalist className='datalist' id="datalistOptions">
          
          { 
            allCharactersStatus === 'loading' ?
            <option label='loading'>Loading...</option> :
            allCharactersStatus === 'succeeded' && displayAllCharacters ?
            displayAllCharacters.map(char => 
              <option key={char.id} value={char.name} />
            ) :
            allCharactersStatus === 'failed' && allCharactersError ?
            <option label='error'>Oops, {allCharactersError}</option> :
            null
          }
          
        </datalist>
        <button className="btn" type="button" onClick={handleSubmit(onSubmit)}>Start/Reset</button>
      </form>
      <div>
        
        {
          searchFormName === '' ?
          null :
          speciesStatus === 'succeeded' && searchFormName !== '' && displaySpecies.results ?
          displaySpecies.results.map(item => 
            <Character 
              id={item.id}
              key={item.id + 1}
              name={item.name}
              status={item.status}
              species={item.species}
              gender={item.gender}
              location={item.location}
              episode={item.episode}
              created={item.created}
              image={item.image}
            />
          ) :
          null
        }
      </div>
    </div>
  );
}