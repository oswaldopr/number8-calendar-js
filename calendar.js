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
    var c_month_id = null;

    /** setters & getters **/
    this.setStartDate = function(start_date) {
        c_start_date = new Date(start_date);
        c_start_date.setMinutes(c_start_date.getTimezoneOffset());
        this.setCurrentDate(c_start_date.getTime());
    };

    this.getStartDate = function() {
        return c_start_date;
    };

    this.setCurrentDate = function(current_date) {
        c_current_date = new Date(current_date);
        this.setCurrentMonthID();
    };

    this.getCurrentDate = function() {
        return c_current_date;
    };

    this.setCurrentMonthID = function() {
        c_month_id = c_current_date.getFullYear().toString() + c_current_date.getMonth().toString();
    };

    this.getCurrentMonthID = function() {
        return c_month_id;
    };

    this.getCurrentMonthText = function() {
        return MONTHS[c_current_date.getMonth()] + " " + c_current_date.getFullYear();
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

    /** methods **/
    this.addNewMonth = function() {
        $("#dv_container_calendar").append("<div id='dv_container_month_" + this.getCurrentMonthID() + "'></div>");
        $("#dv_container_month_" + this.getCurrentMonthID()).addClass("container-fluid");

        $("#dv_container_month_" + this.getCurrentMonthID()).append("<div id='dv_weekdays_" + this.getCurrentMonthID() + "'></div>");
        $("#dv_weekdays_" + this.getCurrentMonthID()).addClass("row justify-content-center");

        for(var i = 0; i < 7; i++)
            $("#dv_weekdays_" + this.getCurrentMonthID()).append("<div class='col'>" + WEEKDAYS[i] + "</div>");

        $("#dv_container_month_" + this.getCurrentMonthID()).append("<div id='dv_month_" + this.getCurrentMonthID() + "'><div>" + this.getCurrentMonthText() + "</div></div>");
        $("#dv_month_" + this.getCurrentMonthID()).addClass("row justify-content-center");
    };

    this.render = function() {
        this.addNewMonth();
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
        new_calendar.render();
    });

    $("#bt_reset").click(function(event) {
        $("#dv_container_calendar").html("");
    });
});