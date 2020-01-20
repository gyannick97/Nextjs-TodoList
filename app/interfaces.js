"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Products;
(function (Products) {
    Products["Starmap"] = "starmap";
})(Products || (Products = {}));
var PrintProviders;
(function (PrintProviders) {
    PrintProviders["Pwinty"] = "pwinty";
})(PrintProviders || (PrintProviders = {}));
var PaymentProviders;
(function (PaymentProviders) {
    PaymentProviders["Stripe"] = "stripe";
    PaymentProviders["PayPal"] = "paypal";
})(PaymentProviders || (PaymentProviders = {}));
var CountryCode;
(function (CountryCode) {
    CountryCode["IE"] = "IE";
    CountryCode["GB"] = "GB";
    CountryCode["US"] = "US";
})(CountryCode = exports.CountryCode || (exports.CountryCode = {}));
var ShippingSpeed;
(function (ShippingSpeed) {
    ShippingSpeed["Standard"] = "standard";
    ShippingSpeed["Express"] = "express";
})(ShippingSpeed = exports.ShippingSpeed || (exports.ShippingSpeed = {}));
var ShippingStatus;
(function (ShippingStatus) {
    ShippingStatus["Canceled"] = "Cancelled";
    ShippingStatus["Submitted"] = "Submitted";
})(ShippingStatus = exports.ShippingStatus || (exports.ShippingStatus = {}));
