var CALENDAR_NS = {};

CALENDAR_NS.Calendar = function(start_date, days, country_code) {
    "use strict";

    /** constants **/
    const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

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

    this.getCurrentDateMilliseconds = function() {
        return c_current_date.getTime() * 1;
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

    this.getCurrentMonthWeekday = function() {
        return c_current_date.getDay();
    };

    this.getCurrentMonthDate = function() {
        return c_current_date.getDate();
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
    this.createDateElement = function(parent_id, classes, content) {
        $("#" + parent_id).append("<div class='col " + classes + "'>" + content + "</div>");
    };

    this.addNewMonth = function() {
        $("#dv_container_calendar").append("<div id='dv_container_month_" + this.getCurrentMonthID() + "'></div>");
        $("#dv_container_month_" + this.getCurrentMonthID()).addClass("container-fluid month-container");

        $("#dv_container_month_" + this.getCurrentMonthID()).append("<div id='dv_weekdays_" + this.getCurrentMonthID() + "'></div>");
        $("#dv_weekdays_" + this.getCurrentMonthID()).addClass("row justify-content-center month-weekdays");

        for(var i = 0; i < 7; i++)
            this.createDateElement("dv_weekdays_" + this.getCurrentMonthID(), "", WEEKDAYS[i]);

        $("#dv_container_month_" + this.getCurrentMonthID()).append("<div id='dv_month_" + this.getCurrentMonthID() + "'><div>" + this.getCurrentMonthText() + "</div></div>");
        $("#dv_month_" + this.getCurrentMonthID()).addClass("row justify-content-center month-text");
    };

    this.createWeek = function(week) {
        $("#dv_container_month_" + this.getCurrentMonthID()).append("<div id='dv_week_" + week + this.getCurrentMonthID() + "'></div>");
        $("#dv_week_" + week + this.getCurrentMonthID()).addClass("row justify-content-center");
        return "dv_week_" + week + this.getCurrentMonthID();
    };

    this.renderOffsetDaysLeft = function(week_id) {
        for(var i = 0; i < this.getCurrentMonthWeekday(); i++)
            this.createDateElement(week_id, "invalid-days", "&nbsp;");
    };

    this.renderOffsetDaysRight = function(week_id) {
        for(var i = this.getCurrentMonthWeekday(); i > 0 && i < 7; i++)
            this.createDateElement(week_id, "invalid-days", "&nbsp;");
    };

    this.addNewDay = function() {
        this.setCurrentDate(this.getCurrentDateMilliseconds() + MILLISECONDS_PER_DAY);
    };

    this.render = function() {
        var week = 1;
        var week_id = null;
        var style_date = null;

        this.addNewMonth();
        week_id = this.createWeek(week);
        this.renderOffsetDaysLeft(week_id);

        for(var i = 0; i < this.getDaysToRender(); i++) {
            if (this.getCurrentMonthWeekday() == 0 && i > 0) {
                week++;
                week_id = this.createWeek(week);
            }

            style_date = this.getCurrentMonthWeekday() == 0 || this.getCurrentMonthWeekday() == 6 ? "weekend" : "weekdays";
            this.createDateElement(week_id, style_date, this.getCurrentMonthDate());
            this.addNewDay();

            if (this.getCurrentMonthDate() == 1) {
                this.renderOffsetDaysRight(week_id);
                this.addNewMonth();
                week++;
                week_id = this.createWeek(week);
                this.renderOffsetDaysLeft(week_id);
            }
        }
        this.renderOffsetDaysRight(week_id);
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
        $("#dv_container_calendar").html("");
        var new_calendar = new CALENDAR_NS.Calendar($("#dt_start_date").val(), $("#tf_days").val(), $("#tf_country_code").val());
        new_calendar.render();
        $("#dv_container_calendar").show();
    });

    $("#bt_reset").click(function(event) {
        $("#dv_container_calendar").hide();
        $("#dv_container_calendar").html("");
    });
});