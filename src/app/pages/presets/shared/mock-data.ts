
// http://localhost:4200/chm/backend/sites/415/models
export const MOCK_MODELS = [{"modelId":1,"modelName":"Modelo de Precio de Prueba","channelId":4,"channelName":"Ebay","modelTypeId":1,"modelTypeName":"PRECIO","modelAttributes":[{"idModelAttribute":2,"idModel":1,"idAttributeModelChannel":{"idAttributeModelChannel":1,"channelId":4,"channelName":"Ebay","modelTypeId":1,"modelTypeName":"PRECIO","attributeName":"Modificador","attributeType":"LIST_OF_VALOURS","acceptedValues":["Precio preestablecido","Incrementar Porcentaje","Incrementar Absoluto","Reducir Porcentaje","Reducir Absoluto"]},"attributeValue":"Incrementar Absoluto"},{"idModelAttribute":3,"idModel":1,"idAttributeModelChannel":{"idAttributeModelChannel":2,"channelId":4,"channelName":"Ebay","modelTypeId":1,"modelTypeName":"PRECIO","attributeName":"Modificador (valor)","attributeType":"NUMBER","acceptedValues":null},"attributeValue":"6.5"},{"idModelAttribute":4,"idModel":1,"idAttributeModelChannel":{"idAttributeModelChannel":3,"channelId":4,"channelName":"Ebay","modelTypeId":1,"modelTypeName":"PRECIO","attributeName":"Fecha de Inicio","attributeType":"TIME","acceptedValues":null},"attributeValue":"2018-01-01T15:15:00.000Z"},{"idModelAttribute":5,"idModel":1,"idAttributeModelChannel":{"idAttributeModelChannel":4,"channelId":4,"channelName":"Ebay","modelTypeId":1,"modelTypeName":"PRECIO","attributeName":"Fecha de Fin","attributeType":"DATE","acceptedValues":null},"attributeValue":"2018-12-31T16:16:00.000Z"},{"idModelAttribute":5,"idModel":1,"idAttributeModelChannel":{"idAttributeModelChannel":4,"channelId":4,"channelName":"Ebay","modelTypeId":1,"modelTypeName":"PRECIO","attributeName":"Fecha de Fin","attributeType":"DATETIME","acceptedValues":null},"attributeValue":"2018-12-31T17:17:00.000Z"}]},{"modelId":2,"modelName":"Modelo de Descripcion de Prueba","channelId":4,"channelName":"Ebay","modelTypeId":2,"modelTypeName":"DESCRIPCION","modelAttributes":[{"idModelAttribute":7,"idModel":2,"idAttributeModelChannel":{"idAttributeModelChannel":6,"channelId":4,"channelName":"Ebay","modelTypeId":2,"modelTypeName":"DESCRIPCION","attributeName":"Titulo","attributeType":"HERMES_FIELD","acceptedValues":null},"attributeValue":"167"},{"idModelAttribute":8,"idModel":2,"idAttributeModelChannel":{"idAttributeModelChannel":7,"channelId":4,"channelName":"Ebay","modelTypeId":2,"modelTypeName":"DESCRIPCION","attributeName":"Descripción","attributeType":"HERMES_FIELD","acceptedValues":null},"attributeValue":"168"}]},{"modelId":3,"modelName":"Modelo de Envío de Prueba","channelId":4,"channelName":"Ebay","modelTypeId":3,"modelTypeName":"ENVIO","modelAttributes":[{"idModelAttribute":11,"idModel":3,"idAttributeModelChannel":{"idAttributeModelChannel":8,"channelId":4,"channelName":"Ebay","modelTypeId":3,"modelTypeName":"ENVIO","attributeName":"Plazo mínimo de entrega","attributeType":"NUMBER","acceptedValues":null},"attributeValue":"1"},{"idModelAttribute":12,"idModel":3,"idAttributeModelChannel":{"idAttributeModelChannel":9,"channelId":4,"channelName":"Ebay","modelTypeId":3,"modelTypeName":"ENVIO","attributeName":"Plazo máximo de entrega","attributeType":"NUMBER","acceptedValues":null},"attributeValue":"3"},{"idModelAttribute":13,"idModel":3,"idAttributeModelChannel":{"idAttributeModelChannel":10,"channelId":4,"channelName":"Ebay","modelTypeId":3,"modelTypeName":"ENVIO","attributeName":"Gastos de envío","attributeType":"NUMBER","acceptedValues":null},"attributeValue":"6.0"}]},{"modelId":4,"modelName":"Modelo de Stock de Prueba","channelId":4,"channelName":"Ebay","modelTypeId":4,"modelTypeName":"STOCK","modelAttributes":[{"idModelAttribute":15,"idModel":4,"idAttributeModelChannel":{"idAttributeModelChannel":11,"channelId":4,"channelName":"Ebay","modelTypeId":4,"modelTypeName":"STOCK","attributeName":"Modo de publicación","attributeType":"LIST_OF_VALOURS","acceptedValues":["Inventario completo","Porcentaje","Fijo"]},"attributeValue":"Porcentaje"},{"idModelAttribute":16,"idModel":4,"idAttributeModelChannel":{"idAttributeModelChannel":12,"channelId":4,"channelName":"Ebay","modelTypeId":4,"modelTypeName":"STOCK","attributeName":"Número de productos a publicar (o porcentaje)","attributeType":"NUMBER","acceptedValues":null},"attributeValue":"80"},{"idModelAttribute":17,"idModel":4,"idAttributeModelChannel":{"idAttributeModelChannel":13,"channelId":4,"channelName":"Ebay","modelTypeId":4,"modelTypeName":"STOCK","attributeName":"Stock de seguridad","attributeType":"NUMBER","acceptedValues":null},"attributeValue":"2"}]},{"modelId":5,"modelName":"Modelo de Stock de Prueba 4","channelId":4,"channelName":"Ebay","modelTypeId":4,"modelTypeName":"STOCK","modelAttributes":[{"idModelAttribute":18,"idModel":5,"idAttributeModelChannel":{"idAttributeModelChannel":15,"channelId":4,"channelName":"Ebay","modelTypeId":4,"modelTypeName":"STOCK","attributeName":"Prueba Hermes Field","attributeType":"HERMES_FIELD","acceptedValues":null},"attributeValue":"Porcentaje"},{"idModelAttribute":19,"idModel":5,"idAttributeModelChannel":{"idAttributeModelChannel":16,"channelId":4,"channelName":"Ebay","modelTypeId":4,"modelTypeName":"STOCK","attributeName":"Prueba Check","attributeType":"BOOLEAN","acceptedValues":null},"attributeValue":"80"},{"idModelAttribute":20,"idModel":5,"idAttributeModelChannel":{"idAttributeModelChannel":17,"channelId":4,"channelName":"Ebay","modelTypeId":4,"modelTypeName":"STOCK","attributeName":"Prueba Date","attributeType":"DATE","acceptedValues":null},"attributeValue":"2"}]}];

