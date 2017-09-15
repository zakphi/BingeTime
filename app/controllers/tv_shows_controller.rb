class TvShowsController < ApiController
  before_action :require_login, except: [:show, :search]

  def show
    tv_show = TvShow.find(params[:id])
    tv_show_user = tvshow.user
    render json: { tv_show: tv_show, users: tvshow_user.username }
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

  private

  def tv_show_params
    params.require(:tv_show).permit(:external_id, :title, :summary, :poster_path, :run_time)
  end
end
