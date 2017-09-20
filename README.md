# BingeTime!

[BingeTime!](https://bingetime.herokuapp.com/)

## What is BingeTime!?

BingeTime is a simple app where a visitor can search for a show, and the result will be how many seasons and episodes the show has and how long it will take to binge watch the show. The user can also create an account, so they can save the shows they are binge watching.

## User Stories
When visiting the site, the user will be will see a search bar. The user can search for a show. After selecting the show, the user will see how many seasons and episodes the show has and how long it will take to watch the show. If the user has an account, they can favorite the show and on their profile page they will see all their favorite shows.

## Technology Used

- React: front end
- Rails: back end
- The Movie Database: api

### Notes on App Structure

#### Code Samples
function for show search
```
handleShowSearch = (e) => {
  e.preventDefault()
  axios('/search', {
    method: 'POST',
    data: {
      showName: this.state.showName
    }
  })
    .then(res => {
      this.setState({
        showResults: res.data.results,
        searchResultsLoaded: true
      })
    })
}
```

method to handle the search
```
def search
  showName = params[:showName]
  search_res = HTTParty.get("https://api.themoviedb.org/3/search/tv?query=#{showName}&api_key=#{tmdb_key}")

  render json: search_res
end
```

#### Challeneges
CSS and thinking of how to design the app

## The Making of BingeTime!
[tmdb api](https://developers.themoviedb.org/3/getting-started)

## Opportunities for Future Growth
- Make app look prettier
- Add show count and total bingetime to user's profile