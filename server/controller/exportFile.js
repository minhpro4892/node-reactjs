
var Excel = require('exceljs');
var Promise = require('bluebird');
var _ = require('lodash');
var mongoose = require('mongoose');
var tempfile = require('tempfile');
var moment = require('moment');
var fs = require('fs');

module.exports = function exportToCSV(params, tracer) {
    return new Promise(function (resolved, reject) {
        try {
            var tempFilePath = params.path || tempfile('.xlsx');
            var options = {
                filename: tempFilePath,
                useStyles: true,
                useSharedStrings: true
            };
            var workbook = new Excel.stream.xlsx.WorkbookWriter(options);
            workbook.creator = 'Me';
            workbook.lastModifiedBy = 'Me';
            workbook.created = new Date();
            workbook.modified = new Date();
            workbook.views = [
                {
                    x: 0, y: 0, width: 10000, height: 20000,
                    firstSheet: 0, activeTab: 1, visibility: 'visible'
                }
            ];
            workbook.addWorksheet(params.sheetName || 'Articles', { properties: { tabColor: { argb: 'FFC0000' } } });
            var worksheet = workbook.getWorksheet(params.sheetName || 'Articles');
            worksheet.columns = params.columns;
            var stream = mongoose.model(params.model || 'Article').find(params.query || {}, params.select || {}).sort(params.sort || {}).stream();
            var i = 1;
            var headerRow = worksheet.getRow(1)
            worksheet.columns.forEach(function (column, index) {
                headerRow.getCell(index + 1).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'a7a4a3' }
                };
            })
            headerRow.height = 30;
            headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
            headerRow.font = { bold: true, size: 12, color: { argb: 'ffffff' } };

            console.log('start write stream: %s %s', new Date().toISOString(), tracer);
            stream.on('data', function (doc) {
                try {
                    var row = worksheet.getRow(++i);
                    parseValue[params.module](doc, row, i, params.options);
                    row.commit();
                } catch (error) {
                    reject(error);
                }
            });
            stream.on('end', function () {
                // all done
                workbook.commit()
                    .then(function () {
                        console.log('end write stream: %s %s', new Date().toISOString(), tracer);
                        // the stream has been written
                        resolved(tempFilePath);
                    });
            })
        } catch (ex) {
            reject(ex);
        }
    })
}

var parseValue = {
    article: function (doc, row, i, options) {
        var alignment = {
            vertical: 'middle',
            horizontal: 'center'
        };

        var background = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: i % 2 ? 'e3e3e3' : 'ffffff' }
        };
        row.alignment = { vertical: 'middle' };
        _.range(2).forEach(function (index) {
            row.getCell(index + 1).fill = background;
        })

        row.getCell(1).value = doc.fullName;
        row.getCell(2).value = doc.phone;
    }
}