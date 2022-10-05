import { getAllEpisodesAsync, getEpisodesAsync, setEpisodeFilter } from "../redux/rickMortySlice"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { PaginationFilter } from "./reusable/PaginationFilter"
import { Table } from './reusable/Table'

// component to display on 'Episodes' link
export const Episodes = () => {

  const filterparams = ['name', 'episode']
  const title = 'Browse episodes'
  const keyword = 'episodes'

  const {
     displayEpisodes,
     displayAllEpisodes,
     episodesStatus,
     allEpisodesStatus,
     episodesError,
     allEpisodesError, 
     filters, 
     episodePage 
  } = useSelector(state => state.rickMorty)

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getEpisodesAsync({
      query: 'episode', 
      page: episodePage, 
      filter: filters.episodeFilter.filter,
      name: filters.episodeFilter.name
    }))
  },[dispatch, episodePage, filters.episodeFilter.filter, filters.episodeFilter.name])

  return (
    <div className="container-fluid mt-5 custom-width">
      <PaginationFilter 
        filterparams={filterparams}
        filter={filters.episodeFilter.filter}
        display={displayAllEpisodes}
        status={allEpisodesStatus}
        error={allEpisodesError}
        asyncFuncAll={getAllEpisodesAsync}
        asyncFuncLocal={setEpisodeFilter}
        name={filters.episodeFilter.name}
        title={title}
        keyword={keyword}
        pageQuantity={
          episodesStatus === 'succeeded' && displayEpisodes.info ? 
          displayEpisodes.info.pages : 
          null
        }
        page={episodePage}
      />
      {console.log(filters.episodeFilter.name)}
      <Table 
        className={'table'}
        col1={'Name'}
        col2={'Code'}
        col3={'Air Date'}
        display={displayEpisodes}
        status={episodesStatus}
        error={episodesError}
        mapProps={{
          one: 'name',
          two: 'episode',
          three: 'air_date'
        }}
      />
    </div>
  )
}