// http://localhost:4200/chm/backend/sites/415/channels
export const MOCK_CHANNELS = [{ "channelId": 1, "name": "Rotulo/Web propia" }, { "channelId": 2, "name": "Modalia" }, { "channelId": 4, "name": "Ebay" }, { "channelId": 5, "name": "Privalia" }, { "channelId": 8, "name": "Site Especial" }, { "channelId": 11, "name": "Prestashop" }];

//http://localhost:4200/chm/backend/constants/model-types
export const MOCK_MODEL_TYPES = [{ "idModelType": 1, "name": "PRECIO" }, { "idModelType": 2, "name": "DESCRIPCION" }, { "idModelType": 3, "name": "ENVIO" }, { "idModelType": 4, "name": "STOCK" }];

// http://localhost:4200/chm/backend/constants/attribs-for-model-and-channel?id-channel=4&id-model-type=1
export const MOCK_MODEL_ATTR = [{ "idAttributeModelChannel": 1, "channelId": 4, "channelName": "Ebay", "modelTypeId": 1, "modelTypeName": "PRECIO", "attributeName": "Modificador", "attributeType": "LIST_OF_VALOURS", "acceptedValues": ["Precio preestablecido", "Incrementar Porcentaje", "Incrementar Absoluto", "Reducir Porcentaje", "Reducir Absoluto"] }, { "idAttributeModelChannel": 2, "channelId": 4, "channelName": "Ebay", "modelTypeId": 1, "modelTypeName": "PRECIO", "attributeName": "Modificador (valor)", "attributeType": "NUMBER", "acceptedValues": null }, { "idAttributeModelChannel": 3, "channelId": 4, "channelName": "Ebay", "modelTypeId": 1, "modelTypeName": "PRECIO", "attributeName": "Fecha de Inicio", "attributeType": "DATE", "acceptedValues": null }, { "idAttributeModelChannel": 4, "channelId": 4, "channelName": "Ebay", "modelTypeId": 1, "modelTypeName": "PRECIO", "attributeName": "Fecha de Fin", "attributeType": "DATE", "acceptedValues": null }];

