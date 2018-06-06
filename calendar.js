var CALENDAR_NS = {};

CALENDAR_NS.Calendar = function(start_date, days, country_code) {
    "use strict";

    /** constants **/
    const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    /** properties **/
    var c_start_date = null;
    var c_current_date = null;
    var c_days = null;
    var c_country_code = null;

    /** setters & getters **/
    this.setStartDate = function(start_date) {
        c_start_date = new Date(start_date);
        c_start_date.setMinutes(c_start_date.getTimezoneOffset());
        this.setCurrentDate();
    };

    this.getStartDate = function() {
        return c_start_date;
    };

    this.setCurrentDate = function() {
        c_current_date = new Date(c_start_date.getTime());
    };

    this.getCurrentDate = function() {
        return c_current_date;
    };

    this.setDaysToRender = function(days) {
        c_days = days * 1;
    };

    this.getDaysToRender = function() {
        return c_days;
    };

    this.setCountryCode = function(country_code) {
        c_country_code = country_code;
    };

    this.getCountryCode = function() {
        return c_country_code;
    };

    /** set-up **/
    this.setStartDate(start_date);
    this.setDaysToRender(days);
    this.setCountryCode(country_code);
};

$(document).ready(function() {
    $("#fr_calendar").on("submit", function(event) {
        event.preventDefault();
    });

    $("#bt_submit").click(function(event) {
        var new_calendar = new CALENDAR_NS.Calendar($("#dt_start_date").val(), $("#tf_days").val(), $("#tf_country_code").val());
        console.log(new_calendar.getStartDate());
        console.log(new_calendar.getCurrentDate());
        console.log(new_calendar.getDaysToRender());
        console.log(new_calendar.getCountryCode());
    });
});