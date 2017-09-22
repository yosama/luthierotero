import UIManager from './UIManager';

export default class InstrumentsListManager extends UIManager {

    constructor(elementSelector, instrumentsService) {
        super(elementSelector); // llamada al constructor de la clase UIManager
        this.instrumentsService = instrumentsService;
    }

    init() {
        this.loadInstruments();
    }

    loadInstruments() {
        this.instrumentsService.list(instruments => {
           
            // Comprobamos si hay canciones
            if (instruments.length == 0) {
                // Mostramos el estado vacío
                this.setEmpty();
            } else {
                // Componemos el HTML con todas las canciones
                this.renderInstruments(instruments);

                // Quitamos el mensaje de cargando y mostramos la lista de canciones
                this.setIdeal();
            }
        }, error => {
            // Mostrar el estado de error
            this.setError();
            // Hacemos log del error en la consola
            console.error("Error loading instruments", error);
        });
    }

    renderInstruments(instruments) {
        let html = "";
        for (let instrument of instruments) {
            html += this.renderInstrument(instrument);
        }
        // Metemos el HTML en el div que contiene las canciones
        this.setIdealHtml(html);
    }

    renderInstrument(instrument) {
        let img_url = instrument.img_url; 
        let srcset = "";
        if (img_url == "") {
            img_url = "img/instrument-150px.png";
            srcset =' srcset="'+img_url+'-150px.png 150w,'+img_url+'-250px.png 250w,'+img_url+'-300px.png 300w"';
        } else {
            srcset =' srcset="'+img_url+'-150px.png 150w,'+img_url+'-250px.png 250w,'+img_url+'-300px.png 300w"'
        }

        if (typeof instrument.price == "number"){
            instrument["price"] = instrument.price.toFixed(2)+"€"
        } 
        
        return  `<div class="instrument">
                    <div class="row">
                        <div class="col-md-5">
                            <a href="/instruments/${instrument.id}">
                                <img class="img-responsive" src="${img_url}" alt="${instrument.category} - ${instrument.model}"${srcset}>
                            </a>
                        </div>
                        <div class="col-md-7">
                            <h3><a href="/instruments/${instrument.id}">${instrument.description}</a></h3>
                            by <span class="instrument-author"> ${instrument.author}<span>
                            <h4> Model:<span> ${instrument.model}</span></h4> 
                            <h4>Year: ${instrument.year}</h4>
                            <h4>State:</<h4> <span>${instrument.state}</span>
                            <h3>Price: ${instrument.price}</h3>
                            <p> 
                                <span class="glyphicon glyphicon-star"></span>
                                <span class="glyphicon glyphicon-star"></span>
                                <span class="glyphicon glyphicon-star"></span>
                                <span class="glyphicon glyphicon-star-empty"></span>
                                <span class="glyphicon glyphicon-star-empty"></span>
                            </p>
                        </div>
                    </div>
                </div>
                <hr>`;
    }

    deleteInstrument(instrumentId) {
        this.setLoading();
        this.instrumentsService.delete(instrumentId, success => {
            this.loadInstruments();
        }, error => {
            this.setError();
        })
    }

}