// Se consume directamente de servicio, insertar datos de prueba si se requiere
export const MOCK_PUBLICATION_RESULTS = [
  {
    "_id" : "5a71af25cd5bfd11dc2624a4",
    "idResultadoPublicacion" : "5a71af25cd5bfd11dc2624a4",
    "idPublicacion" : 1,
    "publicationName" : "Nombre publicación 1",
    "products" : [],
    "countProducts" : 2,
    "initDate" : "2018-01-31T11:57:25.693Z",
    "ok" : true,
    "error" : ""
  },
  {
    "_id" : "5a71af25cd5bfd11dc2624a5",
    "idResultadoPublicacion" : "5a71af25cd5bfd11dc2624a5",
    "idPublicacion" : 1,
    "publicationName" : "Nombre publicación 2",
    "products" : [],
    "countProducts" : 1,
    "initDate" : "2018-01-31T11:57:25.693Z",
    "ok" : true,
    "error" : ""
  }
]

export const MOCK_PUBLICATION_RESULTS_PRODUCTS = [
  {
    "idResultadoPublicacion": "5a71af25cd5bfd11dc2624a4",
    "idItemChannel": "162755930557",
    "idProducto": 538551,
    "price": "100.0",
    "skuHermesChannel": "",
    "variants": {
      "ean": "",
      "size": "SIN DEFINIR",
      "skuHermesChannel": "0ES6436562",
      "stock": "1"
    },
    "ok": true,
    "error": "Los valores existentes de precio y cantidad son idénticos a los indicados en la solicitud y, por tanto, no se han modificado.<br/>"
  },
  {
    "idResultadoPublicacion": "5a71af25cd5bfd11dc2624a4",
    "idItemChannel": "162755930648",
    "idProducto": 538474,
    "price": "328.0",
    "skuHermesChannel": "",
    "variants": {
      "ean": "",
      "size": "SIN DEFINIR",
      "skuHermesChannel": "0ES6436659",
      "stock": "1"
    },
    "ok": true,
    "error": "Los valores existentes de precio y cantidad son idénticos a los indicados en la solicitud y, por tanto, no se han modificado.<br/>"
  },
  {
    "idResultadoPublicacion": "5a71af25cd5bfd11dc2624a5",
    "idItemChannel": "162755930557",
    "idProducto": 538551,
    "price": "100.0",
    "skuHermesChannel": "",
    "variants": {
      "ean": "",
      "size": "SIN DEFINIR",
      "skuHermesChannel": "0ES6436562",
      "stock": "1"
    },
    "ok": true,
    "error": "Los valores existentes de precio y cantidad son idénticos a los indicados en la solicitud y, por tanto, no se han modificado.<br/>"
  }
]
