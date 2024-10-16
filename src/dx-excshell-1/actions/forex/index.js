const { Core } = require('@adobe/aio-sdk')

// main function that will be executed by Adobe I/O Runtime
async function main (params) {


    const countryCode = params.baseCurrency;
    let content = "{error : 'Invalid Country Code provided. Try forex=AUD'}";

    // Convert countryCode to full country name
    const countryInfo = getCountryName(countryCode);

    if (countryInfo) {
       content = `{
        "baseCurrency":"${countryInfo.code}",
        "title":"${countryInfo.title}",
        "currencies": ${JSON.stringify(countryInfo.currencies)}}`;
  
    }

    const response = {
      statusCode: 200,
      body: content,
      headers: {
        "Access-Control-Allow-Origin": "",
        "Access-Control-Allow-Methods": "GET, POST, PUT",
        'content-type': 'application/json'
      }
    }
    return response;
}

function getCountryName(code) {
  let countryInfo = { code: code, title: null, currencies: [] };

  switch (code) {
      case 'USD':
          countryInfo.title = 'US Dollar';
          countryInfo.currencies = [
            {"currencyTitle":"Australian Dollar","currencyCode":"AUD","forex":"1.485"},
            {"currencyTitle":"Canadian Dollar","currencyCode":"CAD","forex":"1.317"},
            {"currencyTitle":"Pound Sterling","currencyCode":"GBP","forex":"0.766"}];
            break;
      case 'CAD':
          countryInfo.title = 'Canadian Dollar';
          countryInfo.currencies = [
            {"currencyTitle":"Australian Dollar","currencyCode":"AUD","forex":"1.128"},
            {"currencyTitle":"US Dollar","currencyCode":"USD","forex":"0.759"},
            {"currencyTitle":"ound Sterling","currencyCode":"GBP","forex":"0.585"}];
          break;
      case 'GBP':
          countryInfo.title = 'Great British Pound';
          countryInfo.currencies = [
            {"currencyTitle":"Australian Dollar","currencyCode":"AUD","forex":"1.938"},
            {"currencyTitle":"Canadian Dollar","currencyCode":"CAD","forex":"1.708"},
            {"currencyTitle":"US Dollar","currencyCode":"USD","forex":"1.304"}];
          break;
      case 'AUD':
          countryInfo.title = 'Australian Dollar';
          countryInfo.currencies = [
            {"currencyTitle":"Canadian Dollar","currencyCode":"CAD","forex":"0.92"},
            {"currencyTitle":"Pound Sterling","currencyCode":"GBP","forex":"0.51"},
            {"currencyTitle":"US Dollar","currencyCode":"USD","forex":"0.67"},
            {"currencyTitle":"Euro","currencyCode":"EUR","forex":"0.61"}];
          break;
      case 'EUR':
          countryInfo.title = 'Euro';
          countryInfo.currencies = [
            {"currencyTitle":"Canadian Dollar","currencyCode":"CAD","forex":"0.92"},
            {"currencyTitle":"Pound Sterling","currencyCode":"GBP","forex":"0.51"},
            {"currencyTitle":"US Dollar","currencyCode":"USD","forex":"0.67"},
            {"currencyTitle":"Australian Dollar","currencyCode":"AUD","forex":"0.61"}];
          break;
      default:
        countryInfo.title = null;
  }

  return countryInfo
}


exports.main = main
