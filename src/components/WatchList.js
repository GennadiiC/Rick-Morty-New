import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { getAllEpisodesAsync, setSearchFormEpisode, setWatchList } from '../redux/rickMortySlice';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from './reusable/Table'


// component to display on 'My Watchlist' link
export const WatchList = () => {

  const { register, handleSubmit, reset } = useForm();

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllEpisodesAsync())
  }, [dispatch])


  const {
    displayAllEpisodes,
    allEpisodesStatus,
    allEpisodesError, 
    searchFormEpisode,
    watchlist
  } = useSelector(state => state.rickMorty)

  useEffect(() => {
    if (localStorage.length) {
      let arr = []
      for (let i = 0; i < localStorage.length; i++) {
        let obj = JSON.parse(localStorage.getItem(localStorage.key(i)))
        arr.push(obj)
      }
      dispatch(setWatchList(arr))
    }
  }, [localStorage.length])


  const onSubmit = (value) => {
    if (value.episode !== '') {
      dispatch(setSearchFormEpisode(value.episode))
      let foundEpisode = displayAllEpisodes.find(ep => ep.name === value.episode)
      foundEpisode = {
        ...foundEpisode,
        checked: false
      }
      if (JSON.parse(localStorage.getItem(foundEpisode.id)) !== foundEpisode.id) {
        localStorage.setItem(foundEpisode.id, JSON.stringify(foundEpisode))
      }
      reset();
    }
  }


  return (
    <div className='container-fluid mt-5 custom-width'>
      <h3 className='h3 text-center my-4'>Watchlist</h3>
    
      {
        searchFormEpisode === '' ?
        <p className="text-center my-3">Enter name...</p> :
        allEpisodesStatus === 'loading' ?
        <p className="text-center my-3">Loading...</p> :
        allEpisodesStatus === 'succeeded' && displayAllEpisodes.error ?
        <p className="text-center my-3">Ops, {displayAllEpisodes.error.toLowerCase()}!</p> :
        allEpisodesStatus === 'rejected' && allEpisodesError ?
        <p className="text-center my-3">Ops, {allEpisodesError.toLowerCase()}!</p> :
        null
      }

      <form className='input-group input-group-sm my-4' onSubmit={handleSubmit(onSubmit)}>
        <input 
          className="form-control" 
          list="datalistOptions" 
          id="exampleDataList" 
          {...register('episode')} 
          aria-label="Text input with dropdown button" 
          autoComplete="off" 
        />
        <datalist className='datalist' id="datalistOptions">
          
          { 
            allEpisodesStatus === 'loading' ?
            <option label='loading'>Loading...</option> :
            allEpisodesStatus === 'succeeded' && displayAllEpisodes ?
            displayAllEpisodes.map(ep => 
              <option key={ep.id} value={ep.name} />
            ) :
            allEpisodesStatus === 'failed' && allEpisodesError ?
            <option label='error'>Oops, {allEpisodesError}</option> :
            null
          }
          
        </datalist>
        <button className="btn" type="button" onClick={handleSubmit(onSubmit)}>Add Episode</button>
      </form>

      {
        watchlist === null ?
        <p className="text-center my-3">Your watchlist is empty.</p> :
        watchlist !== null ? 
        <p className="text-center my-3">Your watchlist:</p> :
        null
      }
      {
        watchlist !== null ?
          <Table 
            dataArr={watchlist}
            className={'table table-hover'}
            col1={'Name'}
            col2={'Code'}
            col3={'Air Date'}
            col4={'Remove From Watchlist'}
            col5={'Done'}
            mapProps={{
              one: 'name',
              two: 'episode',
              three: 'air_date',
              four: 'click to remove'
            }}
          />
         :
        null
      }
    </div>
  )
}