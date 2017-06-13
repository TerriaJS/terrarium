const getFromCatalogPath = require('../getFromCatalogPath');

const nm = require('nationalmap-catalog/build/nm.json');
const aremi = require('aremi/wwwroot/init/aremi.json');
const na = require('northernaustralia/wwwroot/init/nainvest.json');

module.exports = {
  "corsDomains": nm.corsDomains.concat(aremi.corsDomains),
  "homeCamera": {
    "west": 112,
    "south": -48,
    "east": 155,
    "north": -5
  },
  "services": [],
  "catalog": [
    {
      "name": "Featured Datasets",
      "type": "group",
      "preserveOrder": true,
      "isOpen": true,
      "items": [
        {
          "name": "ABC News Stories",
          "type": "group",
          "preserveOrder": true,
          "items": [
            getFromCatalogPath(nm, ['National Datasets', 'Communications', 'ABC Photo Stories (2009-2014)']),
            getFromCatalogPath(nm, ['National Datasets', 'Communications', 'ABC Photo Stories by date'])
          ]
        },
        getFromCatalogPath(aremi, ['Electricity Infrastructure', 'Generation', 'Current Power Generation - NEM']),
        {
          "name": "3D Demos",
          "type": "group",
          "items": [
            {
              "name": "Smooth Geelong Buildings GLTF Mini Demo",
              "type": "czml",
              "url": "/test/3d/geelong/smooth.czml",
              "rectangle": [ 144.354, -38.147,
                             144.358, -38.150]
            },
            {
              "name": "Terrain Geelong Buildings GLTF Mini Demo",
              "type": "czml",
              "url": "/test/3d/geelong/terrain.czml",
              "rectangle": [ 144.354, -38.147,
                             144.358, -38.150]
            }
          ]
        },
        {
          "name": "Bird migration paths",
          "description": "Geographic centers of occurrence estimated daily for 118 migratory bird species using eBird occurrence information for the combined period 2002 to 2014. Additional details on the data and methods can be found here:\nLa Sorte, F.A., Fink, D., Hochachka, W.M. & Kelling, S. (2016) Convergence of broad-scale migration strategies in terrestrial birds. Proceedings of the Royal Society of London B: Biological Sciences, 283, 20152588.",
          "type": "czml",
          "url": "test/all_birds.czml",
          "ignoreUnknownTileErrors": true,
          "zoomOnEnable": true,
          "rectangle": [
            -160,
            -20,
            -30,
            60
          ]
        },
        getFromCatalogPath(nm, ['National Datasets', 'Communications', 'Broadband ADSL Quality']),
        getFromCatalogPath(nm, ['National Datasets', 'Land', 'Agriculture and Mining', 'Catchment Scale Land Use 2016']),
        getFromCatalogPath(nm, ['National Datasets', 'Land', 'Surface Geology']),
        Object.assign({}, getFromCatalogPath(nm, ['National Datasets', 'Surface Water', 'Water Observations from Space', '3 - Summary']), {
          name: 'Water Observations from Space - Summary'
        }),
        {
            "description": "Chlorophyll-a, reflecting wavelengths in the green part of the visible light spectrum, is the substance that helps plants capture the sun\u2019s energy. In the water, it indicates the presence of microscopic green algae (phytoplankton). While these plants are a natural part of the reef ecosystem, elevated numbers (a bloom) of phytoplankton signal elevated nutrient levels, especially nitrogen, in the water. Typical sources are runoff from excess fertiliser being applied to crops and, to a lesser extent in the Great Barrier Reef region, sewage contamination from urban areas.",
            "layers": "Chl_MIM_mean",
            "name": "Chlorophyll-a concentration (annual)",
            "parameters": {
                "ABOVEMAXCOLOR": "0xAF324B",
                "BELOWMINCOLOR": "transparent",
                "COLORSCALERANGE": "0,1",
                "FORMAT": "image/png",
                "LAYERS": "Chl_MIM_median",
                "LOGSCALE": "false",
                "NUMCOLORBANDS": "16",
                "PALETTE": "mwq_chl",
                "STYLES": "boxfill/mwq_chl",
                "TRANSPARENT": "true",
                "VERSION": "1.1.1"
            },
            "type": "wms",
            "url": "http://ereeftds.bom.gov.au/ereefs/tds/wms/ereefs/mwq_gridAgg_P1A"
        },
        {
            "name": "BAMS C4ISR",
            "type": "czml",
            "description": "Cesium example CZML showing a mission planning exercise involving optimizing the flight path for a reconnaissance UAV over the Persian Gulf.",
            "url": "http://cesiumjs.org/Gallery/BAMS_C4ISR.czml",
            "rectangle": [
              46.5,
              26.2,
              53.7,
              30.4
            ],
            "zoomOnEnable": true
        },
        getFromCatalogPath(nm, ['National Datasets', 'Social and Economic', 'Census', 'Person', 'Background', 'Country of Birth', 'by Sex', '2011 Census', 'Country of Birth']),
      ]
    },
    {
      "name": "All Datasets",
      "type": "group",
      "preserveOrder": true,
      "items": [
        {
          "name": "National Map",
          "type": "group",
          "preserveOrder": true,
          "items": nm.catalog
        },
        {
          "name": "AREMI",
          "type": "group",
          "preserveOrder": true,
          "items": aremi.catalog
        },
        {
          "name": "Northern Australia",
          "type": "group",
          "preserveOrder": true,
          "items": na.catalog
        } /*,
        {
          "name": "NEII Viewer",
          "type": "group",
          "preserveOrder": true,
          "items": [
            <% include neii %>,
          ]
        },
        {
          "name": "Global Risk Map",
          "type": "group",
          "preserveOrder": true,
          "items": [
            <% include global_risk_map %>,
          ],
          "corsDomains": [
            "programs.communications.gov.au",
            "mapsengine.google.com"
          ]
        }*/
      ]
    }
  ]
};
