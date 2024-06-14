/*
File: script.js 
GUI Assignment: Dynamic Multiplication Table 
Nicole Ramirez, UMass Lowell Computer Science, nicole_ramirez@student.uml.edu 
Copyright (c) 2024 by Nicole Ramirez. All rights reserved. May be freely copied or 
excerpted for educational purposes with credit to the author. 
*/

$(document).ready(function () {
    // Validate the form inputs using jQuery Validation plugin
    $("#tableForm").validate({
        rules: {
            startMultiplier: {
                required: true,
                number: true,
                min: -100,
                max: 100
            },
            endMultiplier: {
                required: true,
                number: true,
                min: -100,
                max: 100
            },
            startMultiplicand: {
                required: true,
                number: true,
                min: -100,
                max: 100
            },
            endMultiplicand: {
                required: true,
                number: true,
                min: -100,
                max: 100
            }
        },
        messages: {
            startMultiplier: {
                required: "Please enter a start multiplier.",
                number: "Please enter a valid number.",
                min: "Multiplier must be at least -100.",
                max: "Multiplier must be at most 100."
            },
            endMultiplier: {
                required: "Please enter an end multiplier.",
                number: "Please enter a valid number.",
                min: "Multiplier must be at least -100.",
                max: "Multiplier must be at most 100."
            },
            startMultiplicand: {
                required: "Please enter a start multiplicand.",
                number: "Please enter a valid number.",
                min: "Multiplicand must be at least -100.",
                max: "Multiplicand must be at most 100."
            },
            endMultiplicand: {
                required: "Please enter an end multiplicand.",
                number: "Please enter a valid number.",
                min: "Multiplicand must be at least -100.",
                max: "Multiplicand must be at most 100."
            }
        },
         // Place error messages after the corresponding input element
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
        // Handle form submission
        submitHandler: function (form) {
            generateTable();
            return false; // Prevent form submission
        }
    });
// Function to generate the multiplication table
    function generateTable() {
        let startMultiplier = parseInt($("#startMultiplier").val());
        let endMultiplier = parseInt($("#endMultiplier").val());
        let startMultiplicand = parseInt($("#startMultiplicand").val());
        let endMultiplicand = parseInt($("#endMultiplicand").val());
 // Validate that start values are less than or equal to end values
        if (startMultiplier > endMultiplier || startMultiplicand > endMultiplicand) {
            $("#errorMessage").text("Start values must be less than or equal to end values.");
            return;
        }
// Clear any previous error messages
        $("#errorMessage").text("");
// Create a unique ID and title for the new table
        let tableId = `table-${startMultiplier}-${endMultiplier}-${startMultiplicand}-${endMultiplicand}`;
        let tabTitle = `Columns: [${startMultiplier}, ${endMultiplier}], Rows: [${startMultiplicand}, ${endMultiplicand}]`;
// Check if a table with this ID already exists
        if ($(`#${tableId}`).length === 0) {
            let table = "<div class='table-wrapper'><table border='1'><tr><th></th>";
            for (let i = startMultiplicand; i <= endMultiplicand; i++) {
                table += "<th>" + i + "</th>";
            }
            table += "</tr>";

            for (let i = startMultiplier; i <= endMultiplier; i++) {
                table += "<tr><th>" + i + "</th>";
                for (let j = startMultiplicand; j <= endMultiplicand; j++) {
                    table += `<td class="${i % 2 === 0 ? 'even' : 'odd'}">${i * j}</td>`;
                }
                table += "</tr>";
            }
            table += "</table></div>";

            let tabContent = `<div id="${tableId}">${table}</div>`;

            $("#tabs").find(".ui-tabs-nav").append(`<li><a href="#${tableId}">${tabTitle}</a> <span class="ui-icon ui-icon-close" role="presentation">Remove Tab</span></li>`);
            $("#tabs").append(tabContent);
            $("#tabs").tabs("refresh");
        } else {
            $("#tabs").tabs("option", "active", $(`#${tableId}`).index() - 1);
        }
    }
// Function to setup the sliders for input elements
    function setupSlider(inputId, sliderId) {
        $("#" + sliderId).slider({
            min: -100,
            max: 100,
            slide: function (event, ui) {
                $("#" + inputId).val(ui.value);
                $("#" + inputId).trigger("change");
            }
        });
// Sync the slider with the input element
        $("#" + inputId).on("input change", function () {
            $("#" + sliderId).slider("value", this.value);
        });
    }
  // Setup sliders for each input element
    setupSlider("startMultiplier", "startMultiplierSlider");
    setupSlider("endMultiplier", "endMultiplierSlider");
    setupSlider("startMultiplicand", "startMultiplicandSlider");
    setupSlider("endMultiplicand", "endMultiplicandSlider");

    // Initialize jQuery UI tabs
    $("#tabs").tabs();
// Handle the close icon click event to remove tabs
    $("#tabs").on("click", "span.ui-icon-close", function () {
        var panelId = $(this).closest("li").remove().attr("aria-controls");
        $("#" + panelId).remove();
        $("#tabs").tabs("refresh");
    });
 // Handle the remove selected tabs button click event
    $("#removeSelectedTabs").on("click", function () {
        var selectedTabs = $("#tabs .ui-tabs-nav li.ui-tabs-active");
        selectedTabs.each(function () {
            var panelId = $(this).remove().attr("aria-controls");
            $("#" + panelId).remove();
        });
        $("#tabs").tabs("refresh");
    });
});
