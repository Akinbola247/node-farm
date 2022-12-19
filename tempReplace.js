function replacePlaceholders(temp, items){
    let output = temp.replace(/{%PRODUCTNAME%}/g, items.productName);
    output = output.replace(/{%PRODUCTEMOJI%}/g, items.image);
    output = output.replace(/{%QUANTITY%}/g, items.quantity);
    output = output.replace(/{%ID%}/g, items.id);
    output = output.replace(/{%PRODUCTVITAMIN%}/g, items.nutrients);
    output = output.replace(/{%PRICE%}/g, items.price);
    output = output.replace(/{%PRODUCTDESCRIPTION%}/g, items.description);
    output = output.replace(/{%PRODUCTLOCATION%}/g, items.from);
    
    if(!items.organic){
        output = output.replace(/{%NOT-ORGANIC%}/g, 'not-organic');
    }
  return output;  
}

export default replacePlaceholders