// http://localhost:4200/chm/backend/constants/inventory-fields
export const MOCK_INVENTORY_FIELDS = [{"id":4,"name":"MARCA","values":[],"regEx":null,"tipoAtributoStr":"Marca"},{"id":5,"name":"MODELO","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":7,"name":"TACON","values":[],"regEx":null,"tipoAtributoStr":"TACON"},{"id":8,"name":"CORTE","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":9,"name":"PISO","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":10,"name":"ABROCHE","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":11,"name":"PESO","values":[],"regEx":"((^[1-9]\\d){1,3})+([,][\\d]{3})*([.](\\d)*)?","tipoAtributoStr":"NUMERICO"},{"id":12,"name":"NUEVO","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":13,"name":"RECOMENDACION_MODALIA","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":14,"name":"RECOMENDACION_ESPECIAL","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":15,"name":"MEJOR_RECOMENDADO","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":16,"name":"TOP_VENTAS","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":17,"name":"NUMERO_VALORACIONES","values":[],"regEx":"((^[1-9]\\d){1,3})+([,][\\d]{3})*([.](\\d)*)?","tipoAtributoStr":"NUMERICO"},{"id":18,"name":"VALORACIONES","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":19,"name":"MEDIA_VALORACIONES","values":[],"regEx":"((^[1-9]\\d){1,3})+([,][\\d]{3})*([.](\\d)*)?","tipoAtributoStr":"NUMERICO"},{"id":20,"name":"PROMOCION","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":21,"name":"REBAJAS","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":24,"name":"FUNCION","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":25,"name":"DESCRIPCION","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":26,"name":"DETALLE","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":27,"name":"PAIS_ORIGEN","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":28,"name":"DESTACADO_HOME","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":30,"name":"GENERO","values":[],"regEx":null,"tipoAtributoStr":"Genero"},{"id":31,"name":"TIPO","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":32,"name":"ESTILO","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":33,"name":"NOMBRE_MARCA","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":34,"name":"TEMPORADA","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":35,"name":"ESTACION","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":36,"name":"NICK_NAME","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":37,"name":"PALABRAS_CLAVE","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":40,"name":"NUMERO_FOTOS","values":[],"regEx":"((^[1-9]\\d){1,3})+([,][\\d]{3})*([.](\\d)*)?","tipoAtributoStr":"NUMERICO"},{"id":41,"name":"NOMBRE_SEO","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":42,"name":"DESCRIPCION_SEO","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":43,"name":"PALBRAS_CLAVE_SEO","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":44,"name":"CATEGORIAS","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":49,"name":"OBSERVACIONES2","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":52,"name":"ID_TIPO_TALLAJE","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":166,"name":"COLECCION","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":174,"name":"NUMERO_EMPRESAS","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":175,"name":"OFERTA_ESPECIAL","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":176,"name":"BEST_SELLERS","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":180,"name":"NUMERO_VENTAS","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":181,"name":"TIPO_PRODUCTO_MODALIA","values":[],"regEx":null,"tipoAtributoStr":"Tipo Producto Modalia"},{"id":182,"name":"PUBLICADO_SPARTOO","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":183,"name":"PUBLICADO_PRIVALIA","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":184,"name":"PUBLICADO_EBAY","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":185,"name":"CUIDADOS","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":186,"name":"COMPOSICIONES","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":187,"name":"REFERENCIA_GENERICA_ECI","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":189,"name":"COLOR_PALETA_INT","values":[],"regEx":null,"tipoAtributoStr":"COLOR_PALETA"},{"id":190,"name":"MATERIAL_PALETA_INT","values":[],"regEx":null,"tipoAtributoStr":"MATERIAL_PALETA"},{"id":191,"name":"PRECIO_REBAJADO_INT","values":[],"regEx":"((^[1-9]\\d){1,3})+([,][\\d]{3})*([.](\\d)*)?","tipoAtributoStr":"NUMERICO"},{"id":192,"name":"PRECIO_INT","values":[],"regEx":"((^[1-9]\\d){1,3})+([,][\\d]{3})*([.](\\d)*)?","tipoAtributoStr":"NUMERICO"},{"id":193,"name":"COLOR_INT","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":194,"name":"MATERIAL_INT","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":195,"name":"ID_ARTICULO","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":199,"name":"CODIGO_ALFA","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":200,"name":"ESTACION_INT","values":[],"regEx":null,"tipoAtributoStr":"ESTACION"},{"id":202,"name":"EAN","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":203,"name":"TALLA","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":204,"name":"TIPO_TALLAJE","values":[],"regEx":null,"tipoAtributoStr":"Tipo Tallaje"},{"id":205,"name":"GASTO_ENVIO_ADICIONAL","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":2,"name":"Nombre","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":3,"name":"Descripción1","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":167,"name":"Nombre","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":168,"name":"Descripción","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":169,"name":"Nombre","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":170,"name":"Descripción","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":172,"name":"Nombre","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":173,"name":"Descripción","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":178,"name":"Nombre","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":179,"name":"Descripción","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":188,"name":"GORE-TEX","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":101,"name":"BOLSILLO_PC_10","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":102,"name":"BOLSILLO_PC_13","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":103,"name":"BOLSILLO_PC_14","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":104,"name":"BOLSILLO_PC_15.4","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":105,"name":"PANEL_SOLAR","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":106,"name":"ALARMA","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":107,"name":"LUZ_PANEL_FRONTAL","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":108,"name":"BOLSILLO_AUDIO","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":109,"name":"CONEXION_AUDIO","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":110,"name":"HIDRO_PACK","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":111,"name":"PORTA_GAFAS","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":112,"name":"LUCES_DIRECCIONALES","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":113,"name":"RUEDAS","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":114,"name":"RUEDAS_360","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":115,"name":"FACTURABLE","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":116,"name":"CABINA","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":117,"name":"MOCHILA_2_EN_1","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":118,"name":"EXPANDIBLE","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":119,"name":"CORREAS_AJUSTABLES","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":120,"name":"CORREAS_ERGONOMICAS","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":121,"name":"ESPALDA_ERGONOMICA","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":122,"name":"ESPALDA_TERMOFORMADA","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":123,"name":"CORREAS_PECHO","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":124,"name":"CORREA_LUMBAR","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":125,"name":"CORREAS_COMPRESION","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":126,"name":"AIR_FLOW","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":127,"name":"EXTRA_LIGERO","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":128,"name":"BOLSILLO_MULTIUSOS_EXTRAIBLE","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":129,"name":"BOLSILLO_SUAVE","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":130,"name":"CREMALLERA_IMPERMEABLE","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":131,"name":"PORTAMOSQUETON","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":132,"name":"ORGANIZADOR_LLAVERO_RETRACTIL","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":133,"name":"ORGANIZADOR_LLAVERO_EXTRAIBLE","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":134,"name":"BOLSILLO_PORTABOTELLA","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":135,"name":"BOLSO_REVERSIBLE_2_EN_1","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":136,"name":"CUIDADO_ESPECIAL","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":137,"name":"REFLECTANTE","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":138,"name":"REVERSIBLE_DOBLE_FRONTAL","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":139,"name":"BLOQUEO_CREMALLERA","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":140,"name":"MOCHILA_SEGURA","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":141,"name":"BOLSILLO_SECRETO","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":142,"name":"IMPERMEABLE","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":143,"name":"MULTIUSO_EXTRAIBLE","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":144,"name":"CORREAS_EXTRAIBLES","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":145,"name":"ALTAVOCES","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":146,"name":"CAMBIA_DE_COLOR_CON_EL_AGUA","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":147,"name":"NO_USAR_CON_BEBIDAS_CALIENTES","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":148,"name":"MANTIENE_POR_MAS_TIEMPO_LA_TEMPERATURA","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":149,"name":"SOPORTA_TEMPERATURAS_HASTA_LOS_30C","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":150,"name":"ESPEJO","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":151,"name":"PARAGUAS_AUTOMATICO","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":152,"name":"BOTELLA_PARA_FRIO_Y_CALOR2","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":153,"name":"ESTUCHE_IPAD","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":154,"name":"COJIN_ALMOHADA","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":155,"name":"CADENA_CON_MOSQUETON","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":156,"name":"BOLSILLO_PORTAMOVIL","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":157,"name":"TERMICO","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":158,"name":"GAFAS_POLICROMATICAS","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":159,"name":"DISTRIBUCION_PESO","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":160,"name":"ANTIDESLIZANTE","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":161,"name":"TERMO","values":[{"id":0,"name":"NO"},{"id":1,"name":"SI"}],"regEx":null,"tipoAtributoStr":"SI / NO"},{"id":162,"name":"DIMENSIONES","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":163,"name":"DIMENSIONES2","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":164,"name":"UTILIDADES","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":165,"name":"CAPACIDAD","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"},{"id":177,"name":"NOMBRER_TRADUCIDO","values":[],"regEx":"^(?!\\s*$).+","tipoAtributoStr":"TEXTO"}];