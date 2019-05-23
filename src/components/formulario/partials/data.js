export const Fields = {
    "formulario": {
      "exogenos": [
  
        {
          "title": "Entorno",
          "weight": 45,
          "fields": [{
              "name": "Localización",
              "type": "Calidad",
              "value": "localizacion"
            },
            {
              "name": "Servicios",
              "type": "Calidad",
              "value": "servicios" 
            },
            {
              "name": "Equipamiento",
              "type": "Calidad",
              "value": "equipamiento"
            },
            {
              "name": "Accesibilidad",
              "type": "Calidad",
              "value": "accesibilidad"

            },
            {
              "name": "Conectividad",
              "type": "Calidad",
              "value": "conectividad"
            }
          ]
        },
        {
          "title": "Consolidación",
          "weight": 25,
          "fields": [{
            "name": "Barrio",
            "type": "Consolidación",
            "value": "barrio"
          },
          {
            "name": "PRC",
            "type": "Consolidación",
            "value": "prc"
          },
          {
            "name": "Usos",
            "type": "Consolidación",
            "value": "usos"
          }]
        },
        {
          "title": "Proximidad",
          "weight": 30,
          "fields": [{
            "name": "Metro",
            "type": "Proximidad",
            "value": "metro"
          },
          {
            "name": "Supermercado",
            "type": "Proximidad",
            "value": "supermercado"
          }, 
          {
            "name": "Colegios",
            "type": "Proximidad",
            "value": "colegios"
          },
          {
            "name": "Farmacia",
            "type": "Proximidad",
            "value": "farmacias"
          },
          {
            "name": "Comercio menor",
            "type": "Proximidad",
            "value": "comercio_menor"
          },
          {
            "name": "Centro comercial",
            "type": "Proximidad",
            "value": "centro_comercial"
          },
          {
            "name": "Parque",
            "type": "Proximidad",
            "value": "parque"
          },
          {
            "name": "Plaza",
            "type": "Proximidad",
            "value": "plaza"
          },
          {
            "name": "Ciclovía",
            "type": "Proximidad",
            "value": "ciclovia"
          },
          {
            "name": "Osio",
            "type": "Proximidad",
            "value": "osio"
          },]
        }
  
      ],
      "endogenos": [
  
        {
          "title": "Obra Gruesa",
          "weight": 35,
          "fields": [
            {
              "name": "Tipología",
              "type": "Calidad",
              "value": "obragruesa_tipologia"
            },
            {
              "name": "Calidad",
              "type": "Calidad",
              "value": "obragruesa_calidad"
            },
            {
              "name": "Conservación",
              "type": "Calidad",
              "value": "obragruesa_conservacion"
            },
            {
              "name": "Antigüedad",
              "type": "Calidad",
              "value": "obragruesa_antiguedad"
            },
          ]
        },
        {
          "title": "Terminaciones",
          "weight": 35,
          "fields": [{
            "name": "Calidad",
            "type": "Calidad",
            "value": "terminaciones_calidad"
          },
          {
            "name": "Conservación",
            "type": "Calidad",
            "value": "terminaciones_conservacion"
          },
          {
            "name": "Antigüedad",
            "type": "Calidad",
            "value": "terminaciones_antiguedad"
          }]
        },
        {
          "title": "Instalaciones",
          "weight": 15,
          "fields": [{
            "name": "Calidad",
            "type": "Calidad",
            "value": "instalaciones_calidad"
          },
          {
            "name": "Conservación",
            "type": "Calidad",
            "value": "instalaciones_conservacion"
          },
          {
            "name": "Antigüedad",
            "type": "Calidad",
            "value": "instalaciones_antiguedad"
          }]
        },
  
        {
          "title": "Obras Complementarias",
          "weight": 5,
          "fields": [{
            "name": "Calidad",
            "type": "Calidad",
            "value": "obras_complementarias_calidad"
          },
          {
            "name": "Conservación",
            "type": "Calidad",
            "value": "obras_complementarias_conservacion"
          }]
        },
        {
          "title": "Terciarios",
          "weight": 3,
          "fields": [{
            "name": "Derechos",
            "type": "Calidad",
            "value": "derechos"
          },
          {
            "name": "Vistas",
            "type": "Calidad",
            "value": "vistas"
          },
          {
            "name": "Equipamiento del conjunto",
            "type": "Calidad",
            "value": "equipamiento_del_conjunto"
          }]
        },
        {
          "title": "Orientación",
          "weight": 7,
          "fields": [{
            "name": "Orientación principal",
            "type": "Orientacion",
            "value": "orientacion_principal"
          },
          {
            "name": "Orientación secundaria",
            "type": "Orientacion",
            "value": "orientacion_secundaria"
          }]
        }
  
      ],
    }
  }