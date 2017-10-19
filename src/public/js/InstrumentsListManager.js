import UIManager from './UIManager';
var moment = require('moment');

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
            if (instruments.length == 0) {
                this.setEmpty();
            } else {
                this.renderInstruments(instruments);
                this.setIdeal();
            }
        }, error => {
            this.setError();
            console.error("Error loading instruments", error);
        });
    }

    renderInstruments(instruments) {
        let html = "";
        for (let instrument of instruments) {
            html += this.renderInstrument(instrument);
        }
        this.setIdealHtml(html);
    }

    renderInstrument(instrument) {
        let img_url = instrument.img_url; 
        let srcset = "";
        if (img_url == "") {
            img_url = "img/instruments/instrument-150px.png";
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
                            <a href="instrument-detail.html">
                                <img class="img-responsive" src="${img_url}" alt="${instrument.category} - ${instrument.model}"${srcset}>
                            </a>
                        </div>
                        <div class="col-md-7">
                            <h3><a href="instrument-detail.html">${instrument.description}</a></h3>
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
                            <span> Published: ${this.getTimeAgo(instrument.publication_date)}</span>
                        </div>
                    </div>
                </div>
                <hr>`
    }

    deleteInstrument(instrumentId) {
        this.setLoading();
        this.instrumentsService.delete(instrumentId, success => {
            this.loadInstruments();
        }, error => {
            this.setError();
        })
    }

    getTimeAgo(date) {
        var momentDate = moment(date);
        var timeAgo = "";
        var diffDate = Math.abs(momentDate.diff(new Date(),"ms"))
        var timeInMilisecond = {
            second: 1000,
            minute: 60 * 1000,
            hour: 60 * 60 * 1000,
            day:  24 * 60 * 60 * 1000,
            week: 24 * 60 * 60 * 1000 * 7
        }

        if (diffDate < timeInMilisecond.minute){
            timeAgo = momentDate.diff(new Date(),"second")
        } else if ((diffDate > timeInMilisecond.minute && diffDate < timeInMilisecond.hour) || (diffDate > timeInMilisecond.hour && diffDate < timeInMilisecond.day)){
            timeAgo = momentDate.fromNow()
        } else if (diffDate > timeInMilisecond.day && diffDate < timeInMilisecond.week){
            timeAgo = "last "+  momentDate.format("dddd")
        } else {
            timeAgo = momentDate.format("DD/MM/YYYY hh:mm:ss")
        }
        return timeAgo; 
    }
}