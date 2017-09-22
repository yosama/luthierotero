const $ = require("jquery");

export default class InstrumentsService {

    constructor(url) {
        this.url = url;
    }

    // Obtener listado de canciones
    list(successCallback, errorCallback) {
        $.ajax({
            url: this.url,
            success: successCallback,
            error: errorCallback
        });
    }

    // Crear o actualizar canción
    save(instrument, successCallback, errorCallback) {
        if (instrument.id) {
            this.update(instrument, successCallback, errorCallback);
        } else {
            this.create(instrument, successCallback, errorCallback);
        }
    }

    // Crear una cancion
    create(instrument, successCallback, errorCallback) {
        $.ajax({
            url: this.url,
            method: "post",
            data: instrument,
            success: successCallback,
            error: errorCallback
        })
    }

    // Obtener el detalle de canción
    getDetail(instrumentId, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${instrumentId}`,
            success: successCallback,
            error: errorCallback
        })
    }

    // Actualizar una canción
    update(instrument, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${instrument.id}`,
            method: "put",
            data: instrument,
            success: successCallback,
            error: errorCallback
        })
    }

    // Borrar una canción (songsService.delete(4, response => {}, error => {}))
    delete(instrumentId, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${instrumentId}`,
            method: 'delete', // método HTTP a utilizar
            success: successCallback,
            error: errorCallback
        })
    }
}