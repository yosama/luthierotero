window.$ = window.jQuery = require("jquery");

import InstrumentsService from "./InstrumentsService";

const instrumentsService = new InstrumentsService("/instruments/");


instrumentsService.list(instruments => {
    console.log(instruments);
}, error => {
    console.log(error);
});
