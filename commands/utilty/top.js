const puppeteer = require('puppeteer');

const { SlashCommandBuilder } = require('discord.js');

async function scrape() {
    let data = [];
    let outputTxt = "";
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://u.gg/lol/tier-list'); 
    
    await page.waitForSelector('strong.champion-name');
    
    data = await page.$$eval('strong.champion-name', elements => 
        elements.slice(0,10).map(champ => champ.textContent));
    
    //console.log(data);
    await browser.close();
    
    for (let i = 0; i < data.length; i++) {
        outputTxt+= `${i + 1}. ${data[i]}\n`;
    }
    console.log(outputTxt);
    
    return outputTxt;
}


//uncomment to use
//scrape()

//this is exports to my discord bot
// module.exports = {

//     data :new SlashCommandBuilder()
//     .setName('top')
//     .setDescription('reply top 10 champs'),
//     async execute(interaction) {
//         await interaction.deferReply();
//         const outputTxt = await scrape();
//         await interaction.editReply(outputTxt);
//     }
// }







