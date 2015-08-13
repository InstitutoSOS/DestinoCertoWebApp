module ApplicationHelper
  def material_list
    materials = t 'materials'
    elements = []

    materials.each do |key, value|
      button = button_tag(value, data: { value: value })
      elements << content_tag(:div, button, class: :material)
    end

    safe_join(elements)
  end
end
