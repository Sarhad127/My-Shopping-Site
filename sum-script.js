window.onload = function () {
    const orderInfo = JSON.parse(localStorage.getItem("person"));
    const productTitle = localStorage.getItem("prodTitle");
    const productPrice = localStorage.getItem("Price"); 
    const exchangeRate = 8.50;
    const productPriceSEK = productPrice * exchangeRate;

    document.getElementById('namn').innerText = orderInfo.firstname + " " + orderInfo.surname;
    document.getElementById('email').innerText = orderInfo.email;
    document.getElementById('telefon').innerText = orderInfo.phonenumber;
    document.getElementById('adress1').innerText = orderInfo.streetaddress;
    document.getElementById('adress2').innerText = orderInfo.zipcode + " " + orderInfo.location;
    document.getElementById('produkt').innerText = productTitle;
    document.getElementById('pris').innerText = `${productPriceSEK.toFixed(2)} SEK`; 
}
