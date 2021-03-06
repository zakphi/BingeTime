class TvShowsController < ApiController
  before_action :require_login, except: [:show, :search, :img_config, :destroy]

  def index
    tv_shows = TvShow.where(user_id: current_user.id).reverse
    render json: tv_shows
  end

  def show
    showID = params[:id]
    response = HTTParty.get("https://api.themoviedb.org/3/tv/#{showID}?api_key=#{tmdb_key}")
    render json: response
  end

  def create
    tv_show = TvShow.new(tv_show_params)
    tv_show.user = current_user
    if tv_show.save
      render json: {
        message: 'ok',
        tv_show: tv_show
      }
    else
      render json: { message: 'could not save show' }
    end
  end

  def search
    showName = params[:showName]
    search_res = HTTParty.get("https://api.themoviedb.org/3/search/tv?query=#{showName}&api_key=#{tmdb_key}")

    render json: search_res
  end

  def img_config
    response = HTTParty.get("https://api.themoviedb.org/3/configuration?api_key=#{tmdb_key}")

    render json: response
  end

  def destroy
    showID = params[:id]
    TvShow.where(user_id: current_user.id, external_id: showID).destroy_all
  end

  private

  def tv_show_params
    params.require(:tv_show).permit(:external_id, :title, :summary, :poster_path, :run_time)
  end

  def tmdb_key
    Rails.application.secrets.api_key || ENV['api_key']
  end
end
