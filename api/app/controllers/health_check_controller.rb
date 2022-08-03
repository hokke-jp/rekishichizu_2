class HealthCheckController < ApplicationController
  def index
    logger.info '============================================================'
    logger.info "ReuqestUrl: #{request.url}"
    render json: { status: 200, time: Time.zone.now }, status: 200
  end
end
