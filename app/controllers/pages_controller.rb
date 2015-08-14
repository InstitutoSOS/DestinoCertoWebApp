class PagesController < ApplicationController
  def index
  end

  def results
    materials = t('materials')
    material  = params[:material].to_sym

    if materials.has_key?(material)
      @material = materials[material]
      @material_key = material.to_s
    else
      redirect_to root_path
    end
  end

  def signup
  end
end
