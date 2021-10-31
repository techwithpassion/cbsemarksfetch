// https://cbseresults.nic.in/class12/Class12th21.htm

const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

(async() => {
    for (i = 14630346; i < 14630378; i++) {
        const rollid = i.toString()
            // const schoolcode = 27175
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://cbseresults.nic.in/class12/Class12th21.htm');
        await page.type('body > table:nth-child(3) > tbody > tr > td > font > center:nth-child(4) > form > div:nth-child(1) > center > table > tbody > tr:nth-child(1) > td:nth-child(2) > input', rollid);
        await page.type('body > table:nth-child(3) > tbody > tr > td > font > center:nth-child(4) > form > div:nth-child(1) > center > table > tbody > tr:nth-child(2) > td:nth-child(2) > input', '25205');
        await page.keyboard.press('Enter');

        await page.waitForNavigation();

        const data = await page.evaluate(() => document.querySelector('*').outerHTML);
        const $ = cheerio.load(data)
        const stname = $('body > div > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > font > b').text()
        const english = $('body > div > div > center > table > tbody > tr:nth-child(2) > td:nth-child(5) > font').text()
        const math = $('body > div > div > center > table > tbody > tr:nth-child(3) > td:nth-child(5) > font').text()
        const phy = $('body > div > div > center > table > tbody > tr:nth-child(4) > td:nth-child(5) > font').text()
        const chem = $('body > div > div > center > table > tbody > tr:nth-child(5) > td:nth-child(5) > font').text()
        const combio = $('body > div > div > center > table > tbody > tr:nth-child(6) > td:nth-child(5) > font').text()
        console.log(stname, english, math, phy, chem, combio)

        const percent = parseInt(english) + parseInt(math) + parseInt(phy) + parseInt(chem) + parseInt(combio)

        console.log('Total Percentage you got is = ', percent / 5 + ' %')
        per = percent / 5
            // const maindata = `${stname} || percent = ${per}%`
        
        const maindata = `${stname} \n marks scored:- \n English = ${english} \n Maths = ${math} \n Physics = ${phy} \n Chemistry = ${chem} \n Computer Science = ${combio} \n Total percentage scored = ${per} %`
//         const maindata = stname + " || percent scored = " + per + "% ||"

        fs.appendFile('panschdata.txt', maindata + '\n', (err, data) => {
            if (err) console.log(err)
        })
        await browser.close();
    }
})();
