class TvShowsController < ApiController
  before_action :require_login, except: [:show, :search]

  def show
    showID = params[:id]
    tmdb_key = Rails.application.secrets.api_key
    response = HTTParty.get("https://api.themoviedb.org/3/tv/#{showID}?api_key=#{tmdb_key}")
    render json: response
  end

  def create
    tv_show = TvShow.new(tv_show_params)
    # tv_show.user = current_user
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
    tmdb_key = Rails.application.secrets.api_key
    search_res = HTTParty.get("https://api.themoviedb.org/3/search/tv?query=#{showName}&api_key=#{tmdb_key}")
    config_res = HTTParty.get("https://api.themoviedb.org/3/configuration?api_key=#{tmdb_key}")

    render json: {search_res: search_res, config_res: config_res}
  end

  private

  def tv_show_params
    params.require(:tv_show).permit(:external_id, :title, :summary, :poster_path, :run_time)
  end
end
