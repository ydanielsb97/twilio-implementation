module.exports.phoneNumberValidation = (number) => {
    return /^[\d\+\-\(\) ]+$/.test(number);
}