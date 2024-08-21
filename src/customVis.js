
import * as React from "react";
import * as ReactDOM from "react-dom";
import { CustomTable } from "./CustomTable";


looker.plugins.visualizations.add({
  create: function (element, config) {

  },

  updateAsync: function (data, element, config, queryResponse, details, done) {

  const { dimension_like: dimensionLike } = queryResponse.fields;

  const dimensions = dimensionLike.map((dimension) => ({
     label: dimension.label_short ?? dimension.label,
     name: dimension.name


   }));

   const { measure_like: measureLike } = queryResponse.fields;


   const measures = measureLike.map((measure) => ({
     label: measure.label_short ?? measure.label,
     name: measure.name,
   }));



   const fieldOptions = [...dimensions, ...measures].map((dim) => ({
       [dim.label]: queryResponse.data.map(row => row[dim.name].value).join(",")
     }));

    const options = {

  tableBordered: {
   type: "boolean",
   label: "Hide Header",
   default: false,
   order: 1,
 },
 fixedHeight: {
  type: "boolean",
  label: "Table Fixed Height",
  default: false,
  order: 2,
},

hidePag: {
 type: "boolean",
 label: "Hide Pagination",
 default: false,
 order: 3,
},
unsetTable: {
 type: "boolean",
 label: "Table Column Width Unset or Fixed",
 default: true,
 order: 4,
},

removeBars: {
 type: "boolean",
 label: "Center Small Table",
 default: false,
 order: 5,
},

index: {
 type: "boolean",
 label: "Show Row Index",
 default: false,
 order: 6,
},


  bodyStyle: {
      type: "string",
      label: "Choose Font",
      display: "select",
      values: [{ "Roboto": "'Roboto'" } , { "Open Sans": "'Open Sans'" }, {"Montserrat" : "'Montserrat'"}],

      default: "'Roboto', sans-serif;",
      order: 7,
    },



};

 this.trigger("registerOptions", options);

    ReactDOM.render(

      <CustomTable
        data={data}
        config={config}
        queryResponse={queryResponse}
        details={details}
        done={done}
      />

      ,

      element
    );

  done()
  },
});
