module ApplicationHelper
  def material_list
    materials = t 'materials'
    elements = []

    materials.each do |key, value|
      span = content_tag(:span, value)
      link = link_to(span, "material/#{key}", class: "material-item material-#{key}")
      elements << content_tag(:div, link, class: :material)
    end

    safe_join(elements)
  end

  def material_links
    materials = t 'materials'
    links = []

    current_material = params[:material]

    materials.each do |key, value|
      is_active = (key.to_s == current_material) ? 'active' : ''
      links << link_to(value, "/material/#{key}/", class: is_active)
    end

    safe_join(links)
  end
end
