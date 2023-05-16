def Menues_to_Json(queryset):
    result = []
    for query in queryset:
        menu = {}
        menu["id"] = int(query.id)
        menu["image"] = query.image.url
        menu["name"] = query.name
        menu["price"] = int(query.price)
        menu["able"] = query.status
        result.append(menu)

    return result

