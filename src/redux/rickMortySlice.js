import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// callback to be used for fetching with multiply queries
const getPaginated = async (payload) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/${payload.query}/?page=${payload.page}&${payload.filter}=${payload.name}`
  )
  let result = response.json()
  return result
}

// methods for fetching with dedicated queries
export const getEpisodesAsync = createAsyncThunk(
  'displayEpisodes/fetchEpisodes',
  (payload) => getPaginated(payload)
)

export const getSpeciesAsync = createAsyncThunk(
  'displaySpecies/fetchSpecies', 
  (payload) => getPaginated(payload)
)

export const getLocationsAsync = createAsyncThunk(
  'displayLocations/fetchLocations',
  (payload) => getPaginated(payload)
)

// callback for fetching data from all pages at once
const getAllAsync = async (payload) => {
  const pages = new Array(payload.count)
      .fill()
      .map((p, i) => p = i + 1)
    const results = await Promise.all(
      pages.map(page => 
        fetch(`https://rickandmortyapi.com/api/${payload.query}?page=${page}`)
          .then(data => data.json())
      )
    )
    let mapped = results.map(res => res.results).flat()
    return mapped
}

// methods for fetching from all pages at once with dedicated queries
export const getAllCharactersAsync = createAsyncThunk(
  'displayAllCharacters/fetchAllCharacters',
  () => getAllAsync({ query: 'character', count: 42 })
)

export const getAllEpisodesAsync = createAsyncThunk(
  'displayAllEpisodes/fetchAllEpisodes',
  () => getAllAsync({ query: 'episode', count: 3 })
)

export const getAllLocationsAsync = createAsyncThunk(
  'displayAllLocations/fetchAlllocations',
  () => getAllAsync({ query: 'location', count: 7 })
)


// state slice
const rickMortySlice = createSlice({
  name: 'rickMorty',
  initialState: {
    characterPage: 1,
    episodePage: 1,
    locationsPage: 1,
    searchFormName: '',
    searchFormEpisode: '',
    filters: {
      episodeFilter: {
        filter: '',
        name: ''
      },
      characterFilter: {
        filter: '',
        name: ''
      },
      locationFilter: {
        filter: '',
        name: ''
      },
    },
    watchlist: null,
    displaySpecies: null,
    displayEpisodes: null,
    displayLocations: null,
    displayAllLocations: null,
    displayAllEpisodes: null,
    displayAllCharacters: null,
    speciesStatus: 'idle',
    episodesStatus: 'idle',
    locationsStatus: 'idle',
    allEpisodesStatus: 'idle',
    allCharactersStatus: 'idle',
    allLocationsStatus: 'idle',
    speciesError: null,
    episodesError: null,
    locationsError: null,
    allEpisodesError: null,
    allCharactersError: null,
    allLocationsError: null
  },
  reducers: {
    setWatchList: (state, action) => {
      state.watchlist = action.payload
    },
    setSearchFormName: (state, action) => {
      state.searchFormName = action.payload
    },
    setSearchFormEpisode: (state, action) => {
      state.searchFormName = action.payload
    },
    setEpisodeFilter: (state, { payload }) => {
      state.filters.episodeFilter.filter = payload.filter
      state.filters.episodeFilter.name = payload.name
      state.episodePage = 1
    },
    setCharacterFilter: (state, { payload }) => {
      state.filters.characterFilter.filter = payload.filter
      state.filters.characterFilter.name = payload.name
      state.characterPage = 1
    },
    setLocationFilter: (state, { payload }) => {
      state.filters.locationFilter.filter = payload.filter
      state.filters.locationFilter.name = payload.name
      state.locationsPage = 1
    },
    flipPage: (state, { payload }) => {
      if (payload.keyword === 'characters') {
        state.characterPage = state.characterPage += payload.delta
      }
      else if (payload.keyword === 'episodes') {
        state.episodePage = state.episodePage += payload.delta
      }
      else if (payload.keyword === 'locations') {
        state.locationsPage = state.locationsPage += payload.delta
      }
    }
  },
  extraReducers(builder) {
    builder
      // getSpeciesAsync cases
      .addCase(getSpeciesAsync.pending, (state, action) => {
        state.speciesStatus = 'loading'
      })
      .addCase(getSpeciesAsync.fulfilled, (state, action) => {
        state.speciesStatus = 'succeeded'
        state.displaySpecies = action.payload
      })
      .addCase(getSpeciesAsync.rejected, (state, action) => {
        state.speciesStatus = 'failed'
        state.speciesError = action.error.message
      })
      // getEpisodesAsync cases
      .addCase(getEpisodesAsync.pending, (state, action) => {
        state.episodesStatus = 'loading'
      })
      .addCase(getEpisodesAsync.fulfilled, (state, action) => {
        state.episodesStatus = 'succeeded'
        state.displayEpisodes = action.payload
      })
      .addCase(getEpisodesAsync.rejected, (state, action) => {
        state.episodesStatus = 'failed'
        state.episodesError = action.error.message
      })
      // getLocationsAsync cases
      .addCase(getLocationsAsync.pending, (state, action) => {
        state.locationsStatus = 'loading'
      })
      .addCase(getLocationsAsync.fulfilled, (state, action) => {
        state.locationsStatus = 'succeeded'
        state.displayLocations = action.payload
      })
      .addCase(getLocationsAsync.rejected, (state, action) => {
        state.locationsStatus = 'failed'
        state.locationsError = action.error.message
      })
      // getAll cases
      .addCase(getAllCharactersAsync.pending, (state, action) => {
        state.allCharactersStatus = 'loading'
      })
      .addCase(getAllEpisodesAsync.pending, (state, action) => {
        state.allEpisodesStatus = 'loading'
      })
      .addCase(getAllLocationsAsync.pending, (state, action) => {
        state.allLocationsStatus = 'loading'
      })
      .addCase(getAllCharactersAsync.fulfilled, (state, action) => {
        state.allCharactersStatus = 'succeeded'
        state.displayAllCharacters = action.payload
      })
      .addCase(getAllEpisodesAsync.fulfilled, (state, action) => {
        state.allEpisodesStatus = 'succeeded'
        state.displayAllEpisodes = action.payload
      })
      .addCase(getAllLocationsAsync.fulfilled, (state, action) => {
        state.allLocationsStatus = 'succeeded'
        state.displayAllLocations = action.payload
      })
      .addCase(getAllCharactersAsync.rejected, (state, action) => {
        state.allCharactersStatus = 'failed'
        state.allCharactersError = action.error.message
      })
      .addCase(getAllEpisodesAsync.rejected, (state, action) => {
        state.allEpisodesStatus = 'failed'
        state.allEpisodesError = action.error.message
      })
      .addCase(getAllLocationsAsync.rejected, (state, action) => {
        state.allLocationsStatus = 'failed'
        state.allLocationsError = action.error.message
      })
  }
})

export const { 
  flipPage, 
  addUser, 
  likedChar, 
  disLikedChar, 
  filterChar,
  setEpisodeFilter, 
  setCharacterFilter,
  setLocationFilter, 
  setSearchFormName,
  setSearchFormEpisode,
  setWatchList
} = rickMortySlice.actions;


export default rickMortySlice.reducer