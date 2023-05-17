def Menues_to_Json(queryset):
    result = []
    for query in queryset:
        menu = {}
        menu["name"] = query.menu.name
        menu["quantity"] = query.quantity
        result.append(menu)

    return result


def Orders_to_Json(queryset):
    result = []
    for query in queryset:
        order = {}
        order["id"] = query.id
        order["phone_number"] = str(query.phone_num)
        order["menues"] = Menues_to_Json(query.ordered_menu_set.all())
        order["table_num"] = query.table_num
        order["created_at"] = str(query.created_at)[5:19]
        order["status"] = query.status

        result.append(order)

    return result


