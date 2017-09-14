class UsersController < ApiController
  before_action :require_login, except: [:create]

  def create
    user = User.create!(user_params)
    render json: { token: user.auth_token }
  end

  def profile
    user = User.find_by_auth_token!(request.headers[:token])
    render json: { user: { id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email, username: user.username } }
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :username, :password)
  end
end
