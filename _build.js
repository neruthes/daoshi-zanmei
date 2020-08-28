// Copyright (c) 2020 Neruthes <https://neruthes.xyz>.
// Published under GPLv2.

const fs = require('fs');
const child_process = require('child_process');
const exec = child_process.exec;

// -----------------------------------------------------------------------------

const renderReviewsList = function (reviewItem, i) {
    return `<div class="review-item">
        <div class="review-item--index">
            #${i}
        </div>
        <div class="review-item--date-and-author">
            ${reviewItem.date} | ${reviewItem.author}
        </div>
        <div class="review-item--summary">
            ${reviewItem.summary}
        </div>
        <div class="review-item--full-text">
            ${reviewItem.full}
        </div>
    </div>`;
};

var listOfFiles = fs.readdirSync('reviews');

listOfFiles.map(function (fileName) {
    var stdName = fileName.replace('.md', '');
    var rawData = fs.readFileSync(`reviews/${fileName}`).toString().replace(/\r/g, '').trim();
    var midData1 = rawData.split('\n\n------\n\n');
    var midData2 = midData1[0].split('\n');
    var midData3 = midData1[1].split('\n\n');
    var entryDataObj = {
        meta: {},
        list: []
    };
    midData2.map(function (line) {
        var key = line.split(': ')[0];
        var val = line.split(': ')[1];
        entryDataObj.meta[key] = val;
    })
    midData3.map(function (record, i) {
        var lines = record.split('\n');
        entryDataObj.list[i] = {
            date: lines[0].slice(3),
            author: lines[1].slice(3),
            summary: lines[2].slice(3),
            full: lines[3].slice(3)
        };
    })
    console.log(entryDataObj);
    var myHtml = `
        <!DOCTYPE html>
        <html>
            <head>
                <title>${entryDataObj.meta.COM} - 导师赞美</title>
                <link rel="stylesheet" href="../css/main.css" />
            </head>
            <body>
                <div class="container">
                    <header>
                        <h1>导师赞美</h1>
                    </header>
                </div>
                <div class="container">
                    <div>
                        <div class="profile">
                            <h2>${entryDataObj.meta.COM}</h2>
                            <p>${entryDataObj.meta.INS} - ${entryDataObj.meta.DEP}</p>
                            <p>简介：<br />${entryDataObj.meta.DES}</p>
                        </div>
                        <div class="reviews">
                            ${renderReviewsList(${entryDataObj.meta.list})}
                        </div>
                    </div>
                </div>
                <div class="container">
                    <footer>
                    </footer>
                </div>
            </body>
        </html>
    `
    fs.writeFileSync(`www/reviews/${stdName}.html`, myHtml);
})
