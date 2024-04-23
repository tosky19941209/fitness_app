const emailjs = require('@emailjs/nodejs');

module.exports = (email, verificationCode) => {
    const templateParams = {
        from_name: 'Fitness Support',
        subject: 'Welcome to fitness',
        recipient: email,
        message: `Your verification Code is ${verificationCode}`
    };

    const serviceID = "service_zoxo3fc";
    const templateID = "template_2r0lmjr";
    const userID = {
        publicKey:'RiGVJs_nQIaxZ-7mb',
        privateKey:'XdPsjidVe-8vgopgHcPK_'
    }

    emailjs.send(serviceID, templateID, templateParams, userID)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
        }, (err) => {
            console.log('FAILED...', err);
        });

